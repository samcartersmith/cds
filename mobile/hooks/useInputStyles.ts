import { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { PaletteForeground } from '@cbhq/cds-common';
import { focusedStyle, unfocusedStyle } from '@cbhq/cds-common/tokens/input';
import { DropdownPositions } from '@cbhq/cds-common/types/DropdownBaseProps';
import { useTypographyStyles } from '../typography';
import { usePalette } from './usePalette';

/**
 * The default input style is different from
 * what our text body offers, so we need to add custom
 * input text style to match our text body style.
 */
export const useInputTextStyles = (textColor: PaletteForeground) => {
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

export const useInputVariant = (focused: boolean, variant: PaletteForeground) => {
  return focused && variant === 'foregroundMuted' ? 'primary' : variant;
};

/**
 *
 * @param focused
 * @param position
 * @returns
 */
export const useInputBorderStyle = (focused: boolean, position?: DropdownPositions) => {
  // If not marginOffset was passed in,
  // these are the defaults
  return useMemo(() => {
    let inputBorderRadius: ViewStyle = {};

    if (position === 'prepend') {
      inputBorderRadius = {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      };
    }

    if (position === 'append') {
      inputBorderRadius = {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      };
    }

    if (focused) {
      return {
        ...focusedStyle,
        ...inputBorderRadius,
        marginTop: -1,
        marginLeft: -1,
        marginRight: -1,
        marginBottom: 0,
      };
    }

    return unfocusedStyle;
  }, [focused, position]);
};
