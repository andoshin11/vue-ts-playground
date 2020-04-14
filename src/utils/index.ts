import Vue from 'vue'

export * from "./monaco"

export function isVueComponentRef(node: Vue | Element | Vue[] | Element[]): node is Vue {
  return !!node && '__vue__' in node
}

export const sortBy = <T extends object>(key: keyof T) => (a: T, b: T) => {
  const keyOfA = a[key]
  const keyofB = b[key]

  return keyOfA === keyofB ? 0 : keyOfA > keyofB ? 1 : -1
}
