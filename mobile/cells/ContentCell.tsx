import React, { memo } from 'react';

import { ContentCellProps } from '@cbhq/cds-common';

import { Box, HStack, VStack } from '../layout';
import { TextHeadline, TextBody, TextLabel2 } from '../typography';
import { Cell } from './Cell';
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
}: ContentCellProps) {
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
      <VStack>
        {Boolean(title || subtitle) && (
          <HStack alignItems="flex-start" justifyContent="space-between">
            <Box maxWidth={meta ? '80%' : undefined}>
              {!!title && <TextHeadline>{title}</TextHeadline>}

              {!!subtitle && (
                <TextLabel2 spacingTop={title ? 0.5 : 0} spacingBottom={description ? 0.5 : 0}>
                  {subtitle}
                </TextLabel2>
              )}
            </Box>

            {!!meta && (
              <Box justifyContent="flex-end" flexGrow={0} flexShrink={1} spacingTop={0.5}>
                <TextLabel2 color="foregroundMuted">{meta}</TextLabel2>
              </Box>
            )}
          </HStack>
        )}

        {!!description && (
          <TextBody color="foregroundMuted" spacingTop={0.5}>
            {description}
          </TextBody>
        )}
      </VStack>
    </Cell>
  );
});
