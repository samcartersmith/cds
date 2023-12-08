import React, { memo, useMemo } from 'react';
import { ContainedAssetCardBaseProps } from '@cbhq/cds-common';
import {
  containedAssetCardLargeDimension,
  containedAssetCardLargeWidth,
  containedAssetCardSmallDimension,
} from '@cbhq/cds-common/tokens/card';

import { HStack, VStack } from '../layout';
import { Pressable } from '../system';
import { TextHeadline, TextLabel2, TextLegal } from '../typography';

export const ContainedAssetCard = memo(
  ({
    title,
    description,
    subtitle,
    header,
    testID = 'contained-asset-card',
    size = 's',
    children,
    onPress,
  }: ContainedAssetCardBaseProps) => {
    const width = useMemo(
      () => (size === 'l' ? containedAssetCardLargeWidth : containedAssetCardSmallDimension),
      [size],
    );
    const minWidth = useMemo(
      () => (size === 'l' ? containedAssetCardLargeDimension : containedAssetCardSmallDimension),
      [size],
    );
    const pressableStyles = useMemo(() => {
      return {
        minWidth,
        maxWidth: width,
      };
    }, [width, minWidth]);
    const content = (
      <HStack
        background="backgroundAlternate"
        borderRadius="roundedXLarge"
        height={containedAssetCardSmallDimension}
        maxWidth={width}
        minWidth={minWidth}
        overflow="hidden"
        testID={onPress ? undefined : testID}
      >
        <VStack
          alignContent="center"
          gap={1}
          height="100%"
          justifyContent="space-between"
          spacing={2}
          width={size === 'l' ? '50%' : '100%'}
        >
          <HStack overflow="hidden">{header}</HStack>
          <VStack gap={0.5}>
            {typeof subtitle === 'string' ? (
              <TextLegal as="p" color="foregroundMuted" numberOfLines={1}>
                {subtitle}
              </TextLegal>
            ) : (
              subtitle
            )}
            {typeof title === 'string' ? (
              <TextHeadline as="h3" numberOfLines={1}>
                {title}
              </TextHeadline>
            ) : (
              title
            )}
            {typeof description === 'string' ? (
              <TextLabel2 as="p" color="foregroundMuted" numberOfLines={1}>
                {description}
              </TextLabel2>
            ) : (
              description
            )}
          </VStack>
        </VStack>
        {size === 'l' && <VStack width="50%">{children}</VStack>}
      </HStack>
    );
    return onPress ? (
      <Pressable
        as="button"
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
