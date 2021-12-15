import React, { ForwardedRef, forwardRef, memo, RefAttributes } from 'react';
import { ScaleDensity, SelectOptionBaseProps } from '@cbhq/cds-common/types';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { selectCellSpacingConfig } from '@cbhq/cds-common/tokens/cell';
import { Cell, overflowClassName } from '../cells/Cell';
import { VStack } from '../layout/VStack';
import { TextHeadline, TextBody } from '../typography';
import { CellAccessory } from '../cells/CellAccessory';
import { MenuItem, MenuItemProps } from '../overlays/MenuItem';

// I know this looks weird.. but I got syntax errors whenever I tried to inline this
type SelectOptionWebProps = Omit<SelectOptionBaseProps, 'selected'>;

export type SelectOptionProps = SelectOptionWebProps &
  Pick<MenuItemProps, 'value' | 'key' | 'onChange' | 'popoverMenuRef' | 'hideMenu' | 'selected'> &
  RefAttributes<HTMLElement>;

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
  forwardRef(
    (
      {
        title,
        description,
        multiline,
        selected,
        compact,
        value,
        key,
        onChange,
        popoverMenuRef,
        hideMenu,
        ...props
      }: SelectOptionProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const minHeight = useScaleConditional(
        compact ? selectOptionCompactMinHeight : selectOptionMinHeight,
      );
      const maxHeight = useScaleConditional(
        compact ? selectOptionCompactMaxHeight : selectOptionMaxHeight,
      );

      return (
        <MenuItem
          value={value}
          key={key}
          ref={ref}
          onChange={onChange}
          popoverMenuRef={popoverMenuRef}
          hideMenu={hideMenu}
          selected={selected}
        >
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
    },
  ),
);
