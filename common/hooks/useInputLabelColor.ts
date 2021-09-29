import { useMemo } from 'react';
import { InputVariant } from '../types/InputBaseProps';

export const useInputLabelColor = (variant: InputVariant) => {
  return useMemo(() => {
    let labelColor = variant;

    if (variant === 'foregroundMuted') {
      labelColor = 'foreground';
    }

    return labelColor;
  }, [variant]);
};
