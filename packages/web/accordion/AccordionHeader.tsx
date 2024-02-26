import React, { ForwardedRef, forwardRef, memo, useCallback } from 'react';
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

import { overflowClassName, truncateClassName } from '../cells/Cell';
import { Box, HStack, VStack } from '../layout';
import { AnimatedCaret } from '../motion/AnimatedCaret';
import { Pressable } from '../system/Pressable';
import { TextBody, TextHeadline } from '../typography';
import { typographyResets } from '../typography/createText';

import { getAccordionHeaderId, getAccordionPanelId } from './utils';

export type AccordionHeaderProps = AccordionHeaderBaseProps;

export const AccordionMedia = memo(({ media }: AccordionMediaBaseProps) => (
  <Box flexGrow={0} flexShrink={0}>
    {media}
  </Box>
));

export const AccordionTitle = memo(({ title, subtitle }: AccordionTitleBaseProps) => (
  <Box className={truncateClassName} flexGrow={1} flexShrink={1} justifyContent="flex-start">
    <VStack>
      <TextHeadline as="div" overflow="wrap">
        {title}
      </TextHeadline>
      {!!subtitle && (
        <TextBody as="div" className={overflowClassName} color="foregroundMuted" overflow="wrap">
          {subtitle}
        </TextBody>
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
      forwardedRef: ForwardedRef<HTMLButtonElement>,
    ) => {
      const { onChange } = useAccordionParent();
      const spacing = useCellSpacing();
      const minHeight = useScaleConditional(listHeight);

      const handlePress = useCallback(() => {
        onPress?.(itemKey);
        onChange?.(itemKey);
      }, [onPress, onChange, itemKey]);

      return (
        <h2 className={typographyResets}>
          <Pressable
            ref={forwardedRef}
            noScaleOnPress
            transparentWhileInactive
            aria-controls={getAccordionPanelId(itemKey)}
            aria-expanded={!collapsed} // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
            background="background"
            id={getAccordionHeaderId(itemKey)}
            onPress={handlePress}
            testID={testID}
            width="100%"
          >
            <HStack
              alignItems="center"
              gap={2}
              minHeight={minHeight}
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
