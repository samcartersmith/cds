import React, { useCallback, memo } from 'react';
import { NoopFn, ScaleDensity, SelectOptionBaseProps } from '@cbhq/cds-common/types';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { selectCellMobileSpacingConfig } from '@cbhq/cds-common/tokens/cell';
import { GestureResponderEvent } from 'react-native';
import { Cell } from '../cells/Cell';
import { VStack } from '../layout/VStack';
import { CellAccessory } from '../cells/CellAccessory';
import { TextHeadline, TextBody } from '../typography';
import { useSelectContext } from './SelectContext';

const selectOptionMinHeight: Record<ScaleDensity, number> = {
  normal: 56,
  dense: 53,
};

const selectOptionMaxHeight: Record<ScaleDensity, number> = {
  normal: 64,
  dense: 56,
};

export type SelectOptionProps = {
  onPress?: NoopFn | ((event: GestureResponderEvent) => void);
} & Omit<SelectOptionBaseProps, 'compact'>;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const SelectOption = memo(function SelectOption({
  title,
  description,
  multiline,
  onPress,
  value,
  ...props
}: SelectOptionProps) {
  const minHeight = useScaleConditional(selectOptionMinHeight);
  const maxHeight = useScaleConditional(selectOptionMaxHeight);
  const { value: selectedValue, onChange } = useSelectContext();

  const selected = value === selectedValue;

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      onChange?.(value);
    },
    [onPress, onChange, value],
  );
  return (
    <Cell
      {...selectCellMobileSpacingConfig}
      borderRadius="none"
      minHeight={minHeight}
      maxHeight={maxHeight}
      accessory={selected ? <CellAccessory type="selected" /> : undefined}
      selected={selected}
      onPress={handlePress}
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
});
