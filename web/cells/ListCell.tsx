import React, { memo } from 'react';

import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { listHeight, compactListHeight } from '@cbhq/cds-common/tokens/cell';
import type { ListCellBaseProps } from '@cbhq/cds-common/types';

import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';
import { Cell, CellSharedProps, overflowClassName } from './Cell';
import { CellAccessory } from './CellAccessory';
import { CellDetail } from './CellDetail';

export type ListCellProps = ListCellBaseProps & CellSharedProps;

export const ListCell = memo(function ListCell({
  accessory,
  action,
  compact,
  title,
  description,
  detail,
  disabled,
  media,
  multiline,
  selected,
  subdetail,
  variant,
  ...props
}: ListCellProps) {
  const minHeight = useScaleConditional(compact ? compactListHeight : listHeight);

  const accessoryType = selected ? 'selected' : accessory;
  let end;

  if (action) {
    end = <Box justifyContent="flex-end">{action}</Box>;
  } else if (detail || subdetail) {
    end = <CellDetail detail={detail} subdetail={subdetail} variant={variant} />;
  }

  return (
    <Cell
      {...props}
      accessory={accessoryType && <CellAccessory type={accessoryType} />}
      detail={end}
      media={media}
      disabled={disabled}
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
            color="foregroundMuted"
            overflow={multiline ? undefined : 'truncate'}
            dangerouslySetClassName={multiline ? overflowClassName : undefined}
          >
            {description}
          </TextBody>
        )}
      </VStack>
    </Cell>
  );
});
