import { MutableRefObject,useMemo } from 'react';

export type HTMLElementOrNull<T> = T | null;
export type RefElementOrNull<T> = T | null;
export type CallbackRef<T> = (node: T) => void;
export type AnyRef<T> =
  | React.Ref<T | null | undefined>
  | CallbackRef<T | null | undefined>
  | MutableRefObject<T | null | undefined>;

const setRef = <T>(ref: AnyRef<T>, value: RefElementOrNull<T>) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    // React types assume ref is readonly
    // @ts-expect-error https://github.com/facebook/react/issues/13029#issuecomment-410002316
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
};

/**
 * useMergedRef
 * Merges multiple refs into a single function ref.
 * Takes any number of refs.
 * Refs can be mutable refs or function refs.
 * @param refs
 */
export function useMergedRef<T>(...refs: (AnyRef<T> | undefined)[]): CallbackRef<T> | null {
  return useMemo(() => {
    if (refs.every((ref) => ref === null)) {
      return null;
    }
    return (refValue) => {
      refs.forEach((ref) => {
        if (ref) {
          setRef(ref, refValue);
        }
      });
    };
  }, [refs]);
}
