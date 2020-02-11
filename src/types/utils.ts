export type TupleToUnion<T> = T extends { [K in keyof T]: infer U } ? U : never;

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;
