import { NoopFn } from '@cbhq/cds-common';

export function isSSR() {
  return !(typeof globalThis.window != 'undefined' && globalThis.window.document);
}

export function isBrowser() {
  return !isSSR();
}

export function onSSR(callback: NoopFn, otherwise?: NoopFn) {
  return isSSR() ? callback() : otherwise?.();
}

export function onBrowser(callback: NoopFn, otherwise?: NoopFn) {
  return isBrowser() ? callback() : otherwise?.();
}
