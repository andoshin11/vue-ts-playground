import Vue, { VNode } from "vue";
import { RootState } from "@/store";
import { Sandbox, PlaygroundConfig } from "@/lib/sandbox";
import { pluginFactories, defaultPlugins, pickInitialPlugin } from "@/lib/playground";
import { getURLQueryWithCompilerOptions } from "@/utils/router";

export default Vue.extend({
  render(): VNode {
    const defaultSlot: VNode = this.$slots["default"] as any;
    return defaultSlot;
  },
  computed: {
    state(): RootState {
      return this.$store.state;
    }
  },
  methods: {
    async createSandbox(): Promise<Sandbox> {
      const config: Partial<PlaygroundConfig> = {
        domID: "EditorEmbed"
      };
      return new Sandbox(window.main, config, window.ts);
    },
    initPlugins() {
      const plugins = pluginFactories(Vue)(defaultPlugins);
      this.$store.commit("storePlugins", plugins);
      const initialPlugin = pickInitialPlugin(this.state.plugins)
      if (initialPlugin) {
        this.$store.commit("storeCurrentPlugin", initialPlugin);
      }
    },
    playgroundDebouncedMainFunction(sandbox: Sandbox) {
      // Sets the URL and storage of the sandbox string

      const alwaysUpdateURL = !localStorage.getItem("disable-save-on-type");
      if (alwaysUpdateURL) {
        const newURL = getURLQueryWithCompilerOptions(sandbox, this.$route, {
          ts: sandbox.ts.version
        });
        // const digest = {
        //   ...newURL,
        //   hash: (newURL.hash || '').slice(0, 20) + '...'
        // }
        // console.log(`[Saving changes]: ${JSON.stringify(digest)}`);
        this.$router.replace(
          newURL,
          () => {},
          () => {}
        );
      }

      localStorage.setItem("sandbox-history", sandbox.getText());
    },
    handleDidChangeModelContent(sandbox: Sandbox) {
      const vm = this;
      const timestamp = new Date().getTime();

      this.$store.commit("storeModelChangedAt", timestamp);

      const plugin = this.state.currentPlugin;
      // if (plugin && plugin.modelChanged)
      //   plugin.modelChanged(sandbox, sandbox.getModel());

      // This needs to be last in the function
      // if (this.state.modelChangedAtDebouncing) return;
      this.$store.commit("storeModelChangedAtDebouncing", true);

      setTimeout(() => {
        // FIXME: handle debounce
        // vm.$store.commit("storeModelChangedAtDebouncing", false);
        vm.playgroundDebouncedMainFunction(sandbox);

        // Only call the plugin function once every 0.3s
        if (
          plugin &&
          vm.state.currentPlugin &&
          plugin.modelChangedDebounce &&
          plugin.id === vm.state.currentPlugin.id
        ) {
          // plugin.modelChangedDebounce(sandbox, sandbox.getModel());
        }
      }, 300);
    },
    handleDidUpdateCompilerSettings(sandbox: Sandbox) {
      // When any compiler flags are changed, trigger a potential change to the URL
      this.playgroundDebouncedMainFunction(sandbox);

      const model = sandbox.editor.getModel();
      const plugin = this.state.currentPlugin;
      if (model && plugin && plugin.modelChanged)
        plugin.modelChanged(sandbox, model);
      if (model && plugin && plugin.modelChangedDebounce)
        plugin.modelChangedDebounce(sandbox, model);
    }
  },
  async mounted() {
    const vm = this;
    // Init sandbox
    const sandbox = await this.createSandbox();
    this.$store.commit("storeSandbox", sandbox);

    // Set plugins
    this.initPlugins();

    // Add handler
    sandbox.editor.onDidChangeModelContent(() => {
      vm.handleDidChangeModelContent(sandbox);
    });
    sandbox.setDidUpdateCompilerSettings(() => {
      vm.handleDidUpdateCompilerSettings(sandbox);
    });

    // Trigger with initial data
    vm.handleDidChangeModelContent(sandbox);
  }
});
