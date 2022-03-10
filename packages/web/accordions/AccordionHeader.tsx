import React, { ForwardedRef, forwardRef, memo, useCallback } from 'react';
import { useAccordionParent } from '@cbhq/cds-common/accordions/AccordionParentContext';
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
import { Icon } from '../icons';
import { Box, HStack, VStack } from '../layout';
import { Pressable } from '../system/Pressable';
import { TextBody, TextHeadline } from '../typography';
import { typographyResets } from '../typography/createText';

import { iconStyles } from './accordionStyles';
import { getAccordionHeaderId, getAccordionPanelId } from './utils';

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

export const AccordionIcon = memo(({ collapsed }: AccordionIconBaseProps) => (
  <Box
    justifyContent="flex-end"
    dangerouslySetClassName={collapsed ? iconStyles.collapsed : iconStyles.expanded}
  >
    <Icon name="caretDown" size="s" color="foregroundMuted" />
  </Box>
));

export const AccordionHeader = memo(
  forwardRef(
    (
      { itemKey, title, subtitle, onPress, media, collapsed = false, testID }: AccordionHeaderProps,
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
            aria-expanded={!collapsed}
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
              <AccordionIcon collapsed={collapsed} />
            </HStack>
          </Pressable>
        </h2>
      );
    },
  ),
);
