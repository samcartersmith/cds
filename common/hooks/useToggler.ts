import { useCallback, useState } from 'react';

export function useToggler(
  initial = false
): [
  boolean,
  {
    toggleOn: () => void;
    toggleOff: () => void;
    toggle: () => void;
  }
] {
  const [isToggled, setIsToggled] = useState(initial);

  const toggleOn = useCallback(() => {
    setIsToggled(true);
  }, [setIsToggled]);

  const toggleOff = useCallback(() => {
    setIsToggled(false);
  }, [setIsToggled]);

  const toggle = useCallback(() => {
    setIsToggled(prev => !prev);
  }, [setIsToggled]);

  return [
    isToggled,
    {
      toggleOn,
      toggleOff,
      toggle,
    },
  ];
}
