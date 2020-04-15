import { PlaygroundConfig } from "./types";

/** Default Monaco settings for playground */
export const sharedEditorOptions: import("monaco-editor").editor.IEditorOptions = {
  automaticLayout: true,
  scrollBeyondLastLine: true,
  scrollBeyondLastColumn: 3,
  minimap: {
    enabled: false
  }
};

/** The default settings which we apply a partial over */
export const defaultPlaygroundSettings: PlaygroundConfig = {
  text: "",
  domID: "",
  compilerOptions: {},
  acquireTypes: true,
  useJavaScript: false,
  supportTwoslashCompilerOptions: false,
  logger: {
    error: () => {},
    log: () => {}
  }
};
