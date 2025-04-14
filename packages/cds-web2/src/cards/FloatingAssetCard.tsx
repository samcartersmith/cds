import React from 'react';
import { css, cx } from '@linaria/core';
import { opacityHovered, opacityPressed } from '@cbhq/cds-common2/tokens/interactable';
import type { FloatingAssetCardBaseProps } from '@cbhq/cds-common2/types/FloatingAssetCardBaseProps';

import { type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

export const floatingAssetCardLargeWidth = 359;
export const floatingAssetCardSmallDimension = 156;

export type FloatingAssetCardProps = FloatingAssetCardBaseProps & BoxProps<BoxDefaultElement>;

const pressStyle = css`
  /* Prevents layout shift - https://web.dev/cls/#animations-and-transitions */
  transform: scale(1);
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  background-color: var(--color-transparent);
  padding: 0;

  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }
  &:active {
    transform: scale(0.98);
    opacity: ${opacityPressed};
  }
  &:hover {
    opacity: ${opacityHovered};
  }
`;

const focusRingStyle = css`
  position: relative;
  /* if we use the focus ring we need to turn off the browser stylesheet outline */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 2px;
    border-radius: var(--borderRadius-500);
  }
`;

export const FloatingAssetCard = ({
  className,
  title,
  description,
  subtitle,
  media,
  size = 's',
  width = size === 'l' ? floatingAssetCardLargeWidth : floatingAssetCardSmallDimension,
  testID = 'floating-asset-card',
  onClick,
  ...props
}: FloatingAssetCardProps) => {
  return (
    <VStack
      as={onClick ? 'button' : 'div'}
      className={cx(onClick && pressStyle, focusRingStyle, className)}
      gap={1}
      maxWidth={width}
      onClick={onClick}
      testID={testID}
      {...props}
    >
      <HStack
        borderColor="bgLine"
        borderRadius={500}
        borderWidth={100}
        height={floatingAssetCardSmallDimension}
        maxWidth={width}
        minWidth={floatingAssetCardSmallDimension}
        overflow="hidden"
      >
        {media}
      </HStack>
      <VStack gap={0.5}>
        {typeof subtitle === 'string' ? (
          <Text as="p" color="fgMuted" display="block" font="legal" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : (
          subtitle
        )}
        {typeof title === 'string' ? (
          <Text as="p" display="block" font="headline" numberOfLines={3}>
            {title}
          </Text>
        ) : (
          title
        )}
        {typeof description === 'string' ? (
          <Text as="p" color="fgMuted" display="block" font="label2" numberOfLines={2}>
            {description}
          </Text>
        ) : (
          description
        )}
      </VStack>
    </VStack>
  );
};
