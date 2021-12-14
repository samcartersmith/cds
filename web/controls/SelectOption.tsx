import React, { ForwardedRef, forwardRef, memo } from 'react';
import { SelectOptionBaseProps } from '@cbhq/cds-common/types';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { selectCellSpacingConfig } from '@cbhq/cds-common/tokens/cell';
import {
  selectOptionMinHeight,
  selectOptionMaxHeight,
  selectOptionCompactMinHeight,
  selectOptionCompactMaxHeight,
} from '@cbhq/cds-common/tokens/select';
import { Cell, overflowClassName } from '../cells/Cell';
import { VStack } from '../layout/VStack';
import { TextHeadline, TextBody } from '../typography';
import { CellAccessory } from '../cells/CellAccessory';

export const SelectOption = memo(
  forwardRef(
    (
      { title, description, multiline, selected, compact, ...props }: SelectOptionBaseProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const minHeight = useScaleConditional(
        compact ? selectOptionCompactMinHeight : selectOptionMinHeight,
      );
      const maxHeight = useScaleConditional(
        compact ? selectOptionCompactMaxHeight : selectOptionMaxHeight,
      );

      return (
        <Cell
          {...selectCellSpacingConfig}
          ref={ref}
          borderRadius="none"
          minHeight={minHeight}
          maxHeight={maxHeight}
          accessory={selected ? <CellAccessory type="selected" /> : undefined}
          selected={selected}
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
