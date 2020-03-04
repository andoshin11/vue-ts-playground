import Vue, { VueConstructor } from 'vue'
import { Sandbox } from "@/lib/sandbox";
import PluginWrapper from '@/mixins/PluginWrapper'
type Monaco = typeof import("monaco-editor");

declare const window: any;

import { showJSPlugin } from '@/lib/playground/plugins/showJS'
import { showDTSPlugin } from '@/lib/playground/plugins/showDTS'
import { showErrorsPlugin } from '@/lib/playground/plugins/showErrors'
import { showTypesPlugin } from '@/lib/playground/plugins/showTypes'
import { showLogsPlugin } from '@/lib/playground/plugins/showLogs'
import {
  createSidebar,
  createTabForPlugin,
  createTabBar,
  createPluginContainer,
  activatePlugin,
  createDragBar,
  setupSidebarToggle
} from "./createElements";
import { createExporter } from "./exporter";
import { getExampleSourceCode } from "./getExample";
import { ExampleHighlighter } from "./monaco/ExampleHighlight";
import {
  createConfigDropdown,
  updateConfigDropdownForCompilerOptions
} from "./createConfigDropdown";
import {
  optionsPlugin,
  allowConnectingToLocalhost,
  activePlugins
} from "./sidebar/options";

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
  component?: VueConstructor
}

interface PlaygroundConfig {
  lang: string;
  prefix: string;
}

export const pluginNameFromID = (id: string) => `Plugin-ID-${id}`

export const defaultPlugins: PlaygroundPlugin[] = [
  showJSPlugin,
  showDTSPlugin,
  showErrorsPlugin,
  showLogsPlugin
  // showTypesPlugin
]

export const pluginFactories = (v: VueConstructor) => (plugins: PlaygroundPlugin[]) => {
  plugins.forEach(p => {
    const pluginName = pluginNameFromID(p.id)
    // Register components
    if (p.component) {
      v.component(pluginName, Vue.extend({ mixins: [PluginWrapper, p.component] }))
    }

    // TODO: check initialization function
  })
  return plugins
};

export const pickInitialPlugin = (plugins: PlaygroundPlugin[]): PlaygroundPlugin | null => {
  const priorityPlugin = plugins.find(
    p => p.shouldBeSelected && p.shouldBeSelected()
  );
  return priorityPlugin || plugins[0] || null
}

// export const defaultPluginFactories: ((v: Vue) => PlaygroundPlugin)[] = [
//   // compiledJSPlugin,
//   // showDTSPlugin,
//   // showErrors,
//   // runPlugin,
//   // optionsPlugin
//   showJSPlugin
// ];

