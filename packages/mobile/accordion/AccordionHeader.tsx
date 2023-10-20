import React, { ForwardedRef, forwardRef, memo, useCallback } from 'react';
import { View } from 'react-native';
import { useAccordionParent } from '@cbhq/cds-common/accordion/AccordionParentContext';
import {
  accordionIconHiddenRotate,
  accordionIconVisibleRotate,
} from '@cbhq/cds-common/animation/accordion';
import { useCellSpacing } from '@cbhq/cds-common/hooks/useCellSpacing';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { listHeight } from '@cbhq/cds-common/tokens/cell';
import type {
  AccordionHeaderBaseProps,
  AccordionIconBaseProps,
  AccordionMediaBaseProps,
  AccordionTitleBaseProps,
} from '@cbhq/cds-common/types';

import { Box, HStack, VStack } from '../layout';
import { AnimatedCaret } from '../motion/AnimatedCaret';
import { Pressable } from '../system/Pressable';
import { TextBody, TextHeadline } from '../typography';

export type AccordionHeaderProps = AccordionHeaderBaseProps;

export const AccordionMedia = memo(({ media }: AccordionMediaBaseProps) => <Box>{media}</Box>);

export const AccordionTitle = memo(({ title, subtitle }: AccordionTitleBaseProps) => (
  <Box flexGrow={1} flexShrink={1} justifyContent="flex-start">
    <VStack>
      <TextHeadline>{title}</TextHeadline>
      {!!subtitle && <TextBody color="foregroundMuted">{subtitle}</TextBody>}
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
      { itemKey, title, subtitle, onPress, media, collapsed, testID }: AccordionHeaderProps,
      forwardedRef: ForwardedRef<View>,
    ) => {
      const { onItemPress } = useAccordionParent();
      const spacing = useCellSpacing();
      const minHeight = useScaleConditional(listHeight);

      const handlePress = useCallback(() => {
        onPress?.(itemKey);
        onItemPress?.(itemKey);
      }, [onPress, onItemPress, itemKey]);

      return (
        <Pressable
          ref={forwardedRef}
          noScaleOnPress
          transparentWhileInactive
          accessibilityLabel={title}
          accessibilityRole="togglebutton"
          accessibilityState={{ expanded: !collapsed }}
          backgroundColor="background"
          onPress={handlePress}
          testID={testID}
        >
          <HStack alignItems="center" gap={2} minHeight={minHeight} width="100%" {...spacing.outer}>
            {!!media && <AccordionMedia media={media} />}
            <AccordionTitle subtitle={subtitle} title={title} />
            <AccordionIcon collapsed={collapsed} />
          </HStack>
        </Pressable>
      );
    },
  ),
);
