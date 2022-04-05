import React, { ForwardedRef, forwardRef, memo, RefAttributes } from 'react';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { selectCellSpacingConfig } from '@cbhq/cds-common/tokens/select';
import { ScaleDensity, SelectOptionBaseProps } from '@cbhq/cds-common/types';

import { Cell, overflowClassName } from '../cells/Cell';
import { CellAccessory } from '../cells/CellAccessory';
import { VStack } from '../layout/VStack';
import { MenuItem } from '../overlays/PopoverMenu/MenuItem';
import { usePopoverContext } from '../overlays/PopoverMenu/PopoverContext';
import { TextBody, TextHeadline } from '../typography';

export type SelectOptionProps = SelectOptionBaseProps & RefAttributes<HTMLElement>;

const selectOptionMinHeight: Record<ScaleDensity, number> = {
  normal: 48,
  dense: 44,
};
const selectOptionMaxHeight: Record<ScaleDensity, number> = {
  normal: 64,
  dense: 56,
};
const selectOptionCompactMinHeight: Record<ScaleDensity, number> = {
  normal: 40,
  dense: 40,
};
const selectOptionCompactMaxHeight: Record<ScaleDensity, number> = {
  normal: 56,
  dense: 48,
};

export const SelectOption = memo(
  forwardRef(function SelectOption(
    { title, description, multiline, compact, value, ...props }: SelectOptionProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    const minHeight = useScaleConditional(
      compact ? selectOptionCompactMinHeight : selectOptionMinHeight,
    );
    const maxHeight = useScaleConditional(
      compact ? selectOptionCompactMaxHeight : selectOptionMaxHeight,
    );

    const { sanitizedValue } = usePopoverContext();
    const selected = value === sanitizedValue;

    return (
      <MenuItem value={value} ref={ref}>
        <Cell
          {...selectCellSpacingConfig}
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
      </MenuItem>
    );
  }),
);
