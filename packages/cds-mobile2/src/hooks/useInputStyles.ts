import { useMemo } from 'react';
import { InputVariant } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/new/vars';

import { useTheme } from '../system/ThemeProvider';
import { useTypographyStyles } from '../typography';

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'textPrimary',
  positive: 'textPositive',
  negative: 'textNegative',
  foreground: 'textForeground',
  foregroundMuted: 'textForegroundMuted',
  secondary: 'backgroundSecondary',
};

/**
 * The default input style is different from
 * what our text body offers, so we need to add custom
 * input text style to match our text body style.
 */
export const useInputTextStyles = (textColor: InputVariant) => {
  const { fontFamily, fontSize, lineHeight } = useTypographyStyles('body');
  const theme = useTheme();

  return useMemo(() => {
    return {
      fontSize,
      fontFamily,
      minHeight: lineHeight,
      padding: 0,
      margin: 0,
      color: theme.color[variantColorMap[textColor]],
    };
  }, [theme.color, textColor, fontFamily, fontSize, lineHeight]);
};
