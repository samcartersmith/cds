import { useMemo } from 'react';

import { emptyObject } from '@cbhq/cds-utils';

import { borderRadius } from '../tokens/border';
import type { BorderRadius, PinningDirection } from '../types';

export const usePinBorderRadiusStyles = (pin?: PinningDirection, radius?: BorderRadius) => {
  return useMemo(() => {
    if (!radius) return emptyObject;
    switch (pin) {
      case 'top':
        return {
          borderBottomRightRadius: borderRadius[radius],
          borderBottomLeftRadius: borderRadius[radius],
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          borderTopWidth: 0,
        };
      case 'right':
        return {
          borderTopLeftRadius: borderRadius[radius],
          borderBottomLeftRadius: borderRadius[radius],
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          borderRightWidth: 0,
        };
      case 'bottom':
        return {
          borderTopRightRadius: borderRadius[radius],
          borderTopLeftRadius: borderRadius[radius],
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomWidth: 0,
        };
      case 'left':
        return {
          borderTopRightRadius: borderRadius[radius],
          borderBottomRightRadius: borderRadius[radius],
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeftWidth: 0,
        };
      default:
        return emptyObject;
    }
  }, [pin, radius]);
};
