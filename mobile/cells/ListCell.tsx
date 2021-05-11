import React, { memo } from 'react';

import { useScaleDensity } from '@cbhq/cds-common';
import { listHeight } from '@cbhq/cds-common/tokens/cell';

import { VStack } from '../layout/VStack';
import { TextHeadline, TextBody } from '../typography';
import { Cell, CellCommonProps } from './Cell';
import { CellAccessory, CellAccessoryType } from './CellAccessory';
import { CellDetail, CellDetailProps } from './CellDetail';

export interface ListCellProps extends CellCommonProps, CellDetailProps {
  /** Accessory to display at the end of the cell. */
  accessory?: CellAccessoryType;
  /** Interactive action, like a CTA or form element. Cannot be used alongside `onPress`. */
  action?: NonNullable<React.ReactNode>;
  /** Description of content. Max 1-2 lines, otherwise will truncate. */
  description?: NonNullable<React.ReactNode>;
  /** Title of content. Max 1-2 lines, otherwise will truncate. */
  title?: NonNullable<React.ReactNode>;
}

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
  onPress,
  ...props
}: ListCellProps) {
  if (process.env.NODE_ENV !== 'production' && onPress && action) {
    console.error(
      'ListCell: Cannot use `onPress` and `action` together. Unable to nest pressables.'
    );
  }

  const scaleDensity = useScaleDensity();
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
      minHeight={listHeight[scaleDensity]}
      selected={selected}
      onPress={onPress}
    >
      <VStack justifyContent="center">
        {title && (
          <TextHeadline numberOfLines={description ? 1 : 2} ellipsize="tail">
            {title}
          </TextHeadline>
        )}

        {description && (
          <TextBody numberOfLines={title ? 1 : 2} ellipsize="tail">
            {description}
          </TextBody>
        )}
      </VStack>
    </Cell>
  );
});
