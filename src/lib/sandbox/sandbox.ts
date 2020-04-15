import TS from 'typescript'
import { Uri } from 'monaco-editor'
import lzstring from "./vendor/lzstring.min";
import { Monaco, PlaygroundConfig, CompilerOptions, ModelType, EditorType } from './types'
import { defaultPlaygroundSettings, sharedEditorOptions } from './const'
import { getInitialCode } from './getInitialCode'
import { languageType, createFileUri } from './utils'
import { createCompilerHost } from './createCompilerHost'
import { getDefaultSandboxCompilerOptions, getCompilerOptionsFromParams, getURLQueryWithCompilerOptions } from './compilerOptions'
import * as theme from './theme'
import { detectNewImportsToAcquireTypeFor } from './typeAcquisition'
import { extractTwoSlashComplierOptions } from './twoslashSupport'
import { supportedReleases } from './releases'
import { TypeScriptWorker } from './tsWorker'

export class Sandbox {
  public monaco: Monaco
  public config: PlaygroundConfig
  public editor: EditorType
  public ts: typeof TS
  public filePath: Uri
  public compilerOptions: CompilerOptions
  public didUpdateCompilerSettings: (opts: CompilerOptions) => void
  public supportedVersions = supportedReleases
  public lzstring = lzstring
  public getURLQueryWithCompilerOptions = getURLQueryWithCompilerOptions

  constructor(monaco: Monaco, partialConfig: Partial<PlaygroundConfig>, ts: typeof TS) {
    this.monaco = monaco
    this.config = { ...defaultPlaygroundSettings, ...partialConfig } as any
    this.ts = ts
    this.compilerOptions = this.getCompilerDefaults()
    this.didUpdateCompilerSettings = () => { console.warn('Implement me!') }
    this.filePath = createFileUri(this.config, this.getCompilerDefaults(), this.monaco);

    this.initialize()
  }

  initialize() {
    const { config, monaco, filePath } = this

    if (!("domID" in config) && !("elementToAppend" in config)) {
      throw new Error("You did not provide a domID or elementToAppend");
    }

    // Check element existence
    const element = "domID" in config
      ? document.getElementById(config.domID)
      : config.elementToAppend;
    if (!element) {
      throw new Error("You did not provide valid domID or elementToAppend");
    }

    // Set default text
    const language = languageType(config);
    const defaultText = this.config.suppressAutomaticallyGettingDefaultText
      ? this.config.text
      : getInitialCode(this.config.text, document.location);
    const model = monaco.editor.createModel(defaultText, language, filePath);

    // Set theme
    monaco.editor.defineTheme("sandbox", theme.sandboxTheme);
    monaco.editor.defineTheme("sandbox-dark", theme.sandboxThemeDark);
    monaco.editor.setTheme("sandbox");

    // Init editor
    const monacoSettings = Object.assign(
      { model },
      sharedEditorOptions,
      config.monacoSettings || {}
    );
    const editor = monaco.editor.create(element, {...monacoSettings, fontSize: 16});
    this.editor = editor

    // Grab types
    if (config.acquireTypes) {
      this.detectNewImportsToAcquireTypeFor()
    }

    // Then update it when the model changes, perhaps this could be a debounced plugin instead in the future?
    editor.onDidChangeModelContent(() => {
      const code = editor.getModel()!.getValue();

      if (config.supportTwoslashCompilerOptions) {
        const configOpts = extractTwoSlashComplierOptions(this.ts)(code);
        this.updateCompilerSettings(configOpts);
      }
      if (config.acquireTypes) {
        this.detectNewImportsToAcquireTypeFor()
      }
    });

    // Grab the compiler flags via the query params
    const compilerDefaults = this.getCompilerDefaults()
    if (!config.suppressAutomaticallyGettingCompilerFlags) {
      const params = new URLSearchParams(location.search);
      let queryParamCompilerOptions = getCompilerOptionsFromParams(
        compilerDefaults,
        params
      );
      if (Object.keys(queryParamCompilerOptions).length)
        config.logger.log(
          "[Compiler] Found compiler options in query params: ",
          queryParamCompilerOptions
        );
      this.compilerOptions = { ...compilerDefaults, ...queryParamCompilerOptions };
    }

    config.logger.log("[Compiler] Set compiler options: ", this.compilerOptions);
    this.getDefaults().setCompilerOptions(this.compilerOptions);
  }

  setText(text: string) {
    this.getModel().setValue(text)
  }

  getDomNode() {
    return this.editor.getDomNode()
  }

  getModel(): ModelType {
    // Because model is implicitly added
    return this.editor.getModel()!
  }

  getText(): string {
    return this.getModel().getValue()
  }

  getCompilerDefaults() {
    const { config, monaco } = this
    return getDefaultSandboxCompilerOptions(config, monaco)
  }

