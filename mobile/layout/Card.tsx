import React, { memo, useMemo } from 'react';

import { usePinBorderRadiusStyles } from '@cbhq/cds-common/hooks/usePinBorderRadiusStyles';

import { useElevationBorderWidth } from '../hooks/useElevationBorderWidth';
import { usePinStyles } from '../hooks/usePinStyles';
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
    pin,
    dangerouslySetStyle,
    ...props
  }: CardProps) => {
    const width = props?.width ?? cardSizes[size].width;
    const height = props?.height ?? cardSizes[size].height;
    const bg = background === true ? 'background' : background;
    const elevationBorderWidth = useElevationBorderWidth();
    const pinStyles = usePinStyles(pin);
    const borderRadiusOverrides = usePinBorderRadiusStyles(pin, 'standard');
    const contentStyles = useMemo(
      () => [borderRadiusOverrides, dangerouslySetStyle],
      [borderRadiusOverrides, dangerouslySetStyle]
    );

    const content = (
      <VStack
        borderRadius="standard"
        background={onPress ? undefined : bg}
        pin={onPress ? undefined : pin}
        elevation={onPress ? undefined : elevation}
        width={width}
        height={height}
        dangerouslySetStyle={contentStyles}
        {...props}
      >
        {children}
      </VStack>
    );

    return onPress ? (
      <Pressable
        backgroundColor={bg}
        borderRadius="standard"
        borderWidth={elevation ? elevationBorderWidth : 'card'}
        elevation={elevation}
        onPress={onPress}
        style={pinStyles}
      >
        {content}
      </Pressable>
    ) : (
      content
    );
  }
);

Card.displayName = 'Card';

export const cardSizes = {
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
