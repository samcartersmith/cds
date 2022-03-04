import React, { forwardRef, memo, useCallback, ForwardedRef } from 'react';
import type {
  AccordionHeaderBaseProps,
  AccordionMediaBaseProps,
  AccordionTitleBaseProps,
  AccordionIconBaseProps,
} from '@cbhq/cds-common/types';
import { useAccordionParent } from '@cbhq/cds-common/accordions/AccordionParentContext';
import { listHeight } from '@cbhq/cds-common/tokens/cell';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { useCellSpacing } from '@cbhq/cds-common/hooks/useCellSpacing';

import { VStack, Box, HStack } from '../layout';
import { TextHeadline, TextBody } from '../typography';
import { Pressable } from '../system/Pressable';
import { Icon } from '../icons';
import { getAccordionHeaderId, getAccordionPanelId } from './utils';
import { typographyResets } from '../typography/createText';
import { iconStyles } from './accordionStyles';
import { overflowClassName, truncateClassName } from '../cells/Cell';

export type AccordionHeaderProps = AccordionHeaderBaseProps;

export const AccordionMedia = memo(({ media }: AccordionMediaBaseProps) => (
  <Box flexGrow={0} flexShrink={0}>
    {media}
  </Box>
));

export const AccordionTitle = memo(({ title, subtitle }: AccordionTitleBaseProps) => (
  <Box
    flexGrow={1}
    flexShrink={1}
    justifyContent="flex-start"
    dangerouslySetClassName={truncateClassName}
  >
    <VStack>
      <TextHeadline as="div" overflow="truncate">
        {title}
      </TextHeadline>
      {!!subtitle && (
        <TextBody
          as="div"
          overflow="truncate"
          color="foregroundMuted"
          dangerouslySetClassName={overflowClassName}
        >
          {subtitle}
        </TextBody>
      )}
    </VStack>
  </Box>
));

export const AccordionIcon = memo(({ expanded }: AccordionIconBaseProps) => (
  <Box
    justifyContent="flex-end"
    dangerouslySetClassName={expanded ? iconStyles.expanded : iconStyles.collapsed}
  >
    <Icon name="caretDown" size="s" color="foregroundMuted" />
  </Box>
));

export const AccordionHeader = memo(
  forwardRef(
    (
      { itemKey, title, subtitle, onPress, media, expanded = false, testID }: AccordionHeaderProps,
      forwardedRef: ForwardedRef<HTMLButtonElement>,
    ) => {
      const { onItemPress } = useAccordionParent();
      const spacing = useCellSpacing();
      const minHeight = useScaleConditional(listHeight);

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
            ref={forwardedRef}
            // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
            aria-expanded={expanded}
            aria-controls={getAccordionPanelId(itemKey)}
            id={getAccordionHeaderId(itemKey)}
          >
            <HStack
              width="100%"
              alignItems="center"
              gap={2}
              minHeight={minHeight}
              {...spacing.outer}
            >
              {!!media && <AccordionMedia media={media} />}
              <AccordionTitle title={title} subtitle={subtitle} />
              <AccordionIcon expanded={expanded} />
            </HStack>
          </Pressable>
        </h2>
      );
    },
  ),
);