  async getWorkerProcess(): Promise<TypeScriptWorker> {
    const worker = await this.worker()
    return await worker(this.getModel().uri)
  }

  get worker() {
    const { config, monaco } = this
    return config.useJavaScript
      ? monaco.languages.typescript.getJavaScriptWorker
      : monaco.languages.typescript.getTypeScriptWorker
  }

  get language() {
    return languageType(this.config)
  }

  getDefaults() {
    const { config, monaco } = this
    return config.useJavaScript
      ? monaco.languages.typescript.javascriptDefaults
      : monaco.languages.typescript.typescriptDefaults
  }

  /** Gets the results of compiling your editor's code */
  // TODO: add type
  async getEmitResult() {
    const model = this.getModel()
    const client = await this.getWorkerProcess()
    return await client.getEmitOutput(model.uri.toString());
  }

  /** Gets the JS  of compiling your editor's code */
  async getRunnableJS(): Promise<string> {
    const { config } = this
    if (config.useJavaScript) {
      return this.getText()
    }

    const result = await this.getEmitResult()
    const firstJS = result.outputFiles.find(
      (o: any) => o.name.endsWith(".js") || o.name.endsWith(".jsx")
    );
    return (firstJS && firstJS.text) || "";
  }

  /** Gets the DTS for the JS/TS  of compiling your editor's code */
  async getDTSForCode() {
    const result = await this.getEmitResult();
    return result.outputFiles.find((o: any) => o.name.endsWith(".d.ts"))!.text;
  }

  detectNewImportsToAcquireTypeFor() {
    const { config, editor } = this
    const defaults = this.getDefaults()
    // Take the code from the editor right away
    const code = editor.getModel()!.getValue();

    // In the future it'd be good to add support for an 'add many files'
    const addLibraryToRuntime = (code: string, path: string) => {
      defaults.addExtraLib(code, path);
      config.logger.log(`[ATA] Adding ${path} to runtime`);
    };

    detectNewImportsToAcquireTypeFor(
      code,
      addLibraryToRuntime,
      window.fetch.bind(window),
      config
    );
  }

  updateCompilerSettings(opts: CompilerOptions) {
    const { config } = this
    const defaults = this.getDefaults()

    config.logger.log("[Compiler] Updating compiler options: ", opts);
    this.compilerOptions = {
      ...opts,
      ...this.compilerOptions
    };
    defaults.setCompilerOptions(this.compilerOptions);
    this.didUpdateCompilerSettings(this.compilerOptions);
  }

  updateCompilerSetting(key: keyof CompilerOptions, value: any) {
    const { config } = this
    const defaults = this.getDefaults()

    config.logger.log("[Compiler] Setting compiler options ", key, "to", value);
    this.compilerOptions[key] = value;
    defaults.setCompilerOptions(this.compilerOptions);
    this.didUpdateCompilerSettings(this.compilerOptions);
  }

  setCompilerSettings(opts: CompilerOptions) {
    const { config } = this
    const defaults = this.getDefaults()

    config.logger.log("[Compiler] Setting compiler options: ", opts);
    this.compilerOptions = opts;
    defaults.setCompilerOptions(this.compilerOptions);
    this.didUpdateCompilerSettings(this.compilerOptions);
  }

  setDidUpdateCompilerSettings(func: (opts: CompilerOptions) => void) {
    this.didUpdateCompilerSettings = func
  }

  /**
   * Warning: Runs on the main thread
   */
  createTSProgram() {
    const { filePath, ts } = this
    const text = this.getText()

    const langServ = createCompilerHost(text, filePath.path);
    return ts.createProgram([filePath.path], this.getCompilerDefaults(), langServ);
  }

  /**
   * Warning: Runs on the main thread
   * TODO: Does not work
   */
  getAST() {
    const program = this.createTSProgram();
    program.emit();
    console.log(program);
    console.log(program.getSourceFiles());
    return program.getSourceFile(this.filePath.path)!;
  }

  getScriptTargetText(option: any) {
    return this.monaco.languages.typescript.ScriptTarget[option]
  }

  getJsxEmitText(option: any) {
    if (option === this.monaco.languages.typescript.JsxEmit.None) {
      return undefined;
    }
    return this.monaco.languages.typescript.JsxEmit[option].toLowerCase();
  }

  getModuleKindText(option: any) {
    if (option === this.monaco.languages.typescript.ModuleKind.None) {
      return undefined;
    }
    return this.monaco.languages.typescript.ModuleKind[option];
  }

  getModuleResolutionText(option: any) {
    const kind = this.monaco.languages.typescript.ModuleResolutionKind[option]
    return kind === 'NodeJs' ? 'node' : 'classic'
  }
}
