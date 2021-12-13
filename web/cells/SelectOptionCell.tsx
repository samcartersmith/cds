import React, { ForwardedRef, forwardRef, memo } from 'react';
import { SelectOptionCellBaseProps } from '@cbhq/cds-common/types';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import {
  listHeight,
  compactListHeight,
  selectCellSpacingConfig,
} from '@cbhq/cds-common/tokens/cell';
import { Cell, overflowClassName } from './Cell';
import { VStack } from '../layout/VStack';
import { TextHeadline, TextBody } from '../typography';
import { CellAccessory } from './CellAccessory';

export const SelectOptionCell = memo(
  forwardRef(
    (
      { title, description, multiline, selected, compact, ...props }: SelectOptionCellBaseProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const minHeight = useScaleConditional(compact ? compactListHeight : listHeight);

      return (
        <Cell
          {...selectCellSpacingConfig}
          ref={ref}
          borderRadius="none"
          minHeight={minHeight}
          accessory={selected ? <CellAccessory type="selected" /> : undefined}
          {...props}
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
                overflow={multiline ? undefined : 'truncate'}
                dangerouslySetClassName={multiline ? overflowClassName : undefined}
              >
                {description}
              </TextBody>
            )}
          </VStack>
        </Cell>
      );
    },
  ),
);
