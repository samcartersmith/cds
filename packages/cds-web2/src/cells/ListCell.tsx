import React, { forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { compactListHeight, listHeight } from '@cbhq/cds-common2/tokens/cell';
import type { ListCellBaseProps } from '@cbhq/cds-common2/types';

import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { type CellSharedProps, Cell } from './Cell';
import { CellAccessory } from './CellAccessory';
import { CellDetail } from './CellDetail';

const overflowStyle = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

export type ListCellProps = ListCellBaseProps & Omit<CellSharedProps, 'ref' | 'title'>;

export const ListCell = memo(
  forwardRef(function ListCell(
    {
      accessory,
      action,
      compact,
      title,
      description,
      detail,
      disabled,
      disableSelectionAccessory,
      media,
      multiline,
      selected,
      subdetail,
      variant,
      intermediary,
      priority,
      innerSpacing,
      outerSpacing,
      detailWidth,
      ...props
    }: ListCellProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
    const minHeight = compact ? compactListHeight : listHeight;
    const accessoryType = selected && !disableSelectionAccessory ? 'selected' : accessory;

    const end = useMemo(() => {
      if (action) {
        return <Box justifyContent="flex-end">{action}</Box>;
      }
      if (detail || subdetail) {
        return <CellDetail detail={detail} subdetail={subdetail} variant={variant} />;
      }
      return undefined;
    }, [action, detail, subdetail, variant]);

    return (
      <Cell
        ref={ref}
        accessory={accessoryType && <CellAccessory type={accessoryType} />}
        detail={end}
        detailWidth={detailWidth}
        disabled={disabled}
        innerSpacing={innerSpacing}
        intermediary={intermediary}
        media={media}
        minHeight={minHeight}
        outerSpacing={outerSpacing}
        priority={priority}
        selected={selected}
        {...props}
      >
        <VStack>
          {!!title && (
            <Text as="div" font="headline" overflow="truncate">
              {title}
            </Text>
          )}

          {!!description && (
            <Text
              as="div"
              className={multiline ? overflowStyle : undefined}
              color="fgMuted"
              font="body"
              overflow={multiline ? undefined : 'truncate'}
            >
              {description}
            </Text>
          )}
        </VStack>
      </Cell>
    );
  }),
);
