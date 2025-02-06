import React, { forwardRef, memo, useCallback } from 'react';
import { css } from '@linaria/core';
import { useAccordionParent } from '@cbhq/cds-common2/accordion/AccordionParentContext';
import {
  accordionIconHiddenRotate,
  accordionIconVisibleRotate,
} from '@cbhq/cds-common2/animation/accordion';
import { useCellSpacing } from '@cbhq/cds-common2/hooks/useCellSpacing';
import { listHeight } from '@cbhq/cds-common2/tokens/cell';
import type {
  AccordionHeaderBaseProps,
  AccordionIconBaseProps,
  AccordionMediaBaseProps,
  AccordionTitleBaseProps,
} from '@cbhq/cds-common2/types/AccordionBaseProps';

import { Box, HStack, VStack } from '../layout';
import { AnimatedCaret } from '../motion/AnimatedCaret';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

import { getAccordionHeaderId, getAccordionPanelId } from './utils';

export type AccordionHeaderProps = AccordionHeaderBaseProps;

const baseStyle = css`
  margin: 0;
`;

const subtitleStyle = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

const titleStyle = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const AccordionMedia = memo(({ media }: AccordionMediaBaseProps) => (
  <Box flexGrow={0} flexShrink={0}>
    {media}
  </Box>
));

export const AccordionTitle = memo(({ title, subtitle }: AccordionTitleBaseProps) => (
  <Box className={titleStyle} flexGrow={1} flexShrink={1} justifyContent="flex-start">
    <VStack>
      <Text as="div" font="headline" overflow="wrap">
        {title}
      </Text>
      {!!subtitle && (
        <Text as="div" className={subtitleStyle} color="fgMuted" font="body" overflow="wrap">
          {subtitle}
        </Text>
      )}
    </VStack>
  </Box>
));

export const AccordionIcon = memo(({ collapsed }: AccordionIconBaseProps) => {
  return (
    <Box justifyContent="flex-end">
      <AnimatedCaret rotate={collapsed ? accordionIconHiddenRotate : accordionIconVisibleRotate} />
    </Box>
  );
});

export const AccordionHeader = memo(
  forwardRef(
    (
      { itemKey, title, subtitle, onPress, media, collapsed = false, testID }: AccordionHeaderProps,
      forwardedRef: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const { onChange } = useAccordionParent();
      const spacing = useCellSpacing();

      const handlePress = useCallback(() => {
        onPress?.(itemKey);
        onChange?.(itemKey);
      }, [onPress, onChange, itemKey]);

      return (
        <h2 className={baseStyle}>
          <Pressable
            ref={forwardedRef}
            noScaleOnPress
            transparentWhileInactive
            aria-controls={getAccordionPanelId(itemKey)}
            aria-expanded={!collapsed} // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
            background="bg"
            id={getAccordionHeaderId(itemKey)}
            onPress={handlePress}
            testID={testID}
            width="100%"
          >
            <HStack
              alignItems="center"
              gap={2}
              minHeight={listHeight}
              width="100%"
              {...spacing.outer}
            >
              {!!media && <AccordionMedia media={media} />}
              <AccordionTitle subtitle={subtitle} title={title} />
              <AccordionIcon collapsed={collapsed} />
            </HStack>
          </Pressable>
        </h2>
      );
    },
  ),
);
