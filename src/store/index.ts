import Vue from "vue";
import Vuex from "vuex";
import { Sandbox } from "@/lib/sandbox";
import { PlaygroundPlugin } from "@/lib/playground";
import { activatePlugin } from "@/utils/plugin";

Vue.use(Vuex);

export interface RootState {
  sandbox: Sandbox | null;
  plugins: PlaygroundPlugin[];
  currentPlugin: PlaygroundPlugin | null;
}

export default new Vuex.Store<RootState>({
  state: {
    sandbox: null,
    plugins: [],
    currentPlugin: null
  },
  mutations: {
    storeSandbox(state, sandbox: Sandbox) {
      state.sandbox = sandbox;
    },
    storePlugins(state, plugins: PlaygroundPlugin[]) {
      state.plugins = plugins;
    },
    storeCurrentPlugin(state, plugin: PlaygroundPlugin) {
      state.currentPlugin = plugin;
    }
  },
  actions: {
    storeCurrentPlugin({ commit, state }, plugin: PlaygroundPlugin) {
      const { sandbox, currentPlugin: previousPlugin } = state;
      if (!sandbox) return;

      activatePlugin(plugin, previousPlugin, sandbox);

      commit("storeCurrentPlugin", plugin);
    }
  }
});
