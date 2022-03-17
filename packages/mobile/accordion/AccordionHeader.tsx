import React, { ForwardedRef, forwardRef, memo, useCallback } from 'react';
import { View } from 'react-native';
import { useAccordionParent } from '@cbhq/cds-common/accordion/AccordionParentContext';
import { useCellSpacing } from '@cbhq/cds-common/hooks/useCellSpacing';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { listHeight } from '@cbhq/cds-common/tokens/cell';
import type {
  AccordionHeaderBaseProps,
  AccordionIconBaseProps,
  AccordionMediaBaseProps,
  AccordionTitleBaseProps,
} from '@cbhq/cds-common/types';

import { useToggleAnimation } from '../collapsible/useToggleAnimation';
import { Icon } from '../icons';
import { Box, HStack, VStack } from '../layout';
import { Pressable } from '../system/Pressable';
import { TextBody, TextHeadline } from '../typography';

import { useAccordionIconAnimation } from './useAccordionIconAnimation';

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
  const { animatedStyles, animateIn, animateOut } = useAccordionIconAnimation();
  useToggleAnimation({ on: !collapsed, animateIn, animateOut });

  return (
    <Box justifyContent="flex-end">
      <Icon
        name="caretDown"
        size="s"
        color="foregroundMuted"
        animated
        dangerouslySetStyle={animatedStyles}
      />
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
          accessibilityRole="button"
          noScaleOnPress
          transparentWhileInactive
          backgroundColor="background"
          onPress={handlePress}
          testID={testID}
          ref={forwardedRef}
        >
          <HStack width="100%" alignItems="center" gap={2} minHeight={minHeight} {...spacing.outer}>
            {!!media && <AccordionMedia media={media} />}
            <AccordionTitle title={title} subtitle={subtitle} />
            <AccordionIcon collapsed={collapsed} />
          </HStack>
        </Pressable>
      );
    },
  ),
);
