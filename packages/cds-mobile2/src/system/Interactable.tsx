import React, { memo, useMemo } from 'react';
import { Animated, Falsy, type StyleProp, View, type ViewStyle } from 'react-native';
import { ElevationLevels } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';

import { useTheme } from '../hooks/useTheme';
import { Box, type BoxProps } from '../layout/Box';
import { getInteractableStyles } from '../styles/getInteractableStyles';

export type InteractableBaseProps = {
  /** Apply animated styles to the outer container. */
  style?: Animated.WithAnimatedValue<Falsy | ViewStyle>[];
  /** Background color of the overlay (element being interacted with). */
  background: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element being interacted with. */
  borderColor?: ThemeVars.Color;
  /** Border radius of the element being interacted with. Number should only be used if value comes from useButtonBorderRadius. */
  borderRadius?: ThemeVars.BorderRadius;
  /** Width of the border. */
  borderWidth?: ThemeVars.BorderWidth;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /** Is the element elevated. */
  elevation?: ElevationLevels;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   * */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   * */
  transparentWhilePressed?: boolean;
  blendStyles?: {
    background?: string;
    pressedBackground?: string;
    disabledBackground?: string;
  };
  /** Apply animated styles to the inner container. */
  contentStyle?: Falsy | ViewStyle;
  /** Apply styles to the outer container. */
  wrapperStyles?: {
    base?: StyleProp<ViewStyle>;
    pressed?: StyleProp<ViewStyle>;
    disabled?: StyleProp<ViewStyle>;
  };
};

export type InteractableProps = Omit<BoxProps, 'background' | 'animated'> & InteractableBaseProps;

export const Interactable = memo(function Interactable({
  background,
  block,
  children,
  disabled,
  pressed,
  style,
  contentStyle,
  wrapperStyles,
  blendStyles,
  transparentWhileInactive,
  transparentWhilePressed,
  ...props
}: InteractableProps) {
  const theme = useTheme();
  const isTransparent = transparentWhileInactive && !pressed;
  const isPressedAndTransparent = transparentWhilePressed && pressed;

  const { wrapperStyles: defaultWrapperStyles, contentStyles } = useMemo(() => {
    const backgroundColor = blendStyles?.background ?? theme.color[background];
    return getInteractableStyles({
      theme,
      background: isTransparent ? 'transparent' : backgroundColor,
      pressedBackground:
        isTransparent || isPressedAndTransparent
          ? 'transparent'
          : blendStyles?.pressedBackground ?? backgroundColor,
      disabledBackground: isTransparent
        ? 'transparent'
        : blendStyles?.disabledBackground ?? backgroundColor,
    });
  }, [theme, background, isTransparent, isPressedAndTransparent, blendStyles]);

  const mergedWrapperStyles = useMemo(
    () => [
      block && { flexGrow: 1 },
      defaultWrapperStyles.base,
      wrapperStyles?.base,
      isTransparent && { borderColor: 'transparent' },
      pressed && defaultWrapperStyles.pressed,
      pressed && wrapperStyles?.pressed,
      disabled && defaultWrapperStyles.disabled,
      disabled && wrapperStyles?.disabled,
      ...(style ?? []),
    ],
    [block, defaultWrapperStyles, wrapperStyles, isTransparent, style, pressed, disabled],
  );

  const mergedContentStyles = useMemo(
    () => [contentStyle, pressed && contentStyles.pressed, disabled && contentStyles.disabled],
    [contentStyle, contentStyles.disabled, contentStyles.pressed, disabled, pressed],
  );

  return (
    <Box animated style={mergedWrapperStyles} {...props}>
      <View style={mergedContentStyles}>{children}</View>
    </Box>
  );
});
