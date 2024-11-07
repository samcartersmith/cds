import React, { forwardRef, memo } from 'react';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { compactListHeight, listHeight } from '@cbhq/cds-common/tokens/cell';
import type { ListCellBaseProps } from '@cbhq/cds-common/types';

import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';

import { Cell, CellSharedProps, overflowClassName } from './Cell';
import { CellAccessory } from './CellAccessory';
import { CellDetail } from './CellDetail';

export type ListCellProps = ListCellBaseProps & CellSharedProps;

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
      ...props
    }: ListCellProps,
    ref: React.ForwardedRef<HTMLElement>,
  ) {
    const minHeight = useScaleConditional(compact ? compactListHeight : listHeight);
    const accessoryType = selected && !disableSelectionAccessory ? 'selected' : accessory;

    let end;

    if (action) {
      end = <Box justifyContent="flex-end">{action}</Box>;
    } else if (detail || subdetail) {
      end = <CellDetail detail={detail} subdetail={subdetail} variant={variant} />;
    }

    return (
      <Cell
        {...props}
        ref={ref}
        accessory={accessoryType && <CellAccessory type={accessoryType} />}
        detail={end}
        disabled={disabled}
        media={media}
        minHeight={minHeight}
        selected={selected}
      >
        <VStack>
          {!!title && (
            <TextHeadline as="div" overflow="truncate">
              {title}
            </TextHeadline>
          )}

          {!!description && (
            <TextBody
              as="div"
              className={multiline ? overflowClassName : undefined}
              color="foregroundMuted"
              overflow={multiline ? undefined : 'truncate'}
            >
              {description}
            </TextBody>
          )}
        </VStack>
      </Cell>
    );
  }),
);
