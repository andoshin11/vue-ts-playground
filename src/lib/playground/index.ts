import Vue, { VueConstructor } from "vue";
import { Sandbox } from "@/lib/sandbox";
import PluginWrapper from "@/mixins/PluginWrapper";
type Monaco = typeof import("monaco-editor");

declare const window: any;

import { showJSPlugin } from "@/lib/playground/plugins/showJS";
import { showDTSPlugin } from "@/lib/playground/plugins/showDTS";
import { showErrorsPlugin } from "@/lib/playground/plugins/showErrors";
import { showTypesPlugin } from "@/lib/playground/plugins/showTypes";
import { showLogsPlugin } from "@/lib/playground/plugins/showLogs";

/** The interface of all sidebar plugins */
export interface PlaygroundPlugin {
  /** Not public facing, but used by the playground to uniquely identify plugins */
  id: string;
  /** To show in the tabs */
  displayName: string;
  /** Should this plugin be selected when the plugin is first loaded? Let's you check for query vars etc to load a particular plugin */
  shouldBeSelected?: () => boolean;
  /** Before we show the tab, use this to set up your HTML - it will all be removed by the playground when someone navigates off the tab */
  willMount?: (sandbox: Sandbox, container: HTMLDivElement) => void;
  /** After we show the tab */
  didMount?: (sandbox: Sandbox, container: HTMLDivElement) => void;
  /** Model changes while this plugin is actively selected  */
  modelChanged?: (
    sandbox: Sandbox,
    model: import("monaco-editor").editor.ITextModel
  ) => void;
  /** Delayed model changes while this plugin is actively selected, useful when you are working with the TS API because it won't run on every keypress */
  modelChangedDebounce?: (
    sandbox: Sandbox,
    model: import("monaco-editor").editor.ITextModel
  ) => void;
  /** Before we remove the tab */
  willUnmount?: (sandbox: Sandbox, container: HTMLDivElement) => void;
  /** After we remove the tab */
  didUnmount?: (sandbox: Sandbox, container: HTMLDivElement) => void;
  component?: VueConstructor;
}

interface PlaygroundConfig {
  lang: string;
  prefix: string;
}

export const pluginNameFromID = (id: string) => `Plugin-ID-${id}`;

export const defaultPlugins: PlaygroundPlugin[] = [
  showJSPlugin,
  showDTSPlugin,
  showErrorsPlugin,
  showLogsPlugin
  // showTypesPlugin
];

export const pluginFactories = (v: VueConstructor) => (
  plugins: PlaygroundPlugin[]
) => {
  plugins.forEach(p => {
    const pluginName = pluginNameFromID(p.id);
    // Register components
    if (p.component) {
      v.component(
        pluginName,
        Vue.extend({ mixins: [PluginWrapper, p.component] })
      );
    }

    // TODO: check initialization function
  });
  return plugins;
};

export const pickInitialPlugin = (
  plugins: PlaygroundPlugin[]
): PlaygroundPlugin | null => {
  const priorityPlugin = plugins.find(
    p => p.shouldBeSelected && p.shouldBeSelected()
  );
  return priorityPlugin || plugins[0] || null;
};

export const setupPlayground = (
  sandbox: Sandbox,
  monaco: Monaco,
  config: PlaygroundConfig
) => {
  // let debouncingTimer = false;
  // sandbox.editor.onDidChangeModelContent(_event => {
  //   const plugin = currentPlugin();
  //   if (plugin.modelChanged) plugin.modelChanged(sandbox, sandbox.getModel());

  //   // This needs to be last in the function
  //   if (debouncingTimer) return;
  //   debouncingTimer = true;
  //   setTimeout(() => {
  //     debouncingTimer = false;
  //     playgroundDebouncedMainFunction();

  //     // Only call the plugin function once every 0.3s
  //     if (
  //       plugin.modelChangedDebounce &&
  //       plugin.displayName === currentPlugin().displayName
  //     ) {
  //       plugin.modelChangedDebounce(sandbox, sandbox.getModel());
  //     }
  //   }, 300);
  // });

  // Sets the URL and storage of the sandbox string
  const playgroundDebouncedMainFunction = () => {
    const alwaysUpdateURL = !localStorage.getItem("disable-save-on-type");
    if (alwaysUpdateURL) {
      const newURL = sandbox.getURLQueryWithCompilerOptions(sandbox);
      window.history.replaceState({}, "", newURL);
    }

    localStorage.setItem("sandbox-history", sandbox.getText());
  };

  const languageSelector = document.getElementById(
    "language-selector"
  )! as HTMLSelectElement;
  const params = new URLSearchParams(location.search);
  languageSelector.options.selectedIndex = params.get("useJavaScript") ? 1 : 0;

  languageSelector.onchange = () => {
    const useJavaScript = languageSelector.value === "JavaScript";
    const query = sandbox.getURLQueryWithCompilerOptions(sandbox, {
      useJavaScript: useJavaScript ? true : undefined
    });
    const fullURL = `${document.location.protocol}//${document.location.host}${document.location.pathname}${query}`;
    // @ts-ignore
    document.location = fullURL;
  };

  window.ts = sandbox.ts;
  window.sandbox = sandbox;
};

export type Playground = ReturnType<typeof setupPlayground>;
