import { useMemo } from 'react';
import { InputVariants } from '../types/InputBaseProps';

export const useInputVariant = (focused: boolean, variant: InputVariants) => {
  return useMemo(
    () => (focused && variant === 'foregroundMuted' ? 'primary' : variant),
    [focused, variant],
  );
};
