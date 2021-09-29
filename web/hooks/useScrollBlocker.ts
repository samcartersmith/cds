import { useRef, useCallback } from 'react';
import { isSSR } from '../utils/browser';

// credits to https://gist.github.com/reecelucas/2f510e6b8504008deaaa52732202d2da
export const useScrollBlocker = () => {
  const scroll = useRef(false);

  const blockScroll = useCallback((shouldBlock: boolean) => {
    if (isSSR()) return;

    const html = document.documentElement;
    const { body } = document;

    if (!body || !body.style) return;

    // block scroll
    if (shouldBlock && !scroll.current) {
      const scrollBarWidth = window.innerWidth - html.clientWidth;
      const bodyPaddingRight =
        parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) || 0;

      html.style.position = 'relative';
      body.style.position = 'relative';
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

      scroll.current = true;
    }

    // allow scroll
    if (!shouldBlock && scroll.current) {
      html.style.position = '';
      html.style.overflow = '';
      body.style.position = '';
      body.style.overflow = '';
      body.style.paddingRight = '';

      scroll.current = false;
    }
  }, []);

  return blockScroll;
};
