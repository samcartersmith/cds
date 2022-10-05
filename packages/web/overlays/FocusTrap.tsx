import React, { memo, ReactElement, RefObject, useCallback, useEffect, useRef } from 'react';
import { FOCUSABLE_ELEMENTS } from '@cbhq/cds-common/tokens/overlays';

import { getBrowserGlobals } from '../utils/browser';

export type FocusTrapProps = { children: ReactElement; onEscPress?: () => void };

const NAVIGATION_KEYS = ['Tab', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
const ALPHABET_KEYS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export const FocusTrap = memo(function FocusTrap({ children, onEscPress }: FocusTrapProps) {
  const isFocused = useRef(false);
  const childrenRef = useRef<HTMLElement>(null);

  // trap focus for accessibility
  const handleKeyboardNavigation = useCallback(
    (event: KeyboardEvent, element: RefObject<HTMLElement>['current']) => {
      const document = getBrowserGlobals()?.document;
      const activeElement = document?.activeElement;

      if (!element || !document) return;

      const focusableElements = element.querySelectorAll(FOCUSABLE_ELEMENTS);
      const menuItems = element.querySelectorAll('[role="menuitem"]');
      const isMenuItem = activeElement && Array.from(menuItems).includes(activeElement);

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      const activeElementIndex = activeElement
        ? Array.from(focusableElements).indexOf(activeElement)
        : undefined;

      // bring focus inside modal
      if (
        !isFocused.current &&
        // check if focus is inside modal
        !Array.from(focusableElements).includes(activeElement as HTMLElement)
      ) {
        // don't focus if arrow keys are used, instead allow scroll via keyboard
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          return;
        }
        firstElement.focus();
        isFocused.current = true;
        event.preventDefault();
      }

      if (event.key === 'Tab') {
        event.preventDefault();
      }

      if (isMenuItem && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        event.preventDefault();
      }

      const focusPrevElement = () => {
        if (activeElementIndex) {
          const previousElement = focusableElements[activeElementIndex - 1] as HTMLElement;
          previousElement.focus();
        }
      };

      // force active element to loop back to beginning of list
      const handleLastElement = () => {
        if ((!event.shiftKey && event.key === 'Tab') || (event.key === 'ArrowDown' && isMenuItem)) {
          firstElement.focus();
          return;
        }
        if ((event.key === 'ArrowUp' && isMenuItem) || (event.shiftKey && event.key === 'Tab')) {
          focusPrevElement();
        }
      };

      const handleFirstElement = () => {
        // force active element to loop back to end of list
        if ((event.shiftKey && event.key === 'Tab') || (event.key === 'ArrowUp' && isMenuItem)) {
          lastElement.focus();
          return;
        }
        if ((event.key === 'ArrowDown' && isMenuItem) || event.key === 'Tab') {
          (focusableElements[1] as HTMLElement).focus();
        }
      };

      if (event.key === 'Home') {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      if (event.key === 'End') {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (isMenuItem && ALPHABET_KEYS.includes(event.key)) {
        event.preventDefault();

        const arrFocusableElements = Array.from(focusableElements);

        const elementWithMatchingFirstLetter = arrFocusableElements.find((el: Element) => {
          const textContentFirstLetter = el.textContent?.at(0)?.toLowerCase();
          const eventKeyLowerCase = event.key.toLowerCase();

          return textContentFirstLetter === eventKeyLowerCase;
        });

        if (elementWithMatchingFirstLetter) {
          (elementWithMatchingFirstLetter as HTMLElement).focus();
        }
      }

      if (activeElement === lastElement) {
        handleLastElement();
        return;
      }

      if (activeElement === firstElement) {
        handleFirstElement();
        return;
      }

      if (
        ((event.key === 'ArrowDown' && isMenuItem) || event.key === 'Tab') &&
        activeElementIndex
      ) {
        const nextElement = focusableElements[activeElementIndex + 1] as HTMLElement;
        nextElement.focus();
      }

      if (
        ((event.key === 'ArrowUp' && isMenuItem) || (event.key === 'Tab' && event.shiftKey)) &&
        activeElementIndex
      ) {
        focusPrevElement();
      }
    },
    [],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (NAVIGATION_KEYS.includes(event.key) || ALPHABET_KEYS.includes(event.key)) {
        handleKeyboardNavigation(event, childrenRef.current);
      }

      // Swallow the event, in case someone is listening on the body.
      event.stopPropagation();
    },
    [handleKeyboardNavigation, childrenRef],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        void onEscPress?.();
        isFocused.current = false;
      }
    },
    [onEscPress],
  );

  useEffect(() => {
    getBrowserGlobals()?.window.addEventListener('keydown', handleKeyDown);
    getBrowserGlobals()?.window.addEventListener('keyup', handleKeyUp);
    return () => {
      getBrowserGlobals()?.window.removeEventListener('keydown', handleKeyDown);
      getBrowserGlobals()?.window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // only works for single child
  const onlyChild = React.Children.only(children);

  if (!onlyChild) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return React.cloneElement(children, { ref: childrenRef });
});
