import Vue from "vue";
import { Sandbox, ModelType } from "@/lib/sandbox";
import { CombinedVueInstance } from "vue/types/vue";
import { PluginHooksType } from "vue/types/options";

declare module "vue/types/options" {
  export type PluginHooksType<V> = {
    /** Before we show the tab, use this to set up your HTML - it will all be removed by the playground when someone navigates off the tab */
    willMount?: (sandbox: Sandbox, vm: V) => void;
    /** After we show the tab */
    didMount?: (sandbox: Sandbox, vm: V) => void;
    /** Model changes while this plugin is actively selected  */
    modelChanged?: (
      sandbox: Sandbox,
      model: ModelType,
      vm: V
    ) => void | Promise<void>;
    /** Delayed model changes while this plugin is actively selected, useful when you are working with the TS API because it won't run on every keypress */
    modelChangedDebounce?: (
      sandbox: Sandbox,
      model: ModelType,
      vm: V
    ) => void | Promise<void>;
    /** Before we remove the tab */
    willUnmount?: (sandbox: Sandbox, vm: V) => void;
    /** After we remove the tab */
    didUnmount?: (sandbox: Sandbox, vm: V) => void;
  };

  interface ComponentOptions<V extends Vue> {
    pluginHooks?: PluginHooksType<V>;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $pluginHooks?: PluginHooksType<Vue>;
  }
}
