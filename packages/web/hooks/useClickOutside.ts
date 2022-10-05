import { useCallback, useEffect } from 'react';
import { NoopFn } from '@cbhq/cds-common';

import { getBrowserGlobals } from '../utils/browser';

type ClickOutsideParams = {
  element: HTMLElement | null;
  callback: NoopFn | ((event: MouseEvent) => void);
  /** @default true */
  enabled?: boolean;
};

export const useClickOutside = ({ element, callback, enabled = true }: ClickOutsideParams) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      const isClickInsideElement = element?.contains(event.target as Element);
      if (!isClickInsideElement) {
        callback(event);
      }
    },
    [callback, element],
  );

  useEffect(() => {
    const browser = getBrowserGlobals();
    if (enabled) {
      browser?.document.addEventListener('click', handleClick, true);
      return () => browser?.document.removeEventListener('click', handleClick, true);
    }
    return () => {};
  }, [enabled, handleClick]);
};
