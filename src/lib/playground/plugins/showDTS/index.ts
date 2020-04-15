import { PlaygroundPlugin } from "@/lib/playground";
import Component from "./showDTS.vue";

export const showDTSPlugin: PlaygroundPlugin = {
  id: "dts",
  displayName: "DTS",
  component: Component
};
