import React, { memo, useCallback, useMemo } from 'react';
import { GestureResponderEvent } from 'react-native';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { selectCellMobileSpacingConfig } from '@cbhq/cds-common/tokens/select';
import {
  NoopFn,
  ScaleDensity,
  SelectOptionBaseProps,
  SharedAccessibilityProps,
} from '@cbhq/cds-common/types';

import { Cell } from '../cells/Cell';
import { CellAccessory } from '../cells/CellAccessory';
import { VStack } from '../layout/VStack';
import { TextBody, TextHeadline } from '../typography';

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
} & Omit<SelectOptionBaseProps, 'compact'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>;

export const SelectOption = memo(function SelectOption({
  title,
  description,
  multiline,
  onPress,
  value,
  accessibilityLabel,
  accessibilityHint,
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

  const accessibilityProps = useMemo(
    () => ({
      accessibilityLabel:
        typeof title === 'string' && accessibilityLabel === undefined ? title : accessibilityLabel,
      accessibilityHint:
        typeof description === 'string' && accessibilityHint === undefined
          ? description
          : accessibilityHint,
    }),
    [title, description, accessibilityLabel, accessibilityHint],
  );

  return (
    <Cell
      {...selectCellMobileSpacingConfig}
      borderRadius="none"
      minHeight={minHeight}
      maxHeight={multiline ? undefined : maxHeight}
      accessory={selected ? <CellAccessory type="selected" /> : undefined}
      selected={selected}
      accessibilityLabel={accessibilityProps.accessibilityLabel}
      accessibilityHint={accessibilityProps.accessibilityHint}
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

SelectOption.displayName = 'SelectOption';
