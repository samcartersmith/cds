import React, { memo, useCallback } from 'react';
import type {
  AccordionHeaderBaseProps,
  AccordionMediaBaseProps,
  AccordionTitleBaseProps,
  AccordionIconBaseProps,
} from '@cbhq/cds-common/types';
import { useAccordionParent } from '@cbhq/cds-common/accordions/AccordionParentContext';
import { accordionSpacing } from '@cbhq/cds-common/accordions/accordionStyles';

import { VStack, Box, HStack } from '../layout';
import { TextTitle4, TextBody } from '../typography';
import { Pressable } from '../system/Pressable';
import { Icon } from '../icons';
import { getAccordionHeaderId, getAccordionPanelId } from './utils';
import { typographyResets } from '../typography/createText';

export type AccordionHeaderProps = AccordionHeaderBaseProps;

export const AccordionMedia = memo(({ media }: AccordionMediaBaseProps) => (
  <Box flexGrow={0} flexShrink={0}>
    {media}
  </Box>
));

export const AccordionTitle = memo(({ title, subtitle }: AccordionTitleBaseProps) => (
  <Box flexGrow={1} flexShrink={1} justifyContent="flex-start">
    <VStack>
      <TextTitle4 as="div" overflow="truncate">
        {title}
      </TextTitle4>
      {!!subtitle && (
        <TextBody as="div" color="foregroundMuted">
          {subtitle}
        </TextBody>
      )}
    </VStack>
  </Box>
));

export const AccordionIcon = memo(({ expanded }: AccordionIconBaseProps) => (
  <Box justifyContent="flex-end">
    <Icon name={expanded ? 'caretUp' : 'caretDown'} size="s" color="foregroundMuted" />
  </Box>
));

export const AccordionHeader = memo(
  ({ itemKey, title, subtitle, onPress, media, expanded, testID }: AccordionHeaderProps) => {
    const { onItemPress } = useAccordionParent();

    const handlePress = useCallback(() => {
      onPress?.(itemKey);
      onItemPress?.(itemKey);
    }, [onPress, onItemPress, itemKey]);

    return (
      <h2 className={typographyResets}>
        <Pressable
          noScaleOnPress
          transparentWhileInactive
          backgroundColor="background"
          onPress={handlePress}
          width="100%"
          testID={testID}
          // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
          aria-expanded={expanded}
          aria-controls={getAccordionPanelId(itemKey)}
          id={getAccordionHeaderId(itemKey)}
        >
          <HStack width="100%" alignItems="center" gap={2} {...accordionSpacing.header}>
            {!!media && <AccordionMedia media={media} />}
            <AccordionTitle title={title} subtitle={subtitle} />
            <AccordionIcon expanded={expanded} />
          </HStack>
        </Pressable>
      </h2>
    );
  },
);
