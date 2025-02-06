import React, { memo } from 'react';
import { ListCellBaseProps } from '@cbhq/cds-common2';
import { compactListHeight, listHeight } from '@cbhq/cds-common2/tokens/cell';

import { VStack } from '../layout/VStack';
import { TextBody, TextHeadline } from '../typography';

import { Cell, CellSharedProps } from './Cell';
import { CellAccessory } from './CellAccessory';
import { CellDetail } from './CellDetail';

export type ListCellProps = ListCellBaseProps &
  CellSharedProps & {
    /**
     *  @default false
     *  When there is no description the title will take up two lines by default. When this is set to true multiline title behavior is overwritten and regardless of description text state the title will take up a single line truncating with ellipses.
     *   */
    disableMultilineTitle?: boolean;
  };

export const ListCell = memo(function ListCell({
  accessory,
  action,
  compact,
  title,
  disableMultilineTitle = false,
  description,
  detail,
  detailWidth,
  disabled,
  disableSelectionAccessory,
  media,
  multiline,
  selected,
  subdetail,
  variant,
  onPress,
  ...props
}: ListCellProps) {
  const minHeight = compact ? compactListHeight : listHeight;
  const accessoryType = selected && !disableSelectionAccessory ? 'selected' : accessory;
  const hasDetails = Boolean(detail || subdetail);

  return (
    <Cell
      {...props}
      accessory={accessoryType ? <CellAccessory type={accessoryType} /> : undefined}
      compact={compact}
      detail={
        action ||
        (hasDetails && (
          <CellDetail
            adjustsFontSizeToFit={!!detailWidth}
            detail={detail}
            subdetail={subdetail}
            variant={variant}
          />
        ))
      }
      detailWidth={detailWidth}
      disabled={disabled}
      media={media}
      minHeight={minHeight}
      onPress={onPress}
      selected={selected}
    >
      <VStack justifyContent="center">
        {!!title && (
          <TextHeadline
            ellipsize="tail"
            numberOfLines={description || disableMultilineTitle ? 1 : 2}
          >
            {title}
          </TextHeadline>
        )}

        {!!description && (
          <TextBody
            color="fgMuted"
            ellipsize={multiline ? undefined : 'tail'}
            numberOfLines={multiline ? undefined : title ? 1 : 2}
          >
            {description}
          </TextBody>
        )}
      </VStack>
    </Cell>
  );
});
