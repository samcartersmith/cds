import React, { memo } from 'react';
import { SelectOptionBaseProps } from '@cbhq/cds-common/types';
import { selectCellSpacingConfig } from '@cbhq/cds-common/tokens/cell';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import {
  selectOptionMinHeight,
  selectOptionMaxHeight,
  selectOptionCompactMinHeight,
  selectOptionCompactMaxHeight,
} from '@cbhq/cds-common/tokens/select';
import { LinkableProps } from '../system';
import { Cell } from '../cells/Cell';
import { VStack } from '../layout/VStack';
import { CellAccessory } from '../cells/CellAccessory';
import { TextHeadline, TextBody } from '../typography';

export type SelectOptionProps = SelectOptionBaseProps & LinkableProps;

export const SelectOption = memo(
  ({ title, description, multiline, compact, selected, ...props }: SelectOptionProps) => {
    const minHeight = useScaleConditional(
      compact ? selectOptionCompactMinHeight : selectOptionMinHeight,
    );
    const maxHeight = useScaleConditional(
      compact ? selectOptionCompactMaxHeight : selectOptionMaxHeight,
    );
    return (
      <Cell
        {...selectCellSpacingConfig}
        borderRadius="none"
        minHeight={minHeight}
        maxHeight={maxHeight}
        accessory={selected ? <CellAccessory type="selected" /> : undefined}
        selected={selected}
        {...props}
      >
        <VStack justifyContent="center">
          {!!title && (
            <TextHeadline numberOfLines={description ? 1 : 2} ellipsize="tail">
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
  },
);
