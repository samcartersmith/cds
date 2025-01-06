import React, { memo, useMemo } from 'react';
import { Animated, DimensionValue, StyleProp, ViewStyle } from 'react-native';
import { usePinBorderRadiusStyles } from '@cbhq/cds-common2/hooks/usePinBorderRadiusStyles';
import { cardSizes } from '@cbhq/cds-common2/tokens/card';
import type { CardBaseProps } from '@cbhq/cds-common2/types';

import { usePinStyles } from '../hooks/usePinStyles';
import { VStack } from '../layout/VStack';
import { Pressable, PressableProps } from '../system/Pressable';

export type CardProps = {
  /**
   * If onPress is present the Card will be wrapped with a Pressable component.
   * pressableProps allows customization of that Pressable wrapper.
   */
  pressableProps?: Omit<PressableProps, 'onPress'>;
  animated?: boolean;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
} & CardBaseProps &
  Pick<PressableProps, 'onPress'>;

export const Card = memo(function OldCard({
  children,
  background = 'background',
  elevation = 1,
  size = 'large',
  onPress,
  pin,
  style,
  width: widthProps,
  height: heightProps,
  testID,
  accessibilityLabel,
  accessibilityHint,
  pressableProps,
  borderRadius = 200,
  ...props
}: CardProps) {
  const width = widthProps ?? cardSizes[size].width;
  const height = heightProps ?? cardSizes[size].height;
  const pinStyles = usePinStyles(pin);
  const borderRadiusOverrides = usePinBorderRadiusStyles(pin, 200);
  const contentStyles = useMemo(
    () => [borderRadiusOverrides, style],
    [borderRadiusOverrides, style],
  );

  const content = (
    <VStack
      background={onPress ? undefined : background}
      borderRadius={borderRadius}
      elevation={onPress ? undefined : elevation}
      height={onPress ? undefined : height}
      pin={onPress ? undefined : pin}
      style={contentStyles}
      testID={onPress ? undefined : testID}
      width={onPress ? undefined : width}
      {...props}
    >
      {children}
    </VStack>
  );

  return onPress ? (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      background={background}
      borderRadius={borderRadius}
      elevation={elevation}
      onPress={onPress}
      style={{ ...pinStyles, width: width as DimensionValue, height: height as DimensionValue }}
      testID={testID}
      {...pressableProps}
    >
      {content}
    </Pressable>
  ) : (
    content
  );
});

Card.displayName = 'Card';
