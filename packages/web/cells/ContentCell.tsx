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
      // eslint-disable-next-line no-console
      console.error('ContentCell: Cannot use `meta` without a `title` or `subtitle`.');
    }
  }

  const accessoryType = selected ? 'selected' : accessory;
  const hasTitles = Boolean(title ?? subtitle);

  return (
    <Cell
      {...props}
      accessory={accessoryType && <CellAccessory spacingTop={0.5} type={accessoryType} />}
      alignItems="flex-start"
      disabled={disabled}
      media={media}
      selected={selected}
    >
      {hasTitles && (
        <HStack alignItems="flex-start" justifyContent="space-between">
          <VStack dangerouslySetClassName={truncateClassName} flexGrow={1} flexShrink={1}>
            {!!title && (
              <TextHeadline as="div" overflow="truncate">
                {title}
              </TextHeadline>
            )}

            {!!subtitle && (
              <TextLabel2
                as="div"
                overflow="truncate"
                spacingBottom={description ? 0.5 : 0}
                spacingTop={title ? 0.5 : 0}
              >
                {subtitle}
              </TextLabel2>
            )}
          </VStack>

          {!!meta && (
            <Box
              dangerouslySetClassName={truncateClassName}
              flexGrow={0}
              flexShrink={0}
              justifyContent="flex-end"
              spacingStart={2}
              spacingTop={0.5}
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
