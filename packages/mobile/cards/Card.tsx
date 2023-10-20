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
      background={onPress ? undefined : bg}
      borderRadius={borderRadius}
      dangerouslySetStyle={contentStyles}
      elevation={onPress ? undefined : elevation}
      height={onPress ? undefined : height}
      pin={onPress ? undefined : pin}
      testID={onPress ? undefined : testID}
      width={onPress ? undefined : width}
      {...props}
    >
      {children}
    </VStack>
  );

  return onPress ? (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      backgroundColor={bg}
      borderRadius={borderRadius}
      borderWidth="card"
      elevation={elevation}
      onPress={onPress}
      style={{ ...pinStyles, width: width as DimensionValue, height: height as DimensionValue }}
      testID={testID}
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
