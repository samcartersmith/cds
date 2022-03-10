import React, { memo, useCallback, forwardRef, ForwardedRef } from 'react';
import { View } from 'react-native';
import type {
  AccordionHeaderBaseProps,
  AccordionMediaBaseProps,
  AccordionTitleBaseProps,
  AccordionIconBaseProps,
} from '@cbhq/cds-common/types';
import { useCellSpacing } from '@cbhq/cds-common/hooks/useCellSpacing';
import { useAccordionParent } from '@cbhq/cds-common/accordions/AccordionParentContext';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { listHeight } from '@cbhq/cds-common/tokens/cell';

import { VStack, Box, HStack } from '../layout';
import { TextHeadline, TextBody } from '../typography';
import { Pressable } from '../system/Pressable';
import { Icon } from '../icons';
import { useAccordionIconAnimation } from './useAccordionIconAnimation';
import { useToggleAnimation } from '../collapsible/useToggleAnimation';

export type AccordionHeaderProps = AccordionHeaderBaseProps;

export const AccordionMedia = memo(({ media }: AccordionMediaBaseProps) => <Box>{media}</Box>);

export const AccordionTitle = memo(({ title, subtitle }: AccordionTitleBaseProps) => (
  <Box flexGrow={1} flexShrink={1} justifyContent="flex-start">
    <VStack>
      <TextHeadline ellipsize="tail">{title}</TextHeadline>
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
