import React, { memo, useMemo } from 'react';
import { FloatingAssetCardBaseProps } from '@cbhq/cds-common';
import {
  floatingAssetCardLargeWidth,
  floatingAssetCardSmallDimension,
} from '@cbhq/cds-common/tokens/card';

import { useLargeTextStyles } from '../hooks/useLargeTextStyles';
import { HStack, VStack } from '../layout';
import { Pressable } from '../system';
import { TextHeadline, TextLabel2, TextLegal } from '../typography';

export const FloatingAssetCard = memo(
  ({
    title,
    description,
    subtitle,
    media,
    testID = 'floating-asset-card',
    size = 's',
    onPress,
  }: FloatingAssetCardBaseProps) => {
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
    const largeTextStyle = useLargeTextStyles();

    const content = (
      <VStack gap={1} maxWidth={width} testID={testID}>
        <HStack
          bordered
          borderRadius="roundedXLarge"
          height={floatingAssetCardSmallDimension}
          maxWidth={width}
          minWidth={floatingAssetCardSmallDimension}
          overflow="hidden"
        >
          {media}
        </HStack>
        <VStack gap={0.5} maxWidth={width}>
          {typeof subtitle === 'string' ? (
            <TextLegal
              color="foregroundMuted"
              dangerouslySetStyle={largeTextStyle}
              numberOfLines={1}
            >
              {subtitle}
            </TextLegal>
          ) : (
            subtitle
          )}
          {typeof title === 'string' ? (
            <TextHeadline dangerouslySetStyle={largeTextStyle} numberOfLines={3}>
              {title}
            </TextHeadline>
          ) : (
            title
          )}
          {typeof description === 'string' ? (
            <TextLabel2
              color="foregroundMuted"
              dangerouslySetStyle={largeTextStyle}
              numberOfLines={2}
            >
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
        backgroundColor="transparent"
        borderRadius="roundedXLarge"
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
