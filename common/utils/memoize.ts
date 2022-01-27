/* eslint-disable @typescript-eslint/no-explicit-any */
export function memoize<T extends (...args: any[]) => unknown>(
  func: T extends (...args: infer Args) => infer ReturnType ? (...args: Args) => ReturnType : T,
  resolver: (...args: Parameters<T>) => string,
) {
  const memoized = function memoized(...args: Parameters<T>): ReturnType<T> {
    const key: string = resolver?.(...args);
    const { cache } = memoized;

    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    const result = func(...args) as ReturnType<T>;
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new Map<string, ReturnType<T>>();
  return memoized;
}
