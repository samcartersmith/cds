import React, { memo } from 'react';

import { cardSizes } from '@cbhq/cds-common/tokens/card';
import type { CardBaseProps } from '@cbhq/cds-common/types';

import { usePinStyles } from '../hooks/usePinStyles';
import { Pressable, PressableProps } from '../system/Pressable';
import { VStack, VStackProps } from './VStack';

export interface CardProps extends VStackProps<'div'>, CardBaseProps {
  onPress?: PressableProps['onPress'];
}

export const Card: React.FC<CardProps> = memo(
  ({
    children,
    background = 'background',
    elevation = 1,
    size = 'large',
    onPress,
    pin,
    ...props
  }: CardProps) => {
    const width = props?.width ?? cardSizes[size].width;
    const height = props?.height ?? cardSizes[size].height;
    const bg = background === true ? 'background' : background;
    const pinStyles = usePinStyles(pin);

    const content = (
      <VStack
        borderRadius="standard"
        background={onPress ? undefined : bg}
        pin={onPress ? undefined : pin}
        elevation={onPress ? undefined : elevation}
        width={width}
        height={height}
        overflow={onPress ? undefined : 'hidden'}
        {...props}
      >
        {children}
      </VStack>
    );

    return onPress ? (
      <Pressable
        backgroundColor={bg}
        borderRadius="standard"
        borderColor="line"
        borderWidth="card"
        elevation={elevation}
        onPress={onPress}
        className={pinStyles}
      >
        {content}
      </Pressable>
    ) : (
      content
    );
  }
);

Card.displayName = 'Card';
