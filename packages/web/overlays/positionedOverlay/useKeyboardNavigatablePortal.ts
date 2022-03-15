import { useCallback, useEffect, useRef } from 'react';

import { isSSR } from '../../utils/browser';

const FOCUSABLE_ELEMENTS = 'a[href], button:not([disabled]), textarea, input, select';

type UseKeyboardNavigatablePortalParams = {
  portalContent: HTMLElement | null;
  handleClose: () => void;
};

/** This hook is what enables portals to be accessable via keyboard. */
export const useKeyboardNavigatablePortal = ({
  portalContent,
  handleClose,
}: UseKeyboardNavigatablePortalParams) => {
  const isFocusedInPortal = useRef(false);

  const handleTabKey = useCallback(
    (event: KeyboardEvent) => {
      if (!portalContent || isSSR()) return;

      const focusables = Array.from(portalContent.querySelectorAll(FOCUSABLE_ELEMENTS));

      if (focusables.length === 0) return;

      const first = focusables[0] as HTMLElement;
      const last = focusables[focusables.length - 1] as HTMLElement;

      // bring focus inside portal
      if (
        !isFocusedInPortal.current &&
        !focusables.includes(document.activeElement as HTMLElement)
      ) {
        first.focus();
        isFocusedInPortal.current = true;
        event.preventDefault();
      }

      // tab to change focus to first if on last element in portal
      else if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }

      // tab to last element in portal is tab+shift on first
      else if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      }
    },
    [isFocusedInPortal, portalContent],
  );

  // close portal on Escape key press for accessibility
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
        isFocusedInPortal.current = false;
      }

      if (event.key === 'Tab') {
        handleTabKey(event);
      }

      // Swallow the event, in case someone is listening on the body.
      event.stopPropagation();
    },
    [handleClose, handleTabKey],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};
