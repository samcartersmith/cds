import { useCallback, useMemo, useRef } from 'react';

export const useTriggerFocus = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const focusTrigger = useCallback(() => {
    triggerRef.current?.focus();
  }, []);

  return useMemo(
    () => ({
      triggerRef,
      focusTrigger,
    }),
    [focusTrigger],
  );
};
