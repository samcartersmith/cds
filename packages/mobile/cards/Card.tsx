import React, { memo, useMemo } from 'react';
import { DimensionValue, ViewStyle } from 'react-native';
import { usePinBorderRadiusStyles } from '@cbhq/cds-common/hooks/usePinBorderRadiusStyles';
import { cardSizes } from '@cbhq/cds-common/tokens/card';
import type { CardBaseProps } from '@cbhq/cds-common/types';

import { Card as FrontierCard } from '../alpha/Card';
import { usePinStyles } from '../hooks/usePinStyles';
import { VStack } from '../layout/VStack';
import { Pressable, PressableProps } from '../system/Pressable';
import { useFeatureFlag } from '../system/useFeatureFlag';
import { DangerouslySetStyle } from '../types';

export type CardProps = {
  onPress?: PressableProps['onPress'];
} & CardBaseProps &
  DangerouslySetStyle<ViewStyle>;

const OldCard: React.FC<React.PropsWithChildren<CardProps>> = memo(function OldCard({
  children,
  background = 'background',
  elevation = 1,
  size = 'large',
  onPress,
  pin,
  dangerouslySetStyle,
  width: widthProps,
  height: heightProps,
  testID,
  accessibilityLabel,
  accessibilityHint,
  ...props
}) {
  const width = widthProps ?? cardSizes[size].width;
  const height = heightProps ?? cardSizes[size].height;
  const bg = background === true ? 'background' : background;
  const pinStyles = usePinStyles(pin);
  const borderRadiusOverrides = usePinBorderRadiusStyles(pin, 'rounded');
  const contentStyles = useMemo(
    () => [borderRadiusOverrides, dangerouslySetStyle],
    [borderRadiusOverrides, dangerouslySetStyle],
  );

  const borderRadius = 'rounded';

  const content = (
    <VStack
      testID={onPress ? undefined : testID}
      borderRadius={borderRadius}
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
    <Pressable
      accessibilityRole="button"
      testID={testID}
      backgroundColor={bg}
      borderRadius={borderRadius}
      borderWidth="card"
      elevation={elevation}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={{ ...pinStyles, width: width as DimensionValue, height: height as DimensionValue }}
    >
      {content}
    </Pressable>
  ) : (
    content
  );
});

export const Card: React.FC<React.PropsWithChildren<CardProps>> = memo(function Card(props) {
  const isFrontier = useFeatureFlag('frontierCard');
  return isFrontier ? <FrontierCard {...props} /> : <OldCard {...props} />;
});

OldCard.displayName = 'OldCard';
Card.displayName = 'Card';
