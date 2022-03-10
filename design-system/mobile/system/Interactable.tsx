import React, { useMemo, memo } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
import { emptyArray } from '@cbhq/cds-utils';
import { Animated, Falsy, View, ViewStyle } from 'react-native';
import { getInteractableStyles } from '../styles/getInteractableStyles';
import { useElevationConfig } from './useElevationConfig';
import { useThemeConfig } from './useThemeConfig';

export type InteractableProps = {
  children?: React.ReactNode;
  /** Apply animated styles to the outer container. */
  style?: Animated.WithAnimatedValue<Falsy | ViewStyle>[];
  /** Apply animated styles to the inner container. */
  contentStyle?: Falsy | ViewStyle;
} & InteractableBaseProps &
  SharedProps;

export const Interactable = memo(function Interactable({
  backgroundColor,
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
  transparentWhileInactive,
  testID,
}: InteractableProps) {
  const themeConfig = useThemeConfig().activeConfig;
  const elevationConfig = useElevationConfig(elevation);
  const ElevationChildrenWrapper = elevationConfig ? elevationConfig.WrapperForChildren : undefined;

  const { wrapperStyles, contentStyles } = useMemo(() => {
    return getInteractableStyles({
      themeConfig,
      elevationConfig,
      backgroundColor: transparentWhileInactive ? 'transparent' : backgroundColor,
      borderColor: transparentWhileInactive ? 'transparent' : borderColor,
      borderRadius,
      borderWidth,
    });
  }, [
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    elevationConfig,
    themeConfig,
    transparentWhileInactive,
  ]);

  const mergedWrapperStyles = useMemo(
    () => [
      block && { flexGrow: 1 },
      ...style,
      wrapperStyles.static,
      pressed && wrapperStyles.pressed,
      disabled && wrapperStyles.disabled,
    ],
    [block, wrapperStyles, style, pressed, disabled],
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
