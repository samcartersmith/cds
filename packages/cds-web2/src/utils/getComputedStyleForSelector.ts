import { isSSR } from './browser';

type GetComputedStyleForSelectorProps = {
  selector: string;
  property: string;
  fallback: string;
};

/**
 * Look up the first element with a given className and access a CSS property value from that element.
 * @param className - string - selector to lookup. Will return the first element that matches if multiple matches are found.
 * @param property - valid CSS property (i.e. color, display, --gray0, etc)
 * @param fallback - string - fallback property value for SSR or if an element with the provided className cannot be found.
 */
export const getComputedStyleForSelector = ({
  selector,
  property,
  fallback,
}: GetComputedStyleForSelectorProps) => {
  if (isSSR()) return fallback;
  const el = document.querySelector(selector);
  if (el) {
    const computedStyle = getComputedStyle(el).getPropertyValue(property);
    return computedStyle || fallback;
  }
  return fallback;
};
