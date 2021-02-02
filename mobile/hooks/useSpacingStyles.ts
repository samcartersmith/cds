import { useMemo } from 'react';

import { SpacingScale, SpacingStyles } from '@cds/core';
import { useScale } from '@cds/theme';
import { scales } from '@cds/theme/native';
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
  const scale = useScale();

  return useMemo(() => {
    const styles: ViewStyle = {};

    const setSpacing = (
      prop: keyof SpacingStyles | 'spacingRight' | 'spacingLeft',
      value: SpacingScale
    ) => {
      const spacingValue = value === 0 ? 0 : scales[scale].spacing[value];
      styles[prop.replace('spacing', 'padding') as 'padding'] = spacingValue * 1;
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
    scale,
  ]);
};
