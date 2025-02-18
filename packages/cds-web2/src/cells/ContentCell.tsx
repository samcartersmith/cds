import React, { forwardRef, memo } from 'react';
import type { ContentCellBaseProps } from '@cbhq/cds-common2/types';
import { isProduction } from '@cbhq/cds-utils';

import { type BoxProps, Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { Cell, CellSharedProps, overflowClassName, truncateClassName } from './Cell';
import { CellAccessory } from './CellAccessory';

export type ContentCellProps = ContentCellBaseProps &
  CellSharedProps &
  Omit<BoxProps<'div' | 'li'>, 'title'>;

export const ContentCell = memo(
  forwardRef(function ContentCell(
    {
      accessory,
      title,
      description,
      disabled,
      media,
      meta,
      selected,
      subtitle,
      ...props
    }: ContentCellProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
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
        ref={ref}
        accessory={accessoryType && <CellAccessory paddingTop={0.5} type={accessoryType} />}
        alignItems="flex-start"
        disabled={disabled}
        media={media}
        selected={selected}
      >
        {hasTitles && (
          <HStack alignItems="flex-start" justifyContent="space-between">
            <VStack className={truncateClassName} flexGrow={1} flexShrink={1}>
              {!!title && (
                <Text as="div" font="headline" overflow="truncate">
                  {title}
                </Text>
              )}

              {!!subtitle && (
                <Text
                  as="div"
                  font="label2"
                  overflow="truncate"
                  paddingBottom={description ? 0.5 : 0}
                  paddingTop={title ? 0.5 : 0}
                >
                  {subtitle}
                </Text>
              )}
            </VStack>

            {!!meta && (
              <Box
                className={truncateClassName}
                flexGrow={0}
                flexShrink={0}
                justifyContent="flex-end"
                paddingLeft={2}
                paddingTop={0.5}
              >
                <Text as="span" color="fgMuted" font="label2" overflow="truncate">
                  {meta}
                </Text>
              </Box>
            )}
          </HStack>
        )}

        {!!description && (
          <div className={overflowClassName}>
            <Text as="div" color="fgMuted" font="body">
              {description}
            </Text>
          </div>
        )}
      </Cell>
    );
  }),
);
