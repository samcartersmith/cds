import React, { memo, useMemo } from 'react';
import { PressableProps } from 'react-native';
import { FloatingAssetCardBaseProps } from '@cbhq/cds-common2';
import {
  floatingAssetCardLargeWidth,
  floatingAssetCardSmallDimension,
} from '@cbhq/cds-common2/tokens/card';

import { HStack, VStack } from '../layout';
import { Pressable } from '../system';
import { Text } from '../typography/Text';

export type FloatingAssetCardProps = FloatingAssetCardBaseProps & Pick<PressableProps, 'onPress'>;

export const FloatingAssetCard = memo(
  ({
    title,
    description,
    subtitle,
    media,
    testID = 'floating-asset-card',
    size = 's',
    onPress,
  }: FloatingAssetCardProps) => {
    const width = useMemo(
      () => (size === 'l' ? floatingAssetCardLargeWidth : floatingAssetCardSmallDimension),
      [size],
    );
    const pressableStyles = useMemo(() => {
      return {
        minWidth: floatingAssetCardSmallDimension,
        maxWidth: width,
      };
    }, [width]);

    const content = (
      <VStack gap={1} maxWidth={width} testID={testID}>
        <HStack
          bordered
          borderRadius={500}
          height={floatingAssetCardSmallDimension}
          maxWidth={width}
          minWidth={floatingAssetCardSmallDimension}
          overflow="hidden"
        >
          {media}
        </HStack>
        <VStack gap={0.5} maxWidth={width}>
          {typeof subtitle === 'string' ? (
            <Text color="fgMuted" font="legal" numberOfLines={1}>
              {subtitle}
            </Text>
          ) : (
            subtitle
          )}
          {typeof title === 'string' ? (
            <Text font="headline" numberOfLines={3}>
              {title}
            </Text>
          ) : (
            title
          )}
          {typeof description === 'string' ? (
            <Text color="fgMuted" font="label2" numberOfLines={2}>
              {description}
            </Text>
          ) : (
            description
          )}
        </VStack>
      </VStack>
    );
    return onPress ? (
      <Pressable
        accessibilityRole="button"
        background="transparent"
        borderRadius={500}
        onPress={onPress}
        style={pressableStyles}
        testID={testID}
      >
        {content}
      </Pressable>
    ) : (
      content
    );
  },
);
