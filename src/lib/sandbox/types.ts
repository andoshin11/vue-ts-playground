export type Monaco = typeof import("monaco-editor");

export type CompilerOptions = import("monaco-editor").languages.typescript.CompilerOptions;

export type EditorType = ReturnType<Monaco['editor']['create']>
export type ModelType = NonNullable<ReturnType<Monaco['editor']['getModel']>>

/**
 * These are settings for the playground which are the equivalent to props in React
 * any changes to it should require a new setup of the playground
 */
export type PlaygroundConfig = {
  /** The default source code for the playground */
  text: string;
  /** Should it run the ts or js IDE services */
  useJavaScript: boolean;
  /** Compiler options which are automatically just forwarded on */
  compilerOptions: CompilerOptions;
  /** Optional monaco settings overrides */
  monacoSettings?: import("monaco-editor").editor.IEditorOptions;
  /** Acquire types via type acquisition */
  acquireTypes: boolean;
  /** Support twoslash compiler options */
  supportTwoslashCompilerOptions: boolean;
  /** Get the text via query params and local storage, useful when the editor is the main experience */
  suppressAutomaticallyGettingDefaultText?: true;
  /** Suppress setting compiler options from the compiler flags from query params */
  suppressAutomaticallyGettingCompilerFlags?: true;
  /** Logging system */
  logger: { log: (...args: any[]) => void; error: (...args: any[]) => void };
} & (
  | { /** theID of a dom node to add monaco to */ domID: string }
  | { /** theID of a dom node to add monaco to */ elementToAppend: HTMLElement }
);
