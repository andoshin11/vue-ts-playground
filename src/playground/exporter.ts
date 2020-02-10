import { Route } from 'vue-router'
import lzstring from '@/lib/sandbox/vendor/lzstring.min'
import { Sandbox, CompilerOptions } from '@/lib/sandbox'
import { getRawURLQueryWithCompilerOptions } from '@/utils/router'

// These are the compiler's defaults, and we want a diff from
// these before putting it in the issue
const defaultCompilerOptionsForTSC: CompilerOptions = {
  esModuleInterop: false,
  strictNullChecks: false,
  strict: false,
  strictFunctionTypes: false,
  strictPropertyInitialization: false,
  strictBindCallApply: false,
  noImplicitAny: false,
  noImplicitThis: false,
  noImplicitReturns: false,
  checkJs: false,
  allowJs: false,
  experimentalDecorators: false,
  emitDecoratorMetadata: false
};

type ValidCompilerOptions = Omit<CompilerOptions, 'target' | 'jsx' | 'module' | 'moduleResolution'> & {
  target?: string;
  jsx?: string;
  module?: string;
  moduleResolution?: string;
}

export class Exporter {
  constructor(
    private readonly sandbox: Sandbox
  ) {}

  getValidCompilerOptions(options: CompilerOptions): ValidCompilerOptions {
    const {
      target: targetOption,
      jsx: jsxOption,
      module: moduleOption,
      moduleResolution: moduleResolutionOption,
      ...restOptions
    } = options;

    const targetText = this.sandbox.getScriptTargetText(targetOption)
    const jsxText = this.sandbox.getJsxEmitText(jsxOption)
    const moduleText = this.sandbox.getModuleKindText(moduleOption);
    const moduleResolutionText = this.sandbox.getModuleResolutionText(moduleResolutionOption)

    const opts: ValidCompilerOptions = {
      ...restOptions,
      ...(targetText && { target: targetText }),
      ...(jsxText && { jsx: jsxText }),
      ...(moduleText && { module: moduleText }),
      ...(moduleResolutionText && { moduleResolution: moduleResolutionText })
    };

    const diffFromTSCDefaults = Object.entries(opts).reduce(
      (acc, [key, value]) => {
        if (opts[key] && value != defaultCompilerOptionsForTSC[key]) {
          acc[key] = opts[key];
        }

        return acc;
      },
      {} as ValidCompilerOptions
    );

    return diffFromTSCDefaults;
  }

  stringifiedCompilerOptions() {
    return JSON.stringify({ compilerOptions: this.getValidCompilerOptions(this.sandbox.compilerOptions) }, null, '  ')
  }

  openInASTViewer() {
    const text = this.sandbox.getText()
    const hash = `#code/${lzstring.compressToEncodedURIComponent(text)}`
    window.open(`https://ts-ast-viewer.com/${hash}`, '_blank')
  }

  openInCodeSandbox() {
    const files = {
      "package.json": {
        content: {
          name: "TypeScript Playground Export",
          version: "0.0.0",
          description: "TypeScript playground exported Sandbox",
          dependencies: {
            typescript: this.sandbox.ts.version
          }
        }
      },
      "index.ts": {
        content: this.sandbox.getText()
      },
      "tsconfig.json": {
        content: this.stringifiedCompilerOptions()
      }
    };

    // Using the v1 get API
    const parameters = lzstring
      .compressToBase64(JSON.stringify({ files }))
      .replace(/\+/g, "-") // Convert '+' to '-'
      .replace(/\//g, "_") // Convert '/' to '_'
      .replace(/=+$/, ""); // Remove ending '='
    
    const url = `https://codesandbox.io/api/v1/sandboxes/define?view=editor&parameters=${parameters}`;
    window.open(url, '_blank')
  }

  async makeMarkdown(route: Route) {
    function codify(code: string, ext: string) {
      return "```" + ext + "\n" + code + "\n```\n";
    }

    const fullURL = getRawURLQueryWithCompilerOptions(this.sandbox, route)
    const jsSection = this.sandbox.config.useJavaScript
      ? ""
      : `
<details><summary><b>Output</b></summary>

${codify(await this.sandbox.getRunnableJS(), "ts")}

</details>
`;

    return `
<!-- 🚨 STOP 🚨 𝗦𝗧𝗢𝗣 🚨 𝑺𝑻𝑶𝑷 🚨

Half of all issues filed here are duplicates, answered in the FAQ, or not appropriate for the bug tracker. Even if you think you've found a *bug*, please read the FAQ first, especially the Common "Bugs" That Aren't Bugs section!

Please help us by doing the following steps before logging an issue:
  * Search: https://github.com/Microsoft/TypeScript/search?type=Issues
  * Read the FAQ: https://github.com/Microsoft/TypeScript/wiki/FAQ

Please fill in the *entire* template below.
-->

**TypeScript Version:**  ${this.sandbox.ts.version}

<!-- Search terms you tried before logging this (so others can find this issue more easily) -->
**Search Terms:**

**Expected behavior:**

**Actual behavior:**

<!-- Did you find other bugs that looked similar? -->
**Related Issues:**

**Code**
${codify(this.sandbox.getText(), "ts")}

${jsSection}

<details><summary><b>Compiler Options</b></summary>

${codify(this.stringifiedCompilerOptions(), "json")}

</details>

**Playground Link:** [Provided](${fullURL})
      `;
  }

  async reportIssue(route: Route) {
    const body = await this.makeMarkdown(route);
    if (body.length < 4000) {
      window.open(
        "https://github.com/andoshin11/vue-ts-playground/issues/new?body=" +
          encodeURIComponent(body)
      );
    } else {
      return body
    }
  }
}
