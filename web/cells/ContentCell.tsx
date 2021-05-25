import React, { memo } from 'react';

import { ContentCellProps } from '@cbhq/cds-common';

import { Box, HStack, VStack } from '../layout';
import { TextHeadline, TextBody, TextLabel2 } from '../typography';
import { Cell, CellSharedProps } from './Cell';
import { CellAccessory } from './CellAccessory';

export type { ContentCellProps };

export const ContentCell = memo(function ContentCell({
  accessory,
  title,
  description,
  disabled,
  media,
  meta,
  selected,
  subtitle,
  onPress,
  ...props
}: ContentCellProps & CellSharedProps) {
  if (process.env.NODE_ENV !== 'production' && meta && !title && !subtitle) {
    console.error('ContentCell: Cannot use `meta` without a `title` or `subtitle`.');
  }

  const accessoryType = selected ? 'selected' : accessory;

  return (
    <Cell
      {...props}
      accessory={accessoryType && <CellAccessory type={accessoryType} spacingTop={0.5} />}
      alignItems="flex-start"
      media={media}
      disabled={disabled}
      maxContentWidth="100%"
      selected={selected}
      onPress={onPress}
    >
      <VStack width="100%">
        {(title || subtitle) && (
          <HStack alignItems="flex-start" justifyContent="space-between">
            <VStack maxWidth={meta ? '80%' : undefined}>
              {title && <TextHeadline as="div">{title}</TextHeadline>}

              {subtitle && (
                <TextLabel2
                  as="div"
                  spacingTop={title ? 0.5 : 0}
                  spacingBottom={description ? 0.5 : 0}
                >
                  {subtitle}
                </TextLabel2>
              )}
            </VStack>

            {meta && (
              <Box justifyContent="flex-end" flexGrow={0} flexShrink={1} spacingTop={0.5}>
                <TextLabel2 as="span" color="foregroundMuted">
                  {meta}
                </TextLabel2>
              </Box>
            )}
          </HStack>
        )}

        {description && (
          <TextBody as="div" color="foregroundMuted" spacingTop={0.5}>
            {description}
          </TextBody>
        )}
      </VStack>
    </Cell>
  );
});
