import React, { memo } from 'react';

import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { listHeight } from '@cbhq/cds-common/tokens/cell';
import type { ListCellBaseProps } from '@cbhq/cds-common/types';

import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';
import { Cell, CellSharedProps } from './Cell';
import { CellAccessory } from './CellAccessory';
import { CellDetail } from './CellDetail';

export interface ListCellProps extends ListCellBaseProps, CellSharedProps {}

export const ListCell = memo(function ListCell({
  accessory,
  action,
  title,
  description,
  detail,
  disabled,
  media,
  selected,
  subdetail,
  variant,
  ...props
}: ListCellProps) {
  if (process.env.NODE_ENV !== 'production' && action && (props.to || props.onPress)) {
    console.error(
      'ListCell: Cannot use `onPress` and `action` together. Unable to nest pressables.'
    );
  }

  const minHeight = useScaleConditional(listHeight);
  const accessoryType = selected ? 'selected' : accessory;

  return (
    <Cell
      {...props}
      accessory={accessoryType && <CellAccessory type={accessoryType} />}
      detail={
        action ||
        ((detail || subdetail) && (
          <CellDetail detail={detail} subdetail={subdetail} variant={variant} />
        ))
      }
      media={media}
      disabled={disabled}
      minHeight={minHeight}
      selected={selected}
    >
      <VStack>
        {title && <TextHeadline as="div">{title}</TextHeadline>}

        {description && <TextBody as="div">{description}</TextBody>}
      </VStack>
    </Cell>
  );
});
