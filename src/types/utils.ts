export type TupleToUnion<T> = T extends { [K in keyof T]: infer U } ? U : never;
