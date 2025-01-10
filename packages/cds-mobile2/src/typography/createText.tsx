import React, { forwardRef, memo, useMemo } from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import { SharedProps, TextBaseProps } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { accessibleOpacityDisabled } from '@cbhq/cds-common2/tokens/interactable';
import { ForwardedRef } from '@cbhq/cds-common2/types/ForwardedRef';
import { isChildrenFalsy } from '@cbhq/cds-common2/utils/isChildrenFalsy';

import { useTextAlign } from '../hooks/useTextAlign';
import { useTheme } from '../hooks/useTheme';
import { getAdjustsFontSizeToFitProp } from '../utils/getAdjustsFontSizeToFitProp';

import { useTypographyStyles } from './useTypographyStyles';

const pascalCase = (string: string) =>
  string.replace(/\w+/g, (word) => word[0].toUpperCase() + word.charAt(0).toLowerCase());

const styles = StyleSheet.create({
  tabularNumbers: {
    fontVariant: ['tabular-nums'],
  },
  underline: {
    textDecorationLine: 'underline',
  },
  disabled: {
    opacity: accessibleOpacityDisabled,
  },
});

export const numberStyles = styles.tabularNumbers;

export type TextProps = {
  /**
   * Text color.
   * @default foreground
   */
  color?: ThemeVars.Color;
  /**
   * Choose ellipsize mode.
   * @link [React Native docs](https://reactnative.dev/docs/text#ellipsizemode)
   */
  ellipsize?: RNTextProps['ellipsizeMode'];
  animated?: boolean;
  style?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
} & TextBaseProps &
  SharedProps & { ref?: React.Ref<Text> } & Omit<RNTextProps, 'selectable' | 'style'>;

/**
 * For all Text and TextInputs we set allowFontScaling={true} and maxFontSizeMultiplier={1}.
 * CDS handles everything above 1 and anything below 1 will use React Native's font scaling.
 * This is temporary until we run a scale project to sort out how we want CDS scale to work with dense device scales.
 */
const fontScaleProps = {
  allowFontScaling: true,
  maxFontSizeMultiplier: 1,
} as const;

export const createText = (name: ThemeVars.FontFamily, overrides?: TextProps) => {
  const TextComponent = memo(
    forwardRef(function TextComponent(
      {
        children = overrides?.children,
        color = overrides?.color ?? 'textForeground',
        align = overrides?.align ?? 'start',
        tabularNumbers = overrides?.tabularNumbers ?? false,
        ellipsize = overrides?.ellipsize,
        animated = overrides?.animated,
        style: customStyles = overrides?.style,
        adjustsFontSizeToFit = overrides?.adjustsFontSizeToFit,
        // TODO: replace with glyph. This is not implemented yet
        slashedZero,
        selectable = overrides?.selectable ?? 'none',
        underline = overrides?.underline,
        mono = overrides?.mono,
        noWrap = overrides?.noWrap,
        transform = overrides?.transform,
        disabled = overrides?.disabled,
        inherit = overrides?.inherit,
        accessibilityRole = overrides?.accessibilityRole,
        // Spacing
        padding = overrides?.padding,
        paddingTop = overrides?.paddingTop,
        paddingBottom = overrides?.paddingBottom,
        paddingLeft = overrides?.paddingLeft,
        paddingRight = overrides?.paddingRight,
        paddingY = overrides?.paddingY,
        paddingX = overrides?.paddingX,
        dangerouslySetColor = overrides?.dangerouslySetColor,
        // RN Text props
        ...props
      }: React.PropsWithChildren<TextProps>,
      ref: ForwardedRef<Text>,
    ) {
      const theme = useTheme();

      const textAlign = useTextAlign(align);

      const textStyles = useTypographyStyles(name, mono);

      const textTransform = name === 'caption' ? 'uppercase' : undefined;

      // TODO: Maybe update to align web and mobile APIs
      const numberOfLines = noWrap ? 1 : props.numberOfLines;
      const ellipsizeProps = ellipsize && {
        numberOfLines: numberOfLines ?? 1,
        ellipsizeMode: ellipsize,
      };

      const style = useMemo(
        () => [
          {
            paddingTop: theme.space[paddingTop ?? paddingY ?? padding ?? 0],
            paddingRight: theme.space[paddingRight ?? paddingX ?? padding ?? 0],
            paddingBottom: theme.space[paddingBottom ?? paddingY ?? padding ?? 0],
            paddingLeft: theme.space[paddingLeft ?? paddingX ?? padding ?? 0],
          },
          textAlign,
          !inherit && textStyles,
          {
            textTransform,
            color: dangerouslySetColor ?? theme.color[color],
            lineHeight: textStyles?.lineHeight,
            overflow: ellipsize ? ('hidden' as const) : ('visible' as const),
          },
          tabularNumbers && styles.tabularNumbers,
          underline && styles.underline,
          disabled && styles.disabled,
          customStyles as TextStyle,
        ],
        [
          padding,
          paddingX,
          paddingY,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          textAlign,
          inherit,
          textStyles,
          textTransform,
          dangerouslySetColor,
          theme.space,
          theme.color,
          color,
          ellipsize,
          tabularNumbers,
          underline,
          disabled,
          customStyles,
        ],
      );

      if (isChildrenFalsy(children)) {
        return null;
      }

      const TextComp = animated ? Animated.Text : Text;

      return (
        <TextComp
          accessibilityRole={accessibilityRole}
          numberOfLines={numberOfLines}
          {...ellipsizeProps}
          {...fontScaleProps}
          {...props}
          selectable={selectable !== 'none'}
          style={style as TextStyle}
          {...getAdjustsFontSizeToFitProp({ enabled: adjustsFontSizeToFit })}
          ref={ref}
        >
          {children}
        </TextComp>
      );
    }),
  );

  TextComponent.displayName = `Text${pascalCase(name)}`;
  return TextComponent;
};
