import React, { useMemo } from 'react';
import { Animated, StyleSheet, Text, TextProps as RNTextProps, TextStyle } from 'react-native';
import { PaletteForeground, SharedProps, TextBaseProps, Typography } from '@cbhq/cds-common';
import { opacityDisabled } from '@cbhq/cds-common/src/tokens/interactable';
import { isChildrenFalsy } from '@cbhq/cds-common/src/utils/isChildrenFalsy';
import { pascalCase } from '@cbhq/cds-utils';

import { fontScaleProps } from '../hooks/useDeviceScaleToCdsScale';
import { usePalette } from '../hooks/usePalette';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { useTextAlign } from '../hooks/useTextAlign';
import { DangerouslySetStyle, OmitStyle } from '../types';

import { useTypographyStyles } from './useTypographyStyles';

export type { Typography };

const styles = StyleSheet.create({
  tabularNumbers: {
    fontVariant: ['tabular-nums'],
  },
  underline: {
    textDecorationLine: 'underline',
  },
  disabled: {
    opacity: opacityDisabled,
  },
});

export const numberStyles = styles.tabularNumbers;

export type TextProps = {
  /**
   * Text color. Accepts a valid `PaletteForeground` alias.
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
} & TextBaseProps &
  SharedProps &
  OmitStyle<RNTextProps, 'selectable'> &
  DangerouslySetStyle<TextStyle>;

export const createText = (name: Typography, overrides?: TextProps) => {
  const TextComponent: React.FC<TextProps> = function TextComponent({
    children = overrides?.children,
    color = overrides?.color ?? 'foreground',
    align = overrides?.align ?? 'start',
    tabularNumbers = overrides?.tabularNumbers ?? false,
    ellipsize = overrides?.ellipsize,
    animated = overrides?.animated,
    dangerouslySetStyle = overrides?.dangerouslySetStyle,
    deprecatedLineHeight = overrides?.deprecatedLineHeight,
    // TODO: replace with glyph. This is not implemented yet
    slashedZero,
    selectable = overrides?.selectable ?? 'none',
    underline = overrides?.underline,
    mono = overrides?.mono,
    noWrap = overrides?.noWrap,
    transform = overrides?.transform,
    disabled = overrides?.disabled,
    inherit = overrides?.inherit,
    // Spacing
    spacing = overrides?.spacing,
    spacingTop = overrides?.spacingTop,
    spacingBottom = overrides?.spacingBottom,
    spacingStart = overrides?.spacingStart,
    spacingEnd = overrides?.spacingEnd,
    spacingVertical = overrides?.spacingVertical,
    spacingHorizontal = overrides?.spacingHorizontal,
    dangerouslySetColor = overrides?.dangerouslySetColor,
    // RN Text props
    ...props
  }) {
    const palette = usePalette();

    const textAlign = useTextAlign(align);

    const textStyles = useTypographyStyles(name, mono);

    // TODO: Update React Native to not override this and remove deprecatedLineHeight
    const lineHeight = useMemo(() => {
      if (deprecatedLineHeight === undefined) {
        return textStyles?.lineHeight;
      }
      if (deprecatedLineHeight === 'none') {
        return undefined;
      }
      return deprecatedLineHeight;
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
      numberOfLines: numberOfLines ?? 1,
      ellipsizeMode: ellipsize,
    };

    const textTransform = useMemo(() => {
      return { textTransform: transform };
    }, [transform]);

    const style = useMemo(
      () => [
        spacingStyles,
        textAlign,
        !inherit && textStyles,
        textTransform,
        {
          color: dangerouslySetColor ?? palette[color],
          lineHeight,
          overflow: ellipsize ? ('hidden' as const) : ('visible' as const),
        },
        tabularNumbers && styles.tabularNumbers,
        underline && styles.underline,
        disabled && styles.disabled,
        dangerouslySetStyle as TextStyle,
      ],
      [
        disabled,
        dangerouslySetColor,
        spacingStyles,
        textStyles,
        textTransform,
        palette,
        textAlign,
        lineHeight,
        color,
        tabularNumbers,
        underline,
        dangerouslySetStyle,
        ellipsize,
        inherit,
      ],
    );

    if (isChildrenFalsy(children)) {
      return null;
    }

    const TextComp = animated ? Animated.Text : Text;

    return (
      <TextComp
        numberOfLines={numberOfLines}
        {...ellipsizeProps}
        {...props}
        selectable={selectable !== 'none'}
        style={style as TextStyle}
        {...fontScaleProps}
      >
        {children}
      </TextComp>
    );
  };

  TextComponent.displayName = `Text${pascalCase(name)}`;
  return TextComponent;
};
