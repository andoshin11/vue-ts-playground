import { PlaygroundPlugin } from "@/lib/playground";
import Component from "./showJS.vue";

export const showJSPlugin: PlaygroundPlugin = {
  id: "js",
  displayName: "JS",
  component: Component
};
