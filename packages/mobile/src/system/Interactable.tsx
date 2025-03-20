import React, { memo, useMemo } from 'react';
import { Animated, Falsy, type StyleProp, View, type ViewStyle } from 'react-native';
import { SharedProps } from '@cbhq/cds-common';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
import { emptyArray } from '@cbhq/cds-utils';

import { getInteractableStyles } from '../styles/getInteractableStyles';

import { useElevationConfig } from './useElevationConfig';
import { useThemeConfig } from './useThemeConfig';

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
  style = emptyArray,
  contentStyle,
  wrapperStyles,
  transparentWhileInactive,
  transparentWhilePressed,
  testID,
}: InteractableProps) {
  const themeConfig = useThemeConfig().activeConfig;
  const elevationConfig = useElevationConfig(elevation);
  const ElevationChildrenWrapper = elevationConfig ? elevationConfig.WrapperForChildren : undefined;

  const { wrapperStyles: defaultWrapperStyles, contentStyles } = useMemo(() => {
    return getInteractableStyles({
      themeConfig,
      elevationConfig,
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
    elevationConfig,
    themeConfig,
    transparentWhileInactive,
    pressed,
  ]);

  const mergedWrapperStyles = useMemo(
    () => [
      block && { flexGrow: 1 },
      ...style,
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
      <View style={mergedContentStyles}>
        {ElevationChildrenWrapper ? (
          <ElevationChildrenWrapper>{children}</ElevationChildrenWrapper>
        ) : (
          children
        )}
      </View>
    </Animated.View>
  );
});
