import React, { memo } from 'react';
import { ContentCellBaseProps } from '@cbhq/cds-common';
import { isProduction } from '@cbhq/cds-utils';

import { Box, HStack, VStack } from '../layout';
import { TextBody, TextHeadline, TextLabel2 } from '../typography';

import { Cell, CellSharedProps } from './Cell';
import { CellAccessory } from './CellAccessory';

export type ContentCellProps = ContentCellBaseProps & CellSharedProps;

export const ContentCell = memo(function ContentCell({
  accessory,
  title,
  description,
  disabled,
  media,
  meta,
  selected,
  subtitle,
  ...props
}: ContentCellProps) {
  if (!isProduction()) {
    if (meta && !title && !subtitle) {
      console.error('ContentCell: Cannot use `meta` without a `title` or `subtitle`.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const hasTitles = Boolean(title || subtitle);
  const accessoryType = selected ? 'selected' : accessory;

  return (
    <Cell
      {...props}
      accessory={
        accessoryType ? <CellAccessory type={accessoryType} spacingTop={0.5} /> : undefined
      }
      alignItems="flex-start"
      media={media}
      disabled={disabled}
      selected={selected}
    >
      <VStack>
        {hasTitles && (
          <HStack alignItems="flex-start" justifyContent="space-between">
            <Box flexShrink={1}>
              {!!title && <TextHeadline>{title}</TextHeadline>}

              {!!subtitle && (
                <TextLabel2 spacingTop={title ? 0.5 : 0} spacingBottom={description ? 0.5 : 0}>
                  {subtitle}
                </TextLabel2>
              )}
            </Box>

            {!!meta && (
              <Box justifyContent="flex-end" spacingTop={0.5} spacingStart={1}>
                <TextLabel2 color="foregroundMuted">{meta}</TextLabel2>
              </Box>
            )}
          </HStack>
        )}

        {!!description && <TextBody color="foregroundMuted">{description}</TextBody>}
      </VStack>
    </Cell>
  );
});
