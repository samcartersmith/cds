import { useMemo } from 'react';
import { InputVariants } from '../types/InputBaseProps';

export const useInputLabelColor = (focused: boolean, variant: InputVariants) => {
  return useMemo(() => {
    let labelColor = variant;

    if (variant === 'foregroundMuted') {
      labelColor = 'foreground';
    }

    if (focused && (variant === 'foregroundMuted' || variant === 'foreground')) {
      labelColor = 'primary';
    }

    return labelColor;
  }, [focused, variant]);
};
