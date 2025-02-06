import React, { forwardRef, memo, useCallback } from 'react';
import { View } from 'react-native';
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
} from '@cbhq/cds-common2/types';

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
      {!!subtitle && <TextBody color="fgMuted">{subtitle}</TextBody>}
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
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const { onChange } = useAccordionParent();
      const spacing = useCellSpacing();
      const accessibilityLabel = subtitle ? `${title}, ${subtitle}` : title;

      const handlePress = useCallback(() => {
        onPress?.(itemKey);
        onChange?.(itemKey);
      }, [onPress, onChange, itemKey]);

      return (
        <Pressable
          ref={forwardedRef}
          noScaleOnPress
          transparentWhileInactive
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="togglebutton"
          accessibilityState={{ expanded: !collapsed }}
          background="bg"
          onPress={handlePress}
          testID={testID}
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
      );
    },
  ),
);
