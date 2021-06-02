import React, { memo } from 'react';

import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { listHeight } from '@cbhq/cds-common/tokens/cell';
import type { ListCellProps } from '@cbhq/cds-common/types';

import { VStack } from '../layout/VStack';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';
import { Cell, CellSharedProps } from './Cell';
import { CellAccessory } from './CellAccessory';
import { CellDetail } from './CellDetail';

export type { ListCellProps };

export const ListCell = memo(function ListCell({
  accessory,
  action,
  title,
  description,
  detail,
  disabled,
  media,
  multiline,
  selected,
  subdetail,
  variant,
  onPress,
  ...props
}: ListCellProps & CellSharedProps) {
  if (process.env.NODE_ENV !== 'production' && onPress && action) {
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
      detail={action || <CellDetail detail={detail} subdetail={subdetail} variant={variant} />}
      media={media}
      disabled={disabled}
      maxContentWidth="70%"
      maxDetailWidth="50%"
      minHeight={minHeight}
      selected={selected}
      onPress={onPress}
    >
      <VStack justifyContent="center" maxWidth="100%">
        {title && (
          <TextHeadline as="div" overflow="truncate">
            {title}
          </TextHeadline>
        )}

        {description && (
          <TextBody as="div" overflow={multiline ? undefined : 'truncate'}>
            {description}
          </TextBody>
        )}
      </VStack>
    </Cell>
  );
});
