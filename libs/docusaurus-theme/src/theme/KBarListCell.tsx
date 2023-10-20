import React, { ForwardedRef, forwardRef, memo } from 'react';
import KBarCellAccessory from '@theme/KBarCellAccessory';
import type { KBarListCellProps } from '@theme/KBarListCell';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { compactListHeight, listHeight } from '@cbhq/cds-common/tokens/cell';
import { Cell, overflowClassName } from '@cbhq/cds-web/cells/Cell';
import { CellDetail } from '@cbhq/cds-web/cells/CellDetail';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextBody } from '@cbhq/cds-web/typography/TextBody';
import { TextHeadline } from '@cbhq/cds-web/typography/TextHeadline';

const KBarListCell = memo(
  forwardRef(function KBarListCell(
    {
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
    }: KBarListCellProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    const minHeight = useScaleConditional(compact ? compactListHeight : listHeight);
    let end;

    if (action) {
      end = <Box justifyContent="flex-end">{action}</Box>;
    } else if (detail || subdetail) {
      end = <CellDetail detail={detail} subdetail={subdetail} variant={variant} />;
    }

    return (
      <Cell
        {...props}
        ref={ref}
        accessory={accessory ? <KBarCellAccessory>{accessory}</KBarCellAccessory> : undefined}
        detail={end}
        disabled={disabled}
        media={media}
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
              dangerouslySetClassName={multiline ? overflowClassName : undefined}
              overflow={multiline ? undefined : 'truncate'}
            >
              {description}
            </TextBody>
          )}
        </VStack>
      </Cell>
    );
  }),
);

export default KBarListCell;
