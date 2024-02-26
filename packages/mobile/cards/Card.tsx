import React, { memo, useMemo } from 'react';
import { DimensionValue, ViewStyle } from 'react-native';
import { usePinBorderRadiusStyles } from '@cbhq/cds-common/hooks/usePinBorderRadiusStyles';
import { cardSizes } from '@cbhq/cds-common/tokens/card';
import type { CardBaseProps } from '@cbhq/cds-common/types';

import { usePinStyles } from '../hooks/usePinStyles';
import { VStack } from '../layout/VStack';
import { Pressable, PressableProps } from '../system/Pressable';
import { DangerouslySetStyle } from '../types';

export type CardProps = {
  /**
   * If onPress is present the Card will be wrapped with a Pressable component.
   * pressableProps allows customization of that Pressable wrapper.
   */
  pressableProps?: Omit<PressableProps, 'onPress'>;
} & CardBaseProps &
  DangerouslySetStyle<ViewStyle> &
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
  ...props
}: CardProps) {
  const width = widthProps ?? cardSizes[size].width;
  const height = heightProps ?? cardSizes[size].height;
  const bg = background === true ? 'background' : background;
  const pinStyles = usePinStyles(pin);
  const borderRadiusOverrides = usePinBorderRadiusStyles(pin, 'rounded');
  const contentStyles = useMemo(
    () => [borderRadiusOverrides, style],
    [borderRadiusOverrides, style],
  );

  const borderRadius = 'rounded';

  const content = (
    <VStack
      background={onPress ? undefined : bg}
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
      background={bg}
      borderRadius={borderRadius}
      borderWidth="card"
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
