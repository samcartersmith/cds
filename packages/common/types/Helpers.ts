export type NoopFn = () => void;

// Makes all properties visible when hovering over the type
export type Expand<T extends Record<string, unknown>> = { [P in keyof T]: T[P] };

// Recursive key for nested objects
export type RecursiveKeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends object[]
    ? `${K}`
    : T[K] extends object
    ? `${K}.${RecursiveKeyOf<T[K]>}`
    : `${K}`;
}[keyof T & (string | number)];
