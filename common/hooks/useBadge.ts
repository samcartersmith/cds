import { useMemo } from 'react';

import { BadgeVariant, BadgeValue, BadgeBaseProps } from '../types';

export { BadgeBaseProps };

const badgeVariants = {
  empty: {
    width: 0,
    height: 0,
    borderRadius: 'round',
    variant: 'empty',
  },
  singleDigit: {
    height: 18,
    width: 18,
    borderRadius: 'round',
    variant: 'singleDigit',
  },
  doubleDigit: {
    height: 18,
    width: 26,
    borderRadius: 'badge',
    variant: 'doubleDigit',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 'round',
    variant: 'dot',
  },
} as const;

export const useBadge = (value: BadgeValue = 0, variantOverride?: BadgeVariant) => {
  const valueLength = `${value}`.split('').length;
  const { variant, ...badgeStyles } = useMemo(() => {
    if (value === 0) {
      return badgeVariants.empty;
    }
    if (variantOverride) {
      return badgeVariants[variantOverride];
    }

    if (valueLength === 1) {
      return badgeVariants.singleDigit;
    }
    if (valueLength === 2) {
      return badgeVariants.doubleDigit;
    }
    return badgeVariants.dot;
  }, [value, valueLength, variantOverride]);

  return useMemo(() => {
    return {
      badgeStyles: {
        alignItems: 'center',
        justifyContent: 'center',
        background: 'negative',
        ...badgeStyles,
      },
      badgeContent: valueLength > 2 ? '' : `${value}`,
      badgeVariant: variant,
    } as const;
  }, [badgeStyles, value, valueLength, variant]);
};
