import React, { memo, ReactElement, RefObject, useCallback, useEffect, useRef } from 'react';

import {getBrowserGlobals, isSSR} from '../utils/browser';

export type FocusTrapProps = { children: ReactElement; onEscPress?: () => void };

const FOCUSABLE_ELEMENTS = 'a[href], button:not([disabled]), textarea, input, select';

export const FocusTrap = memo(function FocusTrap({ children, onEscPress }: FocusTrapProps) {
  const isFocused = useRef(false);
  const childrenRef = useRef<HTMLElement>(null);

  // trap focus for accessibility
  const handleTabKey = useCallback(
    (event: KeyboardEvent, element: RefObject<HTMLElement>['current']) => {
      if (!element || isSSR()) return;

      const focusableModalElements = element.querySelectorAll(FOCUSABLE_ELEMENTS);

      if (focusableModalElements.length === 0) return;

      const firstElement = focusableModalElements[0] as HTMLElement;
      const lastElement = focusableModalElements[focusableModalElements.length - 1] as HTMLElement;

      const document = getBrowserGlobals()?.document
      // bring focus inside modal
      if (
        !isFocused.current &&
        // check if focus is inside modal
        !Array.from(focusableModalElements).includes(document?.activeElement as HTMLElement)
      ) {
        firstElement.focus();
        isFocused.current = true;
        event.preventDefault();
      }

      // tab to change focus to next element
      if (!event.shiftKey && document?.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }

      // shift + tab to change to previous element
      if (event.shiftKey && document?.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    },
    [],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        void onEscPress?.();
        isFocused.current = false;
      }

      if (event.key === 'Tab') {
        handleTabKey(event, childrenRef.current);
      }

      // Swallow the event, in case someone is listening on the body.
      event.stopPropagation();
    },
    [handleTabKey, childrenRef, onEscPress],
  );

  useEffect(() => {
    getBrowserGlobals()?.window.addEventListener('keydown', handleKeyDown);
    return () => {
      getBrowserGlobals()?.window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // only works for single child
  const onlyChild = React.Children.only(children);

  if (!onlyChild) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return React.cloneElement(children, { ref: childrenRef });
});
