import React, { memo } from 'react';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { selectCellMobileSpacingConfig } from '@cbhq/cds-common/tokens/cell';
import { ScaleDensity, SelectOptionBaseProps } from '@cbhq/cds-common/types';

import { Cell } from '../cells/Cell';
import { CellAccessory } from '../cells/CellAccessory';
import { VStack } from '../layout/VStack';
import { LinkableProps } from '../system';
import { TextBody, TextHeadline } from '../typography';

const selectOptionMinHeight: Record<ScaleDensity, number> = {
  normal: 56,
  dense: 53,
};

const selectOptionMaxHeight: Record<ScaleDensity, number> = {
  normal: 64,
  dense: 56,
};

export type SelectOptionProps = Omit<SelectOptionBaseProps, 'compact'> & LinkableProps;

export const SelectOption = memo(
  ({ title, description, multiline, selected, ...props }: SelectOptionProps) => {
    const minHeight = useScaleConditional(selectOptionMinHeight);
    const maxHeight = useScaleConditional(selectOptionMaxHeight);
    return (
      <Cell
        {...selectCellMobileSpacingConfig}
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
