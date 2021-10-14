import React, { memo, useMemo } from 'react';

import { usePinBorderRadiusStyles } from '@cbhq/cds-common/hooks/usePinBorderRadiusStyles';
import { cardSizes } from '@cbhq/cds-common/tokens/card';
import type { CardBaseProps } from '@cbhq/cds-common/types';
import { ViewStyle } from 'react-native';

import { useElevationBorderWidth } from '../hooks/useElevationBorderWidth';
import { usePinStyles } from '../hooks/usePinStyles';
import { Pressable, PressableProps } from '../system/Pressable';
import { DangerouslySetStyle } from '../types';
import { VStack } from '../layout/VStack';

export type CardProps = {
  onPress?: PressableProps['onPress'];
} & CardBaseProps &
  DangerouslySetStyle<ViewStyle>;

export const Card: React.FC<CardProps> = memo(
  ({
    children,
    background = 'background',
    elevation = 1,
    size = 'large',
    onPress,
    pin,
    dangerouslySetStyle,
    width: widthProps,
    height: heightProps,
    ...props
  }) => {
    const width = widthProps ?? cardSizes[size].width;
    const height = heightProps ?? cardSizes[size].height;
    const bg = background === true ? 'background' : background;
    const elevationBorderWidth = useElevationBorderWidth();
    const pinStyles = usePinStyles(pin);
    const borderRadiusOverrides = usePinBorderRadiusStyles(pin, 'standard');
    const contentStyles = useMemo(
      () => [borderRadiusOverrides, dangerouslySetStyle],
      [borderRadiusOverrides, dangerouslySetStyle],
    );

    const content = (
      <VStack
        borderRadius="standard"
        background={onPress ? undefined : bg}
        pin={onPress ? undefined : pin}
        elevation={onPress ? undefined : elevation}
        width={onPress ? undefined : width}
        height={onPress ? undefined : height}
        dangerouslySetStyle={contentStyles}
        {...props}
      >
        <VStack overflow="hidden">{children}</VStack>
      </VStack>
    );

    return onPress ? (
      <Pressable
        backgroundColor={bg}
        borderRadius="standard"
        borderWidth={elevation ? elevationBorderWidth : 'card'}
        elevation={elevation}
        onPress={onPress}
        style={{ ...pinStyles, width, height }}
      >
        {content}
      </Pressable>
    ) : (
      content
    );
  },
);

Card.displayName = 'Card';
