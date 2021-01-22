import { useMemo } from 'react';

import { SpacingStyles } from '@cds/core';
import { I18nManager, ViewStyle } from 'react-native';

export const useSpacingStyles = ({
  spacing,
  spacingBottom,
  spacingEnd,
  spacingHorizontal,
  spacingStart,
  spacingTop,
  spacingVertical,
}: SpacingStyles): ViewStyle => {
  return useMemo(() => {
    const styles: ViewStyle = {};

    // TODO multipliers/constants
    const setSpacing = (prop: string, value: number) => {
      if (value < 0) {
        styles[prop.replace('spacing', 'margin') as 'margin'] = value * -1;
      } else {
        styles[prop.replace('spacing', 'padding') as 'padding'] = value * 1;
      }
    };

    if (spacing !== undefined) {
      setSpacing('spacingTop', spacing);
      setSpacing('spacingRight', spacing);
      setSpacing('spacingBottom', spacing);
      setSpacing('spacingLeft', spacing);
    }

    if (spacingTop !== undefined) {
      setSpacing('spacingTop', spacingTop);
    }

    if (spacingBottom !== undefined) {
      setSpacing('spacingBottom', spacingBottom);
    }

    if (spacingStart !== undefined) {
      setSpacing(I18nManager.isRTL ? 'spacingRight' : 'spacingLeft', spacingStart);
    }

    if (spacingEnd !== undefined) {
      setSpacing(I18nManager.isRTL ? 'spacingLeft' : 'spacingRight', spacingEnd);
    }

    if (spacingVertical !== undefined) {
      setSpacing('spacingTop', spacingVertical);
      setSpacing('spacingBottom', spacingVertical);
    }

    if (spacingHorizontal !== undefined) {
      setSpacing('spacingLeft', spacingHorizontal);
      setSpacing('spacingRight', spacingHorizontal);
    }

    return styles;
  }, [
    spacing,
    spacingBottom,
    spacingEnd,
    spacingHorizontal,
    spacingStart,
    spacingTop,
    spacingVertical,
  ]);
};
