import React, { memo } from 'react';
import type { ContentCellBaseProps } from '@cbhq/cds-common/types';
import { isProduction } from '@cbhq/cds-utils';

import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';
import { TextLabel2 } from '../typography/TextLabel2';

import { Cell, CellSharedProps, overflowClassName, truncateClassName } from './Cell';
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

  const accessoryType = selected ? 'selected' : accessory;

  return (
    <Cell
      {...props}
      accessory={accessoryType && <CellAccessory type={accessoryType} spacingTop={0.5} />}
      alignItems="flex-start"
      media={media}
      disabled={disabled}
      selected={selected}
    >
      {(title || subtitle) && (
        <HStack alignItems="flex-start" justifyContent="space-between">
          <VStack flexGrow={1} flexShrink={1} dangerouslySetClassName={truncateClassName}>
            {!!title && (
              <TextHeadline as="div" overflow="truncate">
                {title}
              </TextHeadline>
            )}

            {!!subtitle && (
              <TextLabel2
                as="div"
                spacingTop={title ? 0.5 : 0}
                spacingBottom={description ? 0.5 : 0}
                overflow="truncate"
              >
                {subtitle}
              </TextLabel2>
            )}
          </VStack>

          {!!meta && (
            <Box
              flexGrow={0}
              flexShrink={0}
              justifyContent="flex-end"
              spacingTop={0.5}
              spacingStart={2}
              dangerouslySetClassName={truncateClassName}
            >
              <TextLabel2 as="span" color="foregroundMuted" overflow="truncate">
                {meta}
              </TextLabel2>
            </Box>
          )}
        </HStack>
      )}

      {!!description && (
        <div className={overflowClassName}>
          <TextBody as="div" color="foregroundMuted">
            {description}
          </TextBody>
        </div>
      )}
    </Cell>
  );
});
