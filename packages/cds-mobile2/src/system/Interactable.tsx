import React, { memo, useMemo } from 'react';
import { type StyleProp, type ViewStyle, Animated, Falsy, View } from 'react-native';
import { ElevationLevels, SharedProps } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';

import { useTheme } from '../hooks/useTheme';
import { getElevationStyles } from '../layout/Box';
import { getBorderStyles } from '../styles/getBorderStyles';
import { getInteractableStyles } from '../styles/getInteractableStyles';

export type InteractableProps = {
  children?: React.ReactNode;
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
} & SharedProps;

export const Interactable = memo(function Interactable({
  background,
  borderColor,
  borderRadius,
  borderWidth,
  block,
  children,
  disabled,
  elevation,
  pressed,
  style,
  contentStyle,
  wrapperStyles,
  blendStyles,
  transparentWhileInactive,
  transparentWhilePressed,
  testID,
}: InteractableProps) {
  const theme = useTheme();
  const isTransparent = transparentWhileInactive && !pressed;
  const isPressedAndTransparent = transparentWhilePressed && pressed;

  // TO DO: Should this component just render a Box instead of a View? Then we'd get the elevationStyles for free
  const elevationStyles = getElevationStyles(elevation ?? 0, theme, background);

  const borderStyles = getBorderStyles({
    borderColor,
    borderRadius,
    borderWidth,
    elevation,
    theme,
  });

  const { wrapperStyles: defaultWrapperStyles, contentStyles } = useMemo(() => {
    const backgroundRgb = theme.color[background];
    return getInteractableStyles({
      theme,
      background: isTransparent ? 'transparent' : blendStyles?.background ?? backgroundRgb,
      pressedBackground:
        isTransparent || isPressedAndTransparent
          ? 'transparent'
          : blendStyles?.pressedBackground ?? backgroundRgb,
      disabledBackground: isTransparent
        ? 'transparent'
        : blendStyles?.disabledBackground ?? backgroundRgb,
    });
  }, [theme, background, isTransparent, isPressedAndTransparent, blendStyles]);

  const mergedWrapperStyles = useMemo(
    () => [
      block && { flexGrow: 1 },
      ...(style ?? []),
      defaultWrapperStyles.base,
      wrapperStyles?.base,
      borderStyles,
      isTransparent && { borderColor: 'transparent' },
      elevationStyles,
      pressed && defaultWrapperStyles.pressed,
      pressed && wrapperStyles?.pressed,
      disabled && defaultWrapperStyles.disabled,
      disabled && wrapperStyles?.disabled,
    ],
    [
      block,
      defaultWrapperStyles,
      wrapperStyles,
      borderStyles,
      isTransparent,
      elevationStyles,
      style,
      pressed,
      disabled,
    ],
  );

  const mergedContentStyles = useMemo(
    () => [contentStyle, pressed && contentStyles.pressed, disabled && contentStyles.disabled],
    [contentStyle, contentStyles.disabled, contentStyles.pressed, disabled, pressed],
  );

  return (
    <Animated.View style={mergedWrapperStyles} testID={testID}>
      <View style={mergedContentStyles}>{children}</View>
    </Animated.View>
  );
});
