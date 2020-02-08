import Vue, { VNode } from 'vue'
import { RootState } from '@/store'
import { Sandbox, createTypeScriptSandbox, PlaygroundConfig } from '@/lib/sandbox'
import { defaultPluginFactories, PlaygroundPlugin } from '@/lib/playground'

interface IData {
  debouncingTimer: boolean
}

export default Vue.extend({
  data(): IData {
    return {
      debouncingTimer: false
    }
  },
  render(h) {
    const defaultSlot: VNode = this.$slots['default'] as any

    // defaultSlot!.elm?.addEventListener('didChangeModelContent', this.handleDidChangeModelContent)

    return defaultSlot
  },
  computed: {
    state(): RootState {
      return this.$store.state
    }
  },
  methods: {
    async createSandbox(): Promise<Sandbox> {
      const monaco = await import("monaco-editor");
      const ts = await import("typescript");
      const config: Partial<PlaygroundConfig> = {
        domID: "Editor"
      }
      const sandbox = createTypeScriptSandbox(config, monaco, ts);
      return sandbox;
    },
    initPlugins() {
      const plugins = defaultPluginFactories.map(p => p())
      this.$store.commit('storePlugins', plugins)
      const priorityPlugin = this.state.plugins.find(p => p.shouldBeSelected && p.shouldBeSelected())
      const selectedPlugin = priorityPlugin || this.state.plugins[0];
      if (selectedPlugin) {
        this.$store.commit('storeCurrentPlugin', selectedPlugin)
      }
    },
    playgroundDebouncedMainFunction(sandbox: Sandbox) {
      // Sets the URL and storage of the sandbox string

      const alwaysUpdateURL = !localStorage.getItem("disable-save-on-type");
      if (alwaysUpdateURL) {
        const newURL = sandbox.getURLQueryWithCompilerOptions(sandbox);
        window.history.replaceState({}, "", newURL);
      }

      localStorage.setItem("sandbox-history", sandbox.getText());
    },
    handleDidChangeModelContent(sandbox: Sandbox) {
      const vm = this

      const plugin = this.state.currentPlugin
      if (plugin && plugin.modelChanged) plugin.modelChanged(sandbox, sandbox.getModel());

      // This needs to be last in the function
      if (this.debouncingTimer) return;
      this.debouncingTimer = true

      setTimeout(() => {
        vm.debouncingTimer = false;
        vm.playgroundDebouncedMainFunction(sandbox);

        // Only call the plugin function once every 0.3s
        if (
          plugin &&
          vm.state.currentPlugin &&
          plugin.modelChangedDebounce &&
          plugin.id === vm.state.currentPlugin.id
        ) {
          plugin.modelChangedDebounce(sandbox, sandbox.getModel());
        }
      }, 300);
    },
    handleDidUpdateCompilerSettings(sandbox: Sandbox) {
      // When any compiler flags are changed, trigger a potential change to the URL
      this.playgroundDebouncedMainFunction(sandbox)

      const model = sandbox.editor.getModel();
      const plugin = this.state.currentPlugin;
      if (model && plugin && plugin.modelChanged) plugin.modelChanged(sandbox, model);
      if (model && plugin && plugin.modelChangedDebounce)
        plugin.modelChangedDebounce(sandbox, model);
    }
  },
  async mounted() {
    const vm = this
    // Init sandbox
    const sandbox = await this.createSandbox()
    this.$store.commit('storeSandbox', sandbox)

    // Set plugins
    this.initPlugins()

    // Add handler
    sandbox.editor.onDidChangeModelContent(() => {
      vm.handleDidChangeModelContent(sandbox)
    })
    sandbox.setDidUpdateCompilerSettings(() => {
      vm.handleDidUpdateCompilerSettings(sandbox)
    })
  }
})
