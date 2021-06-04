import React, { memo } from 'react';

import { ListCellProps } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { listHeight } from '@cbhq/cds-common/tokens/cell';

import { VStack } from '../layout/VStack';
import { TextHeadline, TextBody } from '../typography';
import { Cell } from './Cell';
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
}: ListCellProps) {
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
      maxContentWidth={action ? undefined : '70%'}
      maxDetailWidth="50%"
      minHeight={minHeight}
      selected={selected}
      onPress={onPress}
    >
      <VStack justifyContent="center">
        {!!title && (
          <TextHeadline numberOfLines={description ? 1 : 2} ellipsize="tail">
            {title}
          </TextHeadline>
        )}

        {!!description && (
          <TextBody numberOfLines={multiline ? undefined : title ? 1 : 2} ellipsize="tail">
            {description}
          </TextBody>
        )}
      </VStack>
    </Cell>
  );
});
