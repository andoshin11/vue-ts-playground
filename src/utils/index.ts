import Vue from 'vue'

export * from "./monaco"

export function isVueComponentRef(node: Vue | Element | Vue[] | Element[]): node is Vue {
  return !!node && '__vue__' in node
}
