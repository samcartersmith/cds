import React, { isValidElement, memo, useMemo } from 'react';
import { ListCellBaseProps } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { compactListHeight, listHeight } from '@cbhq/cds-common/tokens/cell';

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
  media,
  multiline,
  selected,
  subdetail,
  variant,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  ...props
}: ListCellProps) {
  const minHeight = useScaleConditional(compact ? compactListHeight : listHeight);
  const accessoryType = selected ? 'selected' : accessory;
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const hasDetails = Boolean(detail || subdetail);

  // Obtain accessibility props
  // The accessibilityLabel will default to title. The accessibilityHint will
  // default to detail. If detail does not exist, it will default to subdetail
  const accessibilityProps = useMemo(() => {
    const detailIsStr = typeof detail === 'string';
    const subdetailIsStr = typeof subdetail === 'string';

    const subdetailOrDetail = () => {
      if (detailIsStr) return detail;

      if (subdetailIsStr) return subdetail;

      return undefined;
    };

    return {
      accessibilityLabel: typeof title === 'string' ? title : accessibilityLabel,
      accessibilityHint: hasDetails ? subdetailOrDetail() : accessibilityHint,
    };
  }, [accessibilityHint, accessibilityLabel, detail, hasDetails, subdetail, title]);

  return (
    <Cell
      {...props}
      accessory={accessoryType ? <CellAccessory type={accessoryType} /> : undefined}
      compact={compact}
      detail={
        action ||
        (hasDetails && (
          <CellDetail
            // eslint-disable-next-line react/forbid-component-props
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
      {...accessibilityProps}
    >
      <VStack justifyContent="center">
        {isValidElement(title) ? (
          title
        ) : (
          <TextHeadline
            numberOfLines={description || disableMultilineTitle ? 1 : 2}
            ellipsize="tail"
          >
            {title}
          </TextHeadline>
        )}

        {isValidElement(description) ? (
          description
        ) : (
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
