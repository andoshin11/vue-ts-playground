import Vue from "vue";

export * from "./monaco";

export function isVueComponentRef(
  node: Vue | Element | Vue[] | Element[]
): node is Vue {
  return !!node && "__vue__" in node;
}

export const sortBy = <T extends object>(key: keyof T) => (a: T, b: T) => {
  const keyOfA = a[key];
  const keyofB = b[key];

  return keyOfA === keyofB ? 0 : keyOfA > keyofB ? 1 : -1;
};

export const judgeMobile = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(max-width: 768px)").matches;

export const isMobile = judgeMobile();
