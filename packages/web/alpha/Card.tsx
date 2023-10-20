import React, { forwardRef, memo, useMemo } from 'react';
import type { CardBaseProps } from '@cbhq/cds-common/types/alpha';

import { VStack } from '../layout/VStack';
import { OnPress, Pressable, PressableProps } from '../system/Pressable';

export type CardProps = {
  children?: React.ReactNode;
  /**
   * If onPress is present the Card will be wrapped with a Pressable component.
   * pressableProps allows customization of that Pressable wrapper.
   */
  pressableProps?: PressableProps;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   * If onPress is present the Card will be wrapped with a Pressable component.
   * This property is only applied to the inner content if onPress is true.
   * To apply styles to outer Pressable, you can use pressableProps.
   */
  dangerouslySetClassName?: string;
} & CardBaseProps<OnPress>;

export const Card = memo(
  forwardRef<HTMLElement, CardProps>(function Card(
    { children, onPress, dangerouslySetClassName, width, height, testID, pressableProps, ...props },
    ref,
  ) {
    const pressableStyles = useMemo(() => ({ width, height }), [height, width]);

    const content = (
      <VStack
        ref={onPress ? undefined : ref}
        dangerouslySetClassName={dangerouslySetClassName}
        height={height}
        testID={onPress ? undefined : testID}
        width={width}
        {...props}
      >
        {children}
      </VStack>
    );

    return onPress ? (
      <Pressable
        ref={ref}
        noScaleOnPress
        backgroundColor="transparent"
        onPress={onPress}
        style={pressableStyles}
        testID={testID}
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
