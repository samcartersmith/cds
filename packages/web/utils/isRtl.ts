import { isBrowser } from './browser';

export const isRtl = (element?: HTMLElement) => {
  if (!isBrowser()) {
    return false;
  }
  // eslint-disable-next-line no-restricted-globals
  return (element ?? document.documentElement).dir === 'rtl';
};
