import React, { memo } from 'react';
import { ListCellBaseProps } from '@cbhq/cds-common2';
import { compactListHeight, listHeight } from '@cbhq/cds-common2/tokens/cell';

import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { Cell, type CellProps } from './Cell';
import { CellAccessory } from './CellAccessory';
import { CellDetail } from './CellDetail';

export type ListCellProps = Omit<CellProps, 'accessory' | 'children'> &
  ListCellBaseProps & {
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
  intermediary,
  priority,
  innerSpacing,
  outerSpacing,
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
      innerSpacing={innerSpacing}
      intermediary={intermediary}
      media={media}
      minHeight={minHeight}
      onPress={onPress}
      outerSpacing={outerSpacing}
      priority={priority}
      selected={selected}
      {...props}
    >
      <VStack justifyContent="center">
        {!!title && (
          <Text
            ellipsize="tail"
            font="headline"
            numberOfLines={description || disableMultilineTitle ? 1 : 2}
          >
            {title}
          </Text>
        )}

        {!!description && (
          <Text
            color="fgMuted"
            ellipsize={multiline ? undefined : 'tail'}
            font="body"
            numberOfLines={multiline ? undefined : title ? 1 : 2}
          >
            {description}
          </Text>
        )}
      </VStack>
    </Cell>
  );
});
