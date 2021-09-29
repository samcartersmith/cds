import { useMemo } from 'react';
import { InputVariant } from '@cbhq/cds-common';
import { focusedStyle, unfocusedStyle } from '@cbhq/cds-common/tokens/input';
import { useTypographyStyles } from '../typography';
import { usePalette } from './usePalette';

/**
 * The default input style is different from
 * what our text body offers, so we need to add custom
 * input text style to match our text body style.
 */
export const useInputTextStyles = (textColor: InputVariant) => {
  const { fontFamily, fontSize, lineHeight } = useTypographyStyles('body');
  const palette = usePalette();

  return useMemo(() => {
    return {
      fontSize,
      fontFamily,
      height: lineHeight,
      padding: 0,
      margin: 0,
      color: palette[textColor],
    };
  }, [palette, textColor, fontFamily, fontSize, lineHeight]);
};

/**
 *
 * @param focused
 * @param position
 * @returns
 */
export const useInputBorderStyle = (focused: boolean) => {
  return useMemo(() => {
    if (focused) {
      return {
        ...focusedStyle,
        marginTop: -1,
        marginLeft: -1,
        marginRight: -1,
        marginBottom: -1,
      };
    }

    return unfocusedStyle;
  }, [focused]);
};
