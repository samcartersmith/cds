export type NoopFn = () => void;

// Makes all properties visible when hovering over the type
export type Expand<T extends Record<string, unknown>> = { [P in keyof T]: T[P] };
