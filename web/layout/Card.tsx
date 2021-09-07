import React, { memo } from 'react';

import { cardSizes } from '@cbhq/cds-common/tokens/card';
import type { CardBaseProps } from '@cbhq/cds-common/types';

import { usePinStyles } from '../hooks/usePinStyles';
import { LinkableProps, Pressable } from '../system/Pressable';
import { VStack } from './VStack';

export type CardProps = CardBaseProps & LinkableProps;

export const Card: React.FC<CardProps> = memo(
  ({
    children,
    background = 'background',
    elevation = 1,
    size = 'large',
    onPress,
    to,
    pin,
    width: widthProps,
    height: heightProps,
    ...props
  }) => {
    const width = widthProps ?? cardSizes[size].width;
    const height = heightProps ?? cardSizes[size].height;
    const bg = background === true ? 'background' : background;
    const pinStyles = usePinStyles(pin);
    const linkable = Boolean(onPress ?? to);

    const content = (
      <VStack
        borderRadius="standard"
        background={linkable ? undefined : bg}
        pin={linkable ? undefined : pin}
        elevation={linkable ? undefined : elevation}
        width={linkable ? undefined : width}
        height={linkable ? undefined : height}
        overflow="hidden"
        {...props}
      >
        <>{children}</>
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
        width={width}
        height={height}
      >
        {content}
      </Pressable>
    ) : (
      content
    );
  },
);

Card.displayName = 'Card';
