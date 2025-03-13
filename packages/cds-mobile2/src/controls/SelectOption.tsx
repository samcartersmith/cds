import React, { memo, useCallback, useMemo } from 'react';
import { GestureResponderEvent } from 'react-native';
import { selectCellMobileSpacingConfig } from '@cbhq/cds-common2/tokens/select';
import { SelectOptionBaseProps, SharedAccessibilityProps } from '@cbhq/cds-common2/types';

import { Cell } from '../cells/Cell';
import { CellAccessory } from '../cells/CellAccessory';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { useSelectContext } from './SelectContext';

const selectOptionMinHeight = 56;

const selectOptionMaxHeight = 64;

export type SelectOptionProps = {
  onPress?: (() => void) | ((event: GestureResponderEvent) => void);
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
  const { value: selectedValue, onChange, handleClose } = useSelectContext();

  const selected = value === selectedValue;

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      onChange?.(value);
      handleClose?.();
    },
    [onPress, onChange, value, handleClose],
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
      accessibilityHint={accessibilityProps.accessibilityHint}
      accessibilityLabel={accessibilityProps.accessibilityLabel}
      accessory={selected ? <CellAccessory type="selected" /> : undefined}
      borderRadius={0}
      maxHeight={multiline ? undefined : selectOptionMaxHeight}
      minHeight={selectOptionMinHeight}
      onPress={handlePress}
      selected={selected}
      {...props}
    >
      <VStack justifyContent="center">
        {!!title && (
          <Text font="headline" ellipsize="tail" numberOfLines={description ? 1 : 2}>
            {title}
          </Text>
        )}

        {!!description && (
          <Text
            color="fgMuted"
            ellipsize={multiline ? undefined : 'tail'}
            numberOfLines={multiline ? undefined : title ? 1 : 2}
          >
            {description}
          </Text>
        )}
      </VStack>
    </Cell>
  );
});

SelectOption.displayName = 'SelectOption';
