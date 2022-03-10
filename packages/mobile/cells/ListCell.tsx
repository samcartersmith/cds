import React, { memo } from 'react';

import { ListCellBaseProps } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';

import { listHeight, compactListHeight } from '@cbhq/cds-common/tokens/cell';
import { VStack } from '../layout/VStack';
import { TextHeadline, TextBody } from '../typography';
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
  media,
  multiline,
  selected,
  subdetail,
  variant,
  onPress,
  ...props
}: ListCellProps) {
  const minHeight = useScaleConditional(compact ? compactListHeight : listHeight);
  const accessoryType = selected ? 'selected' : accessory;
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
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
      media={media}
      disabled={disabled}
      minHeight={minHeight}
      selected={selected}
      onPress={onPress}
    >
      <VStack justifyContent="center">
        {!!title && (
          <TextHeadline
            numberOfLines={description || disableMultilineTitle ? 1 : 2}
            ellipsize="tail"
          >
            {title}
          </TextHeadline>
        )}

        {!!description && (
          <TextBody
            color="foregroundMuted"
            // eslint-disable-next-line no-nested-ternary
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
