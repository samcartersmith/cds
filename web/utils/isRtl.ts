import { isBrowser } from './browser';

export const isRtl = (element?: HTMLElement) => {
  if (!isBrowser()) {
    return;
  }
  return (element ?? document.documentElement).dir === 'rtl';
};
