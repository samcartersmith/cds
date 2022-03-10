import React, { memo, useMemo } from 'react';
import { ViewStyle } from 'react-native';
import type { CardBaseProps } from '@cbhq/cds-common/types/alpha';
import { Pressable, PressableProps, OnPress } from '../system/Pressable';
import { VStack } from '../layout/VStack';
import { DangerouslySetStyle } from '../types';

export type CardProps = {
  pressableProps?: PressableProps;
} & CardBaseProps<OnPress> &
  DangerouslySetStyle<ViewStyle>;

export const Card: React.FC<CardProps> = memo(function Card({
  children,
  onPress,
  dangerouslySetStyle,
  width,
  height,
  testID,
  pressableProps,
  ...props
}) {
  const pressableStyles = useMemo(
    () => ({ width, height, dangerouslySetStyle }),
    [height, width, dangerouslySetStyle],
  );

  const content = (
    <VStack
      width={width}
      height={height}
      dangerouslySetStyle={onPress ? undefined : dangerouslySetStyle}
      testID={onPress ? undefined : testID}
      {...props}
    >
      {children}
    </VStack>
  );

  return onPress ? (
    <Pressable
      testID={testID}
      backgroundColor="transparent"
      onPress={onPress}
      style={pressableStyles}
      noScaleOnPress
      {...pressableProps}
    >
      {content}
    </Pressable>
  ) : (
    content
  );
});

Card.displayName = 'Card';
