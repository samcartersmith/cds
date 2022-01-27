import React, { memo, useMemo } from 'react';

import { usePinBorderRadiusStyles } from '@cbhq/cds-common/hooks/usePinBorderRadiusStyles';
import { cardSizes } from '@cbhq/cds-common/tokens/card';
import { usePinStyles } from '../hooks/usePinStyles';
import { Pressable } from '../system/Pressable';
import { VStack } from '../layout/VStack';
import { useFeatureFlag } from '../system/useFeatureFlag';
import { CardProps, FrontierCard } from './FrontierCard';

export type { CardProps };

const OldCard: React.FC<CardProps> = memo(function OldCard({
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
}) {
  const width = widthProps ?? cardSizes[size].width;
  const height = heightProps ?? cardSizes[size].height;
  const bg = background === true ? 'background' : background;
  const pinStyles = usePinStyles(pin);
  const borderRadiusOverrides = usePinBorderRadiusStyles(pin, 'standard');
  const contentStyles = useMemo(
    () => [borderRadiusOverrides, dangerouslySetStyle],
    [borderRadiusOverrides, dangerouslySetStyle],
  );

  const borderRadius = 'standard';

  const content = (
    <VStack
      borderRadius={borderRadius}
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
      borderRadius={borderRadius}
      borderWidth="card"
      elevation={elevation}
      onPress={onPress}
      style={{ ...pinStyles, width, height }}
    >
      {content}
    </Pressable>
  ) : (
    content
  );
});

export const Card: React.FC<CardProps> = memo(function Card(props) {
  const isFrontier = useFeatureFlag('frontierCard');
  return isFrontier ? <FrontierCard {...props} /> : <OldCard {...props} />;
});

OldCard.displayName = 'OldCard';
Card.displayName = 'Card';
