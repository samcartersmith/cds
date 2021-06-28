import React, { memo } from 'react';

import { ListCellBaseProps } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { listHeight } from '@cbhq/cds-common/tokens/cell';

import { VStack } from '../layout/VStack';
import { TextHeadline, TextBody } from '../typography';
import { Cell, CellSharedProps } from './Cell';
import { CellAccessory } from './CellAccessory';
import { CellDetail } from './CellDetail';
import { CellMedia } from './CellMedia';
import { MediaFallback } from './MediaFallback';

export interface ListCellProps extends ListCellBaseProps, CellSharedProps {}

export const ListCell = memo(function ListCell({
  accessory,
  action,
  title,
  description,
  detail,
  detailWidth,
  disabled,
  media,
  multiline,
  selected,
  subdetail,
  variant,
  onPress,
  ...props
}: ListCellProps) {
  if (process.env.NODE_ENV !== 'production') {
    if (media && media.type !== CellMedia && media.type !== MediaFallback) {
      console.error('ListCell: Media must be a `CellMedia` component.');
    }
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
          <CellDetail
            adjustsFontSizeToFit={!!detailWidth}
            detail={detail}
            subdetail={subdetail}
            variant={variant}
          />
        ))
      }
      detailWidth={detailWidth}
      media={media}
      disabled={disabled}
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
          <TextBody
            color="foregroundMuted"
            numberOfLines={multiline ? undefined : title ? 1 : 2}
            ellipsize={multiline ? undefined : 'tail'}
          >
            {description}
          </TextBody>
        )}
      </VStack>
    </Cell>
  );
});
