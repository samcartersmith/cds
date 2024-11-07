type MediaQueryListenerCallback = (this: MediaQueryList, ev: MediaQueryListEvent) => unknown;

export function addMediaQueryListener(
  mediaQuery: MediaQueryList | undefined,
  cb: MediaQueryListenerCallback,
) {
  if (mediaQuery?.addEventListener) {
    mediaQuery.addEventListener('change', cb);
  } else if (mediaQuery?.addListener) {
    // addListener is required for legacy browsers such as Safari 13
    mediaQuery.addListener(cb);
  }
}

export function removeMediaQueryListener(
  mediaQuery: MediaQueryList | undefined,
  cb: MediaQueryListenerCallback,
) {
  if (mediaQuery?.removeEventListener) {
    mediaQuery.removeEventListener('change', cb);
  } else if (mediaQuery?.removeListener) {
    // removeListener is required for legacy browsers such as Safari 13
    mediaQuery.removeListener(cb);
  }
}
