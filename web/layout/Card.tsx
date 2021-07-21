import React, { memo } from 'react';

import { cardSizes } from '@cbhq/cds-common/tokens/card';
import type { CardBaseProps } from '@cbhq/cds-common/types';

import { usePinStyles } from '../hooks/usePinStyles';
import { LinkableProps, Pressable } from '../system/Pressable';
import { VStack } from './VStack';

export interface CardProps extends CardBaseProps, LinkableProps {}

export const Card: React.FC<CardProps> = memo(
  ({
    children,
    background = 'background',
    elevation = 1,
    size = 'large',
    onPress,
    to,
    pin,
    ...props
  }) => {
    const width = props?.width ?? cardSizes[size].width;
    const height = props?.height ?? cardSizes[size].height;
    const bg = background === true ? 'background' : background;
    const pinStyles = usePinStyles(pin);
    const linkable = Boolean(onPress || to);

    const content = (
      <VStack
        borderRadius="standard"
        background={linkable ? undefined : bg}
        pin={linkable ? undefined : pin}
        elevation={linkable ? undefined : elevation}
        width={width}
        height={height}
        {...props}
      >
        <VStack overflow="hidden">{children}</VStack>
      </VStack>
    );

    return linkable ? (
      <Pressable
        backgroundColor={bg}
        borderRadius="standard"
        borderColor="line"
        borderWidth="card"
        elevation={elevation}
        onPress={onPress}
        className={pinStyles}
        to={to}
      >
        {content}
      </Pressable>
    ) : (
      content
    );
  },
);

Card.displayName = 'Card';
