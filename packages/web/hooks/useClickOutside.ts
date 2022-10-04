import { MutableRefObject, useCallback, useEffect } from 'react';
import { NoopFn } from '@cbhq/cds-common';

import { getBrowserGlobals } from '../utils/browser';

export const useClickOutside = (ref: MutableRefObject<HTMLElement | null>, cb: NoopFn) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      const isClickInsideElement = ref.current?.contains(event.target as Element);
      if (!isClickInsideElement) {
        cb();
      }
    },
    [cb, ref],
  );

  useEffect(() => {
    const browser = getBrowserGlobals();
    browser?.document.addEventListener('click', handleClick, true);
    return () => browser?.document.removeEventListener('click', handleClick, true);
  }, [handleClick]);
};
