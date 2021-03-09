import * as React from 'react';

import { TextBaseProps, Typography, PaletteForeground, useScale } from '@cbhq/cds-common';
import { pascalCase } from '@cbhq/cds-utils';
import {
  Animated,
  I18nManager,
  Text,
  TextStyle,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

import { usePalette } from '../hooks/usePalette';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as scales from '../styles/scale';
import { OmitStyle, DangerouslySetStyle } from '../types';

export type { Typography };

const styles = StyleSheet.create({
  tabularNumbers: {
    fontVariant: ['tabular-nums'],
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export interface TextProps
  extends TextBaseProps,
    OmitStyle<RNTextProps, 'selectable'>,
    DangerouslySetStyle<TextStyle> {
  /**
   * Text color. Accepts a valid PaletteForeground alias.
   * @default foreground
   */
  color?: PaletteForeground;
  /**
   * Choose ellipsize mode.
   * @link [React Native docs](https://reactnative.dev/docs/text#ellipsizemode)
   */
  ellipsize?: RNTextProps['ellipsizeMode'];
  /**
   * Override line-height. This is deprecated since overriding this prevents line height from being scale aware.
   * @deprecated
   */
  deprecatedLineHeight?: number | 'none';
}

export const createText = (name: Typography) => {
  const TextComponent: React.FC<TextProps> = ({
    color = 'foreground',
    align = 'start',
    tabularNumbers = false,
    ellipsize,
    animated,
    dangerouslySetStyle,
    deprecatedLineHeight,
    // TODO: replace with glyph
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    slashedZero,
    // RN doesn't differentiate select behavior between text and all. Default to text to match web default. It behaves as true.
    selectable = 'text',
    underline,
    noWrap,
    transform,
    // Spacing
    spacing,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    spacingVertical,
    spacingHorizontal,
    // RN Text props
    ...props
  }) => {
    const scale = useScale();
    const palette = usePalette();

    const textAlign = React.useMemo(() => {
      if (align === 'start') {
        return I18nManager.isRTL ? 'right' : 'left';
      }
      if (align === 'end') {
        return I18nManager.isRTL ? 'left' : 'right';
      }
      return align;
    }, [align]);

    const textStyles = scales[scale].typography[name];

    // TODO: Update React Native to not override this and remove deprecatedLineHeight
    const lineHeight = React.useMemo(() => {
      if (deprecatedLineHeight === undefined) {
        return textStyles?.lineHeight;
      } else if (deprecatedLineHeight === 'none') {
        return undefined;
      } else {
        return deprecatedLineHeight;
      }
    }, [deprecatedLineHeight, textStyles?.lineHeight]);

    const spacingStyles = useSpacingStyles({
      spacing,
      spacingBottom,
      spacingEnd,
      spacingHorizontal,
      spacingStart,
      spacingTop,
      spacingVertical,
    });

    // TODO: Maybe update to align web and mobile APIs
    const numberOfLines = noWrap ? 1 : props.numberOfLines;
    const ellipsizeProps = ellipsize && {
      numberOfLines: numberOfLines || 1,
      ellipsizeMode: ellipsize,
    };

    const style = React.useMemo(
      () => [
        spacingStyles,
        scales[scale].typography[name],
        textStyles,
        {
          color: palette[color],
          textAlign,
          textTransform: transform,
          lineHeight,
        },
        tabularNumbers && styles.tabularNumbers,
        underline && styles.underline,
        dangerouslySetStyle as TextStyle,
      ],
      [
        spacingStyles,
        scale,
        textStyles,
        lineHeight,
        palette,
        color,
        textAlign,
        transform,
        tabularNumbers,
        underline,
        dangerouslySetStyle,
      ]
    );

    const TextComponent = animated ? Animated.Text : Text;

    return (
      <TextComponent
        numberOfLines={numberOfLines}
        {...ellipsizeProps}
        {...props}
        // TODO (hannah): Add iOS support for selectable. https://awesomeopensource.com/project/Astrocoders/react-native-selectable-text
        selectable={selectable !== 'none'}
        style={style as TextStyle}
      />
    );
  };

  TextComponent.displayName = pascalCase(name);
  return TextComponent;
};
