import React, { memo } from 'react';

import { Pressable, PressableProps } from '../system/Pressable';
import { VStack, VStackProps } from './VStack';

export interface CardProps extends VStackProps {
  size?: 'small' | 'medium' | 'large';
  onPress?: PressableProps['onPress'];
}

export const Card: React.FC<CardProps> = memo(
  ({
    children,
    background = 'background',
    elevation = 1,
    size = 'large',
    onPress,
    ...props
  }: CardProps) => {
    const width = props?.width ?? sizes[size].width;
    const height = props?.height ?? sizes[size].height;
    const bg = background === true ? 'background' : background;

    const content = (
      <VStack
        borderRadius="standard"
        background={onPress ? undefined : bg}
        bordered={onPress ? false : true}
        elevation={onPress ? undefined : elevation}
        width={width}
        height={height}
        {...props}
      >
        {children}
      </VStack>
    );

    return onPress ? (
      <Pressable
        backgroundColor={bg}
        borderColor={bg === 'background' ? 'line' : 'transparent'}
        borderRadius="standard"
        borderWidth="card"
        elevation={elevation}
        onPress={onPress}
      >
        {content}
      </Pressable>
    ) : (
      content
    );
  }
);

Card.displayName = 'Card';

const sizes = {
  small: {
    width: 136,
    height: 144,
  },
  medium: {
    width: 312,
    height: 192,
  },
  large: {
    width: undefined,
    height: undefined,
  },
} as const;
