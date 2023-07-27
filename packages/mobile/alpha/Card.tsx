import React, { forwardRef, memo, useMemo } from 'react';
import { DimensionValue, View, ViewStyle } from 'react-native';
import type { CardBaseProps } from '@cbhq/cds-common/types/alpha';

import { VStack } from '../layout/VStack';
import { OnPress, Pressable, PressableProps } from '../system/Pressable';
import { DangerouslySetStyle } from '../types';

export type CardProps = {
  /**
   * If onPress is present the Card will be wrapped with a Pressable component.
   * pressableProps allows customization of that Pressable wrapper.
   */
  pressableProps?: PressableProps;
  children?: React.ReactNode;
} & CardBaseProps<OnPress> &
  DangerouslySetStyle<ViewStyle>;

export const Card = memo(
  forwardRef<View, CardProps>(function Card(
    {
      children,
      onPress,
      dangerouslySetStyle,
      width,
      height,
      testID,
      pressableProps,
      accessibilityLabel,
      accessibilityHint,
      ...props
    },
    ref,
  ) {
    const pressableStyles = useMemo(
      () => ({
        width: width as DimensionValue,
        height: height as DimensionValue,
        dangerouslySetStyle,
      }),
      [height, width, dangerouslySetStyle],
    );

    const content = (
      <VStack
        ref={onPress ? undefined : ref}
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
        ref={ref}
        testID={testID}
        backgroundColor="transparent"
        onPress={onPress}
        style={pressableStyles}
        noScaleOnPress
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        {...pressableProps}
      >
        {content}
      </Pressable>
    ) : (
      content
    );
  }),
);

Card.displayName = 'Card';
