import React, { memo, useCallback, useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { usePinBorderRadiusStyles } from '@cbhq/cds-common/hooks/usePinBorderRadiusStyles';
import { cardSizes } from '@cbhq/cds-common/tokens/card';
import type { BorderWidth, CardBaseProps, ElevationLevels } from '@cbhq/cds-common/types';

import { useElevationBorderWidth } from '../hooks/useElevationBorderWidth';
import { usePinStyles } from '../hooks/usePinStyles';
import { VStack } from '../layout/VStack';
import { Pressable, PressableProps } from '../system/Pressable';
import { useFeatureFlag } from '../system/useFeatureFlag';
import { DangerouslySetStyle } from '../types';

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
    const isFrontier = useFeatureFlag('frontierCard');
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

    const borderRadius = isFrontier ? undefined : 'standard';

    const getBorderWidth = useCallback(
      (borderWidth?: BorderWidth) => {
        if (isFrontier) {
          return undefined;
        }
        return borderWidth;
      },
      [isFrontier],
    );

    const getElevation = useCallback(
      (level?: ElevationLevels) => {
        if (isFrontier) {
          return undefined;
        }
        return level;
      },
      [isFrontier],
    );

    const content = (
      <VStack
        borderRadius={borderRadius}
        background={onPress ? undefined : bg}
        pin={onPress ? undefined : pin}
        elevation={getElevation(onPress ? undefined : elevation)}
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
        borderRadius={borderRadius}
        borderWidth={getBorderWidth(elevation ? elevationBorderWidth : 'card')}
        elevation={getElevation(elevation)}
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
