import { NoopFn } from '@cbhq/cds-common';

/**
 * @todo Add fbjs utils as dependency and replace with canUseDOM
 * @link https://github.com/facebook/fbjs/blob/main/packages/fbjs/src/core/ExecutionEnvironment.js
 */
export function isBrowser() {
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  return !!(typeof window !== 'undefined' && window?.document?.createElement);
}

export function isSSR() {
  return !isBrowser();
}

export function onSSR(callback: NoopFn, otherwise?: NoopFn) {
  return isSSR() ? callback() : otherwise?.();
}

export function onBrowser(callback: NoopFn, otherwise?: NoopFn) {
  return isBrowser() ? callback() : otherwise?.();
}
/**
 * Gets browser builtin globals in an server-side-rendering-safe way
 *
 * @returns The globals if in a browser environment, or undefined if in a
 * SSR environment
 */
export function getBrowserGlobals() {
  return isSSR() ? undefined : { window, document };
}
