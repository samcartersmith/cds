import { useEffect, useRef } from 'react';
import { FOCUSABLE_ELEMENTS } from '@cbhq/cds-common/tokens/overlays';
import { isBrowser } from '@cbhq/cds-web/utils/browser';

/** Refocuses a pressable that opens a menu after the menu has been opened and then closed */
/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const useRefocusTrigger = (shouldRefocus: boolean) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    //  focuses the element after the menu opens & closes at least once
    if (shouldRefocus && isBrowser() && ref.current) {
      const focusableElements = ref.current.parentNode?.querySelectorAll(FOCUSABLE_ELEMENTS);

      if (focusableElements?.length && focusableElements[0]) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [shouldRefocus, ref]);

  return ref;
};
