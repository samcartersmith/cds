import { useMemo } from 'react';

import { SpacingScale, UseSpacingStylesProps } from '@cds/common';
import { useScale } from '@cds/theme';
import { scales } from '@cds/theme/native';
import { I18nManager, ViewStyle } from 'react-native';

export const useSpacingStyles = ({
  all,
  bottom,
  top,
  start,
  end,
  vertical,
  horizontal,
  isInverted = false,
}: UseSpacingStylesProps): ViewStyle => {
  const scale = useScale();

  return useMemo(() => {
    const styles: ViewStyle = {};

    const setSpacing = (prop: string, value: SpacingScale) => {
      const spacingValue = value === 0 ? 0 : scales[scale].spacing[value];
      if (isInverted) {
        styles[prop.replace('spacing', 'margin') as 'margin'] = spacingValue * -1;
      } else {
        styles[prop.replace('spacing', 'padding') as 'padding'] = spacingValue;
      }
    };

    if (all !== undefined) {
      setSpacing('spacingTop', all);
      setSpacing('spacingRight', all);
      setSpacing('spacingBottom', all);
      setSpacing('spacingLeft', all);
    }

    if (top !== undefined) {
      setSpacing('spacingTop', top);
    }

    if (bottom !== undefined) {
      setSpacing('spacingBottom', bottom);
    }

    if (start !== undefined) {
      setSpacing(I18nManager.isRTL ? 'spacingRight' : 'spacingLeft', start);
    }

    if (end !== undefined) {
      setSpacing(I18nManager.isRTL ? 'spacingLeft' : 'spacingRight', end);
    }

    if (vertical !== undefined) {
      setSpacing('spacingTop', vertical);
      setSpacing('spacingBottom', vertical);
    }

    if (horizontal !== undefined) {
      setSpacing('spacingLeft', horizontal);
      setSpacing('spacingRight', horizontal);
    }

    return styles;
  }, [all, bottom, end, horizontal, start, top, vertical, scale, isInverted]);
};
