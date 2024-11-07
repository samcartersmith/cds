/**
 * Ensure that exactly one of the specified keys is set on an object type `T`.
 *
 * This type is useful for enforcing the requirement that a component or function
 * is called with exactly one of several mutually exclusive props set. The type
 * enforces the constraint that exactly one of the specified keys is required,
 * while all other keys are not allowed.
 *
 * Example usage:
 *
 * type MyProps = RequireExactlyOneType<{
 *   propA?: number;
 *   propB?: string;
 *   propC?: boolean;
 * }>;
 *
 * This ensures that `MyProps` must have exactly one of `propA`, `propB`, or `propC`
 * set, while all other props are not allowed.
 */
export type RequireExactlyOneType<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];
