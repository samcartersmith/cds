import { useCallback, useMemo, useState } from 'react';

export function useToggler(
  initial = false
): {
  isToggled: boolean;
  toggleOn: () => void;
  toggleOff: () => void;
  toggle: () => void;
} {
  const [isToggled, setIsToggled] = useState(initial);

  const toggleOn = useCallback(() => {
    setIsToggled(true);
  }, []);

  const toggleOff = useCallback(() => {
    setIsToggled(false);
  }, []);

  const toggle = useCallback(() => {
    setIsToggled(prev => !prev);
  }, []);

  return useMemo(
    () => ({
      isToggled,
      toggleOn,
      toggleOff,
      toggle,
    }),
    [isToggled, toggle, toggleOff, toggleOn]
  );
}
