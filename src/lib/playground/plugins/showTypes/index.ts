import { PlaygroundPlugin } from "@/lib/playground";
import Component from "./showTypes.vue";

export const showTypesPlugin: PlaygroundPlugin = {
  id: "types",
  displayName: "Types",
  component: Component
};
