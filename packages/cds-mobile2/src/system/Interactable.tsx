import React, { memo, useMemo } from 'react';
import { type StyleProp, type ViewStyle, Animated, Falsy, View } from 'react-native';
import { SharedProps } from '@cbhq/cds-common2';
import { InteractableBaseProps } from '@cbhq/cds-common2/types/InteractableBaseProps';

import { useTheme } from '../hooks/useTheme';
import { getInteractableStyles } from '../styles/getInteractableStyles';

export type InteractableProps = {
  children?: React.ReactNode;
  /** Apply animated styles to the outer container. */
  style?: Animated.WithAnimatedValue<Falsy | ViewStyle>[];
  /** Apply animated styles to the inner container. */
  contentStyle?: Falsy | ViewStyle;
  /** @deprecated Do not use. Added in CDS v7 as an escape hatch for Wallet. Will be removed in CDS v8. */
  wrapperStyles?: {
    base?: StyleProp<ViewStyle>;
    pressed?: StyleProp<ViewStyle>;
    disabled?: StyleProp<ViewStyle>;
  };
} & InteractableBaseProps &
  SharedProps;

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
  transparentWhileInactive,
  transparentWhilePressed,
  testID,
}: InteractableProps) {
  const theme = useTheme();

  const { wrapperStyles: defaultWrapperStyles, contentStyles } = useMemo(() => {
    return getInteractableStyles({
      theme,
      elevation,
      background: transparentWhileInactive && !pressed ? 'transparent' : background,
      borderColor: transparentWhileInactive && !pressed ? 'transparent' : borderColor,
      borderRadius,
      borderWidth,
    });
  }, [
    background,
    borderColor,
    borderRadius,
    borderWidth,
    theme,
    elevation,
    transparentWhileInactive,
    pressed,
  ]);

  const mergedWrapperStyles = useMemo(
    () => [
      block && { flexGrow: 1 },
      ...(style ?? []),
      defaultWrapperStyles.static,
      wrapperStyles?.base,
      !transparentWhilePressed && pressed && defaultWrapperStyles.pressed,
      pressed && wrapperStyles?.pressed,
      disabled && defaultWrapperStyles.disabled,
      disabled && wrapperStyles?.disabled,
    ],
    [block, defaultWrapperStyles, style, pressed, disabled, transparentWhilePressed, wrapperStyles],
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
