import React, { memo, useMemo } from 'react';
import { PressableProps } from 'react-native';
import { FloatingAssetCardBaseProps } from '@cbhq/cds-common2';
import {
  floatingAssetCardLargeWidth,
  floatingAssetCardSmallDimension,
} from '@cbhq/cds-common2/tokens/card';

import { HStack, VStack } from '../layout';
import { Pressable } from '../system';
import { TextHeadline, TextLabel2, TextLegal } from '../typography';

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
            <TextLegal color="textForegroundMuted" numberOfLines={1}>
              {subtitle}
            </TextLegal>
          ) : (
            subtitle
          )}
          {typeof title === 'string' ? (
            <TextHeadline numberOfLines={3}>{title}</TextHeadline>
          ) : (
            title
          )}
          {typeof description === 'string' ? (
            <TextLabel2 color="textForegroundMuted" numberOfLines={2}>
              {description}
            </TextLabel2>
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
