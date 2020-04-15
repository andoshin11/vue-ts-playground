import Vue from "vue";
import Vuex from "vuex";
import { Sandbox } from "@/lib/sandbox";
import { PlaygroundPlugin } from "@/lib/playground";

Vue.use(Vuex);

type ThemeType = "sandbox" | "sandbox-dark";

type ModalForCode = {
  code: string;
  subtitle: string;
};

export interface RootState {
  sandbox: Sandbox | null;
  plugins: PlaygroundPlugin[];
  currentPlugin: PlaygroundPlugin | null;
  modelChangedAt: number | null;
  modelChangedAtDebouncing: boolean;
  currentTheme: ThemeType | null;
  modalForCode: ModalForCode | null;
}

export default new Vuex.Store<RootState>({
  state: {
    sandbox: null,
    plugins: [],
    currentPlugin: null,
    modelChangedAt: null,
    modelChangedAtDebouncing: false,
    currentTheme: null,
    modalForCode: null
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
    },
    storeModelChangedAt(state, val: RootState["modelChangedAt"]) {
      state.modelChangedAt = val;
    },
    storeModelChangedAtDebouncing(
      state,
      val: RootState["modelChangedAtDebouncing"]
    ) {
      state.modelChangedAtDebouncing = val;
    },
    storeCurrentTheme(state, theme: ThemeType) {
      state.currentTheme = theme;
    },
    storeModalForCode(state, info: ModalForCode | null) {
      state.modalForCode = info;
    }
  },
  actions: {
    setTheme({ commit, state }, theme: ThemeType | undefined) {
      const { sandbox } = state;
      if (!sandbox) return;
      const { editor } = sandbox.monaco;

      const newTheme: ThemeType = theme
        ? theme
        : localStorage
        ? (localStorage.getItem("editor-theme") as any) || "sandbox"
        : "sandbox";

      editor.setTheme(newTheme);

      localStorage.setItem("editor-theme", newTheme);
      commit("storeCurrentTheme", newTheme);
    }
  }
});
