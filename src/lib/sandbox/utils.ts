import { PlaygroundConfig, CompilerOptions, Monaco } from './types'

export const languageType = (config: PlaygroundConfig) =>
  config.useJavaScript ? "javascript" : "typescript";

function defaultFilePath(
  config: PlaygroundConfig,
  compilerOptions: CompilerOptions,
  monaco: Monaco
) {
  const isJSX =
    compilerOptions.jsx !== monaco.languages.typescript.JsxEmit.None;
  const fileExt = config.useJavaScript ? "js" : "ts";
  const ext = isJSX ? fileExt + "x" : fileExt;
  return "input." + ext;
}

/** Creates a monaco file reference, basically a fancy path */
export function createFileUri(
  config: PlaygroundConfig,
  compilerOptions: CompilerOptions,
  monaco: Monaco
) {
  return monaco.Uri.file(defaultFilePath(config, compilerOptions, monaco));
}
