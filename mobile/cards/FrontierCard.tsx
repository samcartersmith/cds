import React, { memo, useMemo } from 'react';

import { usePinBorderRadiusStyles } from '@cbhq/cds-common/hooks/usePinBorderRadiusStyles';
import { cardSizes } from '@cbhq/cds-common/tokens/card';
import type { CardBaseProps } from '@cbhq/cds-common/types';
import { ViewStyle } from 'react-native';
import { usePinStyles } from '../hooks/usePinStyles';
import { Pressable, PressableProps } from '../system/Pressable';
import { DangerouslySetStyle } from '../types';
import { VStack } from '../layout/VStack';

export type CardProps = {
  onPress?: PressableProps['onPress'];
} & CardBaseProps &
  DangerouslySetStyle<ViewStyle>;

export const FrontierCard: React.FC<CardProps> = memo(function FrontierCard({
  children,
  background = 'background',
  elevation = 0,
  size = 'large',
  onPress,
  pin,
  dangerouslySetStyle,
  width: widthProps,
  height: heightProps,
  ...props
}) {
  const width = widthProps ?? cardSizes[size].width;
  const height = heightProps ?? cardSizes[size].height;
  const bg = background === true ? 'background' : background;
  const pinStyles = usePinStyles(pin);
  const borderRadiusOverrides = usePinBorderRadiusStyles(pin);
  const contentStyles = useMemo(
    () => [borderRadiusOverrides, dangerouslySetStyle],
    [borderRadiusOverrides, dangerouslySetStyle],
  );

  const pressableStyles = useMemo(
    () => ({ ...pinStyles, width, height }),
    [height, pinStyles, width],
  );

  const content = (
    <VStack
      background={onPress ? undefined : bg}
      pin={onPress ? undefined : pin}
      elevation={onPress ? undefined : elevation}
      width={onPress ? undefined : width}
      height={onPress ? undefined : height}
      dangerouslySetStyle={contentStyles}
      {...props}
    >
      {children}
    </VStack>
  );

  return onPress ? (
    <Pressable backgroundColor={bg} onPress={onPress} style={pressableStyles} noScaleOnPress>
      {content}
    </Pressable>
  ) : (
    content
  );
});

FrontierCard.displayName = 'FrontierCard';
