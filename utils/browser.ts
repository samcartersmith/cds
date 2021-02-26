export function isSSR() {
  return !(typeof globalThis.window != 'undefined' && globalThis.window.document);
}

export function isBrowser() {
  return !isSSR();
}

export function onSSR(callback: VoidFunction, otherwise?: VoidFunction) {
  return isSSR() ? callback() : otherwise?.();
}

export function onBrowser(callback: VoidFunction, otherwise?: VoidFunction) {
  return isBrowser() ? callback() : otherwise?.();
}