export const setupPlayground = (
  sandbox: Sandbox,
  monaco: Monaco,
  config: PlaygroundConfig
) => {
  const playgroundParent = sandbox.getDomNode()!.parentElement!.parentElement!
    .parentElement!;
  // const dragBar = createDragBar();
  // playgroundParent.appendChild(dragBar);

  const sidebar = createSidebar();
  // playgroundParent.appendChild(sidebar);

  const tabBar = createTabBar();
  // sidebar.appendChild(tabBar);

  const container = createPluginContainer();
  sidebar.appendChild(container);

  const plugins = [] as PlaygroundPlugin[];
  const tabs = [] as HTMLButtonElement[];

  // const registerPlugin = (plugin: PlaygroundPlugin) => {
  //   plugins.push(plugin);

  //   const tab = createTabForPlugin(plugin);
  //   tabs.push(tab);

  //   // const tabClicked: HTMLElement["onclick"] = e => {
  //   //   const previousPlugin = currentPlugin();
  //   //   const newTab = e.target as HTMLElement;
  //   //   const newPlugin = plugins.find(p => p.displayName == newTab.textContent)!;
  //   //   activatePlugin(newPlugin, previousPlugin, sandbox, tabBar, container);
  //   // };

  //   tabBar.appendChild(tab);
  //   // tab.onclick = tabClicked;
  // };

  const currentPlugin = () => {
    const selectedTab = tabs.find(t => t.classList.contains("active"))!;
    return plugins[tabs.indexOf(selectedTab)];
  };

  // const initialPlugins = defaultPluginFactories.map(f => f());
  // initialPlugins.forEach(p => registerPlugin(p));

  // Choose which should be selected
  const priorityPlugin = plugins.find(
    plugin => plugin.shouldBeSelected && plugin.shouldBeSelected()
  );
  // const selectedPlugin = priorityPlugin || plugins[0];
  // const selectedTab = tabs[plugins.indexOf(selectedPlugin)]!;
  // selectedTab.onclick!({ target: selectedTab } as any);

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

  // When any compiler flags are changed, trigger a potential change to the URL
  // sandbox.setDidUpdateCompilerSettings(() => {
  //   playgroundDebouncedMainFunction();

  //   const model = sandbox.editor.getModel();
  //   const plugin = currentPlugin();
  //   if (model && plugin.modelChanged) plugin.modelChanged(sandbox, model);
  //   if (model && plugin.modelChangedDebounce)
  //     plugin.modelChangedDebounce(sandbox, model);
  // });

  // Setup working with the existing UI, once it's loaded

  // Versions of TypeScript

  // Set up the label for the dropdown
  // document.querySelectorAll("#versions > a").item(0).innerHTML =
  // "v" + sandbox.ts.version + " <span class='caret'/>";

  // Add the versions to the dropdown
  // const versionsMenu = document.querySelectorAll("#versions > ul").item(0);
  // const allVersions = ["3.8.0-beta", ...sandbox.supportedVersions];
  // allVersions.forEach((v: string) => {
  //   const li = document.createElement("li");
  //   const a = document.createElement("a");
  //   a.textContent = v;
  //   a.href = "#";

  //   li.onclick = () => {
  //     const currentURL = sandbox.getURLQueryWithCompilerOptions(sandbox);
  //     const params = new URLSearchParams(currentURL.split("#")[0]);
  //     params.set("ts", v);
  //     const hash = document.location.hash.length ? document.location.hash : "";
  //     const newURL = `${document.location.protocol}//${document.location.host}${document.location.pathname}?${params}${hash}`;

  //     // @ts-ignore - it is allowed
  //     document.location = newURL;
  //   };

  //   li.appendChild(a);
  //   versionsMenu.appendChild(li);
  // });

  // Support dropdowns
  // document.querySelectorAll(".navbar-sub li.dropdown > a").forEach(link => {
  //   const a = link as HTMLAnchorElement;
  //   a.onclick = _e => {
  //     if (a.parentElement!.classList.contains("open")) {
  //       document
  //         .querySelectorAll(".navbar-sub li.open")
  //         .forEach(i => i.classList.remove("open"));
  //     } else {
  //       document
  //         .querySelectorAll(".navbar-sub li.open")
  //         .forEach(i => i.classList.remove("open"));
  //       a.parentElement!.classList.toggle("open");

  //       const exampleContainer = a
  //         .closest("li")!
  //         .getElementsByTagName("ul")
  //         .item(0)!;

  //       // SEt exact height and widths for the popovers for the main playground navigation
  //       const isPlaygroundSubmenu = !!a.closest("nav");
  //       if (isPlaygroundSubmenu) {
  //         const playgroundContainer = document.getElementById(
  //           "playground-container"
  //         )!;
  //         exampleContainer.style.height = `calc(${playgroundContainer.getBoundingClientRect()
  //           .height + 26}px - 4rem)`;

  //         const width = window.localStorage.getItem("dragbar-x");
  //         exampleContainer.style.width = `calc(100% - ${width}px - 4rem)`;
  //       }
  //     }
  //   };
  // });

  // Handle the close buttons on the examples
  document.querySelectorAll("button.examples-close").forEach(b => {
    const button = b as HTMLButtonElement;
    button.onclick = (e: any) => {
      const button = e.target as HTMLButtonElement;
      const navLI = button.closest("li");
      navLI?.classList.remove("open");
    };
  });

  setupSidebarToggle();

  createConfigDropdown(sandbox, monaco);
  updateConfigDropdownForCompilerOptions(sandbox, monaco);

  // Support grabbing examples from the location hash
  if (location.hash.startsWith("#example")) {
    const exampleName = location.hash.replace("#example/", "").trim();
    sandbox.config.logger.log("Loading example:", exampleName);
    getExampleSourceCode(config.prefix, config.lang, exampleName).then(ex => {
      if (ex.example && ex.code) {
        const { example, code } = ex;

        // Update the localstorage showing that you've seen this page
        if (localStorage) {
          const seenText = localStorage.getItem("examples-seen") || "{}";
          const seen = JSON.parse(seenText);
          seen[example.id] = example.hash;
          localStorage.setItem("examples-seen", JSON.stringify(seen));
        }

        // Set the menu to be the same section as this current example
        // this happens behind the scene and isn't visible till you hover
        // const sectionTitle = example.path[0]
        // const allSectionTitles = document.getElementsByClassName('section-name')
        // for (const title of allSectionTitles) {
        //   if (title.textContent === sectionTitle) {
        //     title.onclick({})
        //   }
        // }

        const allLinks = document.querySelectorAll("example-link");
        // @ts-ignore
        for (const link of allLinks) {
          if (link.textContent === example.title) {
            link.classList.add("highlight");
          }
        }

        document.title = "TypeScript Playground - " + example.title;
        sandbox.setText(code);
      } else {
        sandbox.setText(
          "// There was an issue getting the example, bad URL? Check the console in the developer tools"
        );
      }
    });
  }

  // Sets up a way to click between examples
  monaco.languages.registerLinkProvider(
    sandbox.language,
    new ExampleHighlighter()
  );

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
  // window.playground = playground;

  console.log(`Using TypeScript ${window.ts.version}`);

  console.log("Available globals:");
  console.log("\twindow.ts", window.ts);
  console.log("\twindow.sandbox", window.sandbox);
  // console.log("\twindow.playground", window.playground);

  // Dev mode plugin
  // if (allowConnectingToLocalhost()) {
  //   window.exports = {};
  //   console.log("Connecting to dev plugin");
  //   try {
  //     // @ts-ignore
  //     const re = window.require;
  //     re(["local/index"], (devPlugin: any) => {
  //       console.log("Set up dev plugin from localhost:5000");
  //       console.log(devPlugin);
  //       playground.registerPlugin(devPlugin);

  //       // Auto-select the dev plugin
  //       activatePlugin(devPlugin, currentPlugin(), sandbox, tabBar, container);
  //     });
  //   } catch (error) {
  //     console.error("Problem loading up the dev plugin");
  //     console.error(error);
  //   }
  // }

  // activePlugins().forEach(plugin => {
  //   try {
  //     // @ts-ignore
  //     const re = window.require;
  //     re(
  //       [`unpkg/${plugin.module}@latest/dist/index`],
  //       (devPlugin: PlaygroundPlugin) => {
  //         playground.registerPlugin(devPlugin);

  //         // Auto-select the dev plugin
  //         if (devPlugin.shouldBeSelected && devPlugin.shouldBeSelected()) {
  //           activatePlugin(
  //             devPlugin,
  //             currentPlugin(),
  //             sandbox,
  //             tabBar,
  //             container
  //           );
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Problem loading up the plugin:", plugin);
  //     console.error(error);
  //   }
  // });

  // return playground;
};

export type Playground = ReturnType<typeof setupPlayground>;
