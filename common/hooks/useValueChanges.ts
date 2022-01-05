import { useRef } from 'react';

export const useValueChanges = (newValue: string) => {
  const previousValueRef = useRef<typeof newValue>();
  const previousValue = previousValueRef.current;
  previousValueRef.current = newValue;
  return {
    hasChanged: newValue !== previousValue,
    hasNotChanged: newValue === previousValue,
    previousValue,
    newValue,
  };
};
