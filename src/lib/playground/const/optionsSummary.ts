export type OptionsSummary = {
  display: string;
  oneliner: string;
  id: string;
  categoryID: string;
  categoryDisplay: string;
};

export const optionsSummary: OptionsSummary[] = [
  {
    id: "files",
    display: "Files",
    oneliner: "Include a set list of files, does not support globs",
    categoryID: "Project_Files_0",
    categoryDisplay: "File Inclusion"
  },
  {
    id: "include",
    display: "Include",
    oneliner: "Files or patterns to include in this project",
    categoryID: "Project_Files_0",
    categoryDisplay: "File Inclusion"
  },
  {
    id: "exclude",
    display: "Exclude",
    oneliner: "Files or patterns to be skipped from the include option",
    categoryID: "Project_Files_0",
    categoryDisplay: "File Inclusion"
  },
  {
    id: "extends",
    display: "Extends",
    oneliner: "Inherit options for a TSConfig",
    categoryID: "Project_Files_0",
    categoryDisplay: "File Inclusion"
  },
  {
    id: "typeAcquisition",
    display: "Type Acquisition",
    oneliner: "Sets of options for Automatic Type Acquisition in JavaScript",
    categoryID: "Project_Files_0",
    categoryDisplay: "File Inclusion"
  },
  {
    id: "references",
    display: "References",
    oneliner: "Provide a structure for composite projects",
    categoryID: "Project_Files_0",
    categoryDisplay: "File Inclusion"
  },
  {
    id: "incremental",
    display: "Incremental",
    oneliner:
      "Save .tsbuildinfo files to allow for incremental compilation of projects",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "target",
    display: "Target",
    oneliner: "Set the supported JavaScript language runtime to transpile to",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "module",
    display: "Module",
    oneliner: "Sets the expected module system for your runtime",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "lib",
    display: "Lib",
    oneliner:
      "Include type definitions you know are available in your JavaScript runtime",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "allowJs",
    display: "Allow JS",
    oneliner: "Let TS include .JS files in imports",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "checkJs",
    display: "Check JS",
    oneliner: "Run the type checker on .js files in your project",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "jsx",
    display: "JSX",
    oneliner: "Control how JSX is emitted",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "declaration",
    display: "Declaration",
    oneliner: "Emit d.ts files for referenced files in the project",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "declarationMap",
    display: "Declaration Map",
    oneliner: "Create sourcemaps for d.ts files",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "sourceMap",
    display: "Source Map",
    oneliner: "Creates source map files for emitted JavaScript files",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "outFile",
    display: "Out File",
    oneliner: "Output a single file of all JS files concatenated",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "outDir",
    display: "Out Dir",
    oneliner: "Set an output folder for all emitted files",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "rootDir",
    display: "Root Dir",
    oneliner: "Sets the root folder within your source files",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "composite",
    display: "Composite",
    oneliner: "Used to create multiple build projects",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "tsBuildInfoFile",
    display: "TS Build Info File",
    oneliner: "Set the folder for .tsbuildinfo files",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "removeComments",
    display: "Remove Comments",
    oneliner: "Remove comments in TypeScript from appearing in JavaScript",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "noEmit",
    display: "No Emit",
    oneliner: "Do not emit files from a compilation",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "importHelpers",
    display: "Import Helpers",
    oneliner:
      "Allow importing helper functions once per project, instead of including them per-file",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "downlevelIteration",
    display: "Downlevel Iteration",
    oneliner:
      "Emit more compliant, but verbose JavaScript for iterating objects",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "isolatedModules",
    display: "Isolated Modules",
    oneliner:
      "Ensure that each file can be safely transpiled without relying on other imports",
    categoryID: "Basic_Options_6172",
    categoryDisplay: "Project Options"
  },
  {
    id: "strict",
    display: "Strict",
    oneliner: "Enable TypeScript's most in-depth type checking rules",
    categoryID: "Strict_Type_Checking_Options_6173",
    categoryDisplay: "Strict Checks"
  },
  {
    id: "noImplicitAny",
    display: "No Implicit Any",
    oneliner:
      "Avoid introducing anys inside your codebase when a type could be specified",
    categoryID: "Strict_Type_Checking_Options_6173",
    categoryDisplay: "Strict Checks"
  },
  {
    id: "strictNullChecks",
    display: "Strict Null Checks",
    oneliner: "Ensure that nullability is respected in the type checker",
    categoryID: "Strict_Type_Checking_Options_6173",
    categoryDisplay: "Strict Checks"
  },
  {
    id: "strictFunctionTypes",
    display: "Strict Function Types",
    oneliner: "Ensure that function parameters are consistent",
    categoryID: "Strict_Type_Checking_Options_6173",
    categoryDisplay: "Strict Checks"
  },
  {
    id: "strictBindCallApply",
    display: "Strict Bind Call Apply",
    oneliner: "Ensure that 'call', 'bind' and 'apply' have the rught arguments",
    categoryID: "Strict_Type_Checking_Options_6173",
    categoryDisplay: "Strict Checks"
  },
  {
    id: "strictPropertyInitialization",
    display: "Strict Property Initialization",
    oneliner:
      "Ensure that all class properties match their types after the constructor has finished",
    categoryID: "Strict_Type_Checking_Options_6173",
    categoryDisplay: "Strict Checks"
  },
  {
    id: "noImplicitThis",
    display: "No Implicit This",
    oneliner: "Raise errors when 'this' would be any",
    categoryID: "Strict_Type_Checking_Options_6173",
    categoryDisplay: "Strict Checks"
  },
  {
    id: "alwaysStrict",
    display: "Always Strict",
    oneliner: "Ensure 'use strict' is always emitted",
    categoryID: "Strict_Type_Checking_Options_6173",
    categoryDisplay: "Strict Checks"
  },
  {
    id: "moduleResolution",
    display: "Module Resolution",
    oneliner: "Allow TypeScript 1.6 module resolution strategies",
    categoryID: "Module_Resolution_Options_6174",
    categoryDisplay: "Module Resolution"
  },
  {
    id: "baseUrl",
    display: "Base Url",
    oneliner: "Set a baseurl for relative module names",
    categoryID: "Module_Resolution_Options_6174",
    categoryDisplay: "Module Resolution"
  },
  {
    id: "paths",
    display: "Paths",
    oneliner: "A set of locations to look for imports in",
    categoryID: "Module_Resolution_Options_6174",
    categoryDisplay: "Module Resolution"
  },
  {
    id: "rootDirs",
    display: "Root Dirs",
    oneliner: "Set multiple root directories",
    categoryID: "Module_Resolution_Options_6174",
    categoryDisplay: "Module Resolution"
  },
  {
    id: "typeRoots",
    display: "Type Roots",
    oneliner: "locations where TypeScript should look for type definitions",
    categoryID: "Module_Resolution_Options_6174",
    categoryDisplay: "Module Resolution"
  },
  {
    id: "types",
    display: "Types",
    oneliner:
      "Used to create an allowlist of types to be included in the compile",
    categoryID: "Module_Resolution_Options_6174",
    categoryDisplay: "Module Resolution"
  },
  {
    id: "allowSyntheticDefaultImports",
    display: "Allow Synthetic Default Imports",
    oneliner:
      "Allow 'import x from y' when a module doesn't have a default export",
    categoryID: "Module_Resolution_Options_6174",
    categoryDisplay: "Module Resolution"
  },
  {
    id: "esModuleInterop",
    display: "ES Module Interop",
    oneliner:
      "Emit additional JS to ease support for importing commonjs modules",
    categoryID: "Module_Resolution_Options_6174",
    categoryDisplay: "Module Resolution"
  },
  {
    id: "preserveSymlinks",
    display: "Preserve Symlinks",
    oneliner: "Do not resolve symlink paths",
    categoryID: "Module_Resolution_Options_6174",
    categoryDisplay: "Module Resolution"
  },
  {
    id: "allowUmdGlobalAccess",
    display: "Allow Umd Global Access",
    oneliner: "Assume UMD imports are all globally available",
    categoryID: "Module_Resolution_Options_6174",
    categoryDisplay: "Module Resolution"
  },
  {
    id: "sourceRoot",
    display: "Source Root",
    oneliner:
      "Sets the root path for debuggers to find the reference source code",
    categoryID: "Source_Map_Options_6175",
    categoryDisplay: "Source Maps"
  },
  {
    id: "mapRoot",
    display: "Map Root",
    oneliner: "Set an external root for sourcemaps",
    categoryID: "Source_Map_Options_6175",
    categoryDisplay: "Source Maps"
  },
  {
    id: "inlineSourceMap",
    display: "Inline Source Map",
    oneliner: "Include sourcemap files inside the emitted JavaScript",
    categoryID: "Source_Map_Options_6175",
    categoryDisplay: "Source Maps"
  },
  {
    id: "inlineSources",
    display: "Inline Sources",
    oneliner: "Include sourcemap files inside the emitted JavaScript",
    categoryID: "Source_Map_Options_6175",
    categoryDisplay: "Source Maps"
  },
  {
    id: "noUnusedLocals",
    display: "No Unused Locals",
    oneliner: "Error when a local variable isn't read",
    categoryID: "Additional_Checks_6176",
    categoryDisplay: "Linter Checks"
  },
  {
    id: "noUnusedParameters",
    display: "No Unused Parameters",
    oneliner: "Error when a parameter isn't used",
    categoryID: "Additional_Checks_6176",
    categoryDisplay: "Linter Checks"
  },
  {
    id: "noImplicitReturns",
    display: "No Implicit Returns",
    oneliner: "Ensure that all codepaths return in a function",
    categoryID: "Additional_Checks_6176",
    categoryDisplay: "Linter Checks"
  },
  {
    id: "noFallthroughCasesInSwitch",
    display: "No Fallthrough Cases In Switch",
    oneliner: "Report errors for fallthrough cases in switch statements.",
    categoryID: "Additional_Checks_6176",
    categoryDisplay: "Linter Checks"
  },
  {
    id: "experimentalDecorators",
    display: "Experimental Decorators",
    oneliner: "Enable experimental support for TC39 stage 2 decorators",
    categoryID: "Experimental_Options_6177",
    categoryDisplay: "Experimental"
  },
  {
    id: "emitDecoratorMetadata",
    display: "Emit Decorator Metadata",
    oneliner: "Adds additional type metadata to decorators in emitted code",
    categoryID: "Experimental_Options_6177",
    categoryDisplay: "Experimental"
  },
  {
    id: "importHelpers",
    display: "Import Helpers",
    oneliner:
      "Allow importing helper functions once per project, instead of including them per-file",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "listFiles",
    display: "List Files",
    oneliner: "Print all of the files read during the compilation",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "listEmittedFiles",
    display: "List Emitted Files",
    oneliner: "Print the names of emitted files after a compile",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "traceResolution",
    display: "Trace Resolution",
    oneliner: "Log out paths when resolving all modules",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "diagnostics",
    display: "Diagnostics",
    oneliner: "Output additional information after a compile",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "extendedDiagnostics",
    display: "Extended Diagnostics",
    oneliner: "Include a lot of diagnostic information after a compile",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "generateCpuProfile",
    display: "Generate CPU Profile",
    oneliner: "Emit a v8 CPU profile of the compiler run for debugging",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "emitDeclarationOnly",
    display: "Emit Declaration Only",
    oneliner: "Only output d.ts files and not .js files",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "jsxFactory",
    display: "JSX Factory",
    oneliner: "Control the function emitted by JSX",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "resolveJsonModule",
    display: "Resolve JSON Module",
    oneliner: "Allow importing .json files",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "out",
    display: "Out",
    oneliner: "Do not use this",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "reactNamespace",
    display: "React Namespace",
    oneliner: "Specify the object which 'createElement' is called on in JSX",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "skipDefaultLibCheck",
    display: "Skip Default Lib Check",
    oneliner: "use SkipLibCheck instead",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "charset",
    display: "Charset",
    oneliner: "Manually set the text encoding for reading files",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "emitBOM",
    display: "Emit BOM",
    oneliner: "Include a byte order mark to output files",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "newLine",
    display: "New Line",
    oneliner: "Set the newline character",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "noErrorTruncation",
    display: "No Error Truncation",
    oneliner: "Do not truncate error messages",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "noLib",
    display: "No Lib",
    oneliner: "Ignore options from lib",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "noResolve",
    display: "No Resolve",
    oneliner: "Skip ahead-of-time checking for import and <reference files",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "stripInternal",
    display: "Strip Internal",
    oneliner:
      "Remove declarations which have '@internal' in their JSDoc comments",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "disableSizeLimit",
    display: "Disable Size Limit",
    oneliner: "Remove the memory cap on the TypeScript language server",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "disableSourceOfProjectReferenceRedirect",
    display: "Disable Source Project Reference Redirect",
    oneliner:
      "Use d.ts files as the source of truth for tooling between composite project boundries",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "noImplicitUseStrict",
    display: "No Implicit Use Strict",
    oneliner: "Disable 'use strict' in the JS emit",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "noEmitHelpers",
    display: "No Emit Helpers",
    oneliner: "Assume helpers are available in the global runtime",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "noEmitOnError",
    display: "No Emit On Error",
    oneliner: "Only emit files on a successful compile",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "preserveConstEnums",
    display: "Preserve Const Enums",
    oneliner: "Do not erase `const enum` declarations in generated code",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "declarationDir",
    display: "Declaration Dir",
    oneliner: "Set the root directory for d.ts files to go",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "skipLibCheck",
    display: "Skip Lib Check",
    oneliner: "Skip type checking of declaration files",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "allowUnusedLabels",
    display: "Allow Unused Labels",
    oneliner: "Error when accidentally creating a label",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "allowUnreachableCode",
    display: "Allow Unreachable Code",
    oneliner: "Error when code will never be called",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "suppressExcessPropertyErrors",
    display: "Suppress Excess Property Errors",
    oneliner: "Allow additional properties being set during creation of types",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "suppressImplicitAnyIndexErrors",
    display: "Suppress Implicit Any Index Errors",
    oneliner:
      "Remove the warning when using string indexes to access unknown properties",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "forceConsistentCasingInFileNames",
    display: "Force Consistent Casing In File Names",
    oneliner: "Ensure that casing is correct in imports",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "maxNodeModuleJsDepth",
    display: "Max Node Module JS Depth",
    oneliner: "How deep should TypeScript run type checking in node_modules",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "noStrictGenericChecks",
    display: "No Strict Generic Checks",
    oneliner: "Disable strict checking of generic signatures in functions.",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "useDefineForClassFields",
    display: "Use Define For Class Fields",
    oneliner: "Use define characteristics for handling class fields",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "keyofStringsOnly",
    display: "Keyof Strings Only",
    oneliner: "Make keyof only return strings instead of string or numbers",
    categoryID: "Advanced_Options_6178",
    categoryDisplay: "Advanced"
  },
  {
    id: "preserveWatchOutput",
    display: "Preserve Watch Output",
    oneliner: "Do not wipe the console in watch mode",
    categoryID: "Command_line_Options_6171",
    categoryDisplay: "Command Line"
  },
  {
    id: "pretty",
    display: "Pretty",
    oneliner: "Use color and formatting to make compiler errors easier to read",
    categoryID: "Command_line_Options_6171",
    categoryDisplay: "Command Line"
  }
];
