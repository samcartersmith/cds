import React, { memo, useMemo } from 'react';
import { PressableProps, ViewStyle } from 'react-native';
import { ContainedAssetCardBaseProps } from '@cbhq/cds-common';
import {
  containedAssetCardLargeDimension,
  containedAssetCardLargeWidth,
  containedAssetCardSmallDimension,
} from '@cbhq/cds-common/tokens/card';

import { HStack, HStackProps, VStack } from '../layout';
import { Pressable } from '../system';
import { TextHeadline, TextLabel2, TextLegal } from '../typography';

export type ContainedAssetCardProps = ContainedAssetCardBaseProps &
  Pick<PressableProps, 'onPress'> &
  Pick<HStackProps, 'minWidth' | 'maxWidth'>;

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
    maxWidth: propMaxWidth,
    minWidth: propMinWidth,
  }: ContainedAssetCardProps) => {
    const maxWidth = useMemo(
      () =>
        propMaxWidth ||
        (size === 'l' ? containedAssetCardLargeWidth : containedAssetCardSmallDimension),
      [size, propMaxWidth],
    );
    const minWidth = useMemo(
      () =>
        propMinWidth ||
        (size === 'l' ? containedAssetCardLargeDimension : containedAssetCardSmallDimension),
      [size, propMinWidth],
    );
    const pressableStyles = useMemo(() => {
      return {
        minWidth,
        maxWidth,
      } as ViewStyle;
    }, [maxWidth, minWidth]);
    const content = (
      <HStack
        background="backgroundAlternate"
        borderRadius="roundedXLarge"
        height={containedAssetCardSmallDimension}
        maxWidth={maxWidth}
        minWidth={minWidth}
        overflow="hidden"
        testID={onPress ? undefined : testID}
        width="100%"
      >
        <VStack
          alignContent="center"
          gap={1}
          height="100%"
          justifyContent="space-between"
          spacing={2}
          width={size === 'l' ? '50%' : '100%'}
        >
          <HStack>{header}</HStack>
          <VStack gap={0.5}>
            {typeof subtitle === 'string' ? (
              <TextLegal color="foregroundMuted" numberOfLines={1}>
                {subtitle}
              </TextLegal>
            ) : (
              subtitle
            )}
            {typeof title === 'string' ? (
              <TextHeadline numberOfLines={1}>{title}</TextHeadline>
            ) : (
              title
            )}
            {typeof description === 'string' ? (
              <TextLabel2 color="foregroundMuted" numberOfLines={1}>
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
        accessibilityRole="button"
        background="transparent"
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
