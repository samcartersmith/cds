import { useMemo } from 'react';

import { getComputedStyleForClassName } from '../utils/getComputedStyleForClassName';

/**
 * Look up the first element with a given className and access a CSS property from that CSS class.
 * @param className - string - className to lookup. This uses document.querySelector internally thus will return the first matching element if multiple matches are found.
 * @param property - valid CSS property (i.e. color, display, --gray0, etc)
 * @param fallback - fallback for SSR or if matching element cannot be found.
 */
export const useComputedStyleForClassName = (
  className: string,
  property: string,
  fallback: string,
) => {
  return useMemo(
    () => getComputedStyleForClassName(className, property, fallback),
    [className, fallback, property],
  );
};
