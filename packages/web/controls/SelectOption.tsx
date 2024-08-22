import React, { memo, RefAttributes, useCallback, useEffect, useRef } from 'react';
import { css } from 'linaria';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { selectCellSpacingConfig } from '@cbhq/cds-common/tokens/select';
import { ScaleDensity, SelectOptionBaseProps } from '@cbhq/cds-common/types';

import { Cell, overflowClassName } from '../cells/Cell';
import { CellAccessory } from '../cells/CellAccessory';
import { VStack } from '../layout/VStack';
import { insetFocusRing } from '../styles/focus';
import { visibility } from '../styles/visibility';
import { Pressable, PressableProps } from '../system';
import { borderRadius } from '../tokens';
import { TextBody, TextHeadline } from '../typography';
import { cx } from '../utils/linaria';

import { useSelectContext } from './selectContext';

export const selectOptionStaticClassName = 'cds-select-option';

const pressableStyles = css`
  /* overrides button defaults */
  padding: 0;
  /* overrides button defaults in safari */
  margin: 0;
  border: none;
  &:first-child {
    &:before {
      border-top-right-radius: ${borderRadius.roundedLarge};
      border-top-left-radius: ${borderRadius.roundedLarge};
    }
  }
  &:last-child {
    &:before {
      border-bottom-right-radius: ${borderRadius.roundedLarge};
      border-bottom-left-radius: ${borderRadius.roundedLarge};
    }
  }
  /* restrict text from overflow viewport, 95 to leave space for scrollbar */
  max-width: 95vw;
`;

export type SelectOptionProps = {
  /** Prevent menu from closing when an option is selected */
  disableCloseOnOptionChange?: boolean;
  /**
   * Necessary to control roving tabindex for accessibility
   * https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
   * */
  tabIndex?: number;
} & SelectOptionBaseProps &
  RefAttributes<HTMLElement> &
  Pick<PressableProps, 'onPress' | 'onKeyPress' | 'to'>;

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
  ({
    title,
    description,
    multiline,
    compact,
    value,
    disableCloseOnOptionChange,
    onPress,
    onKeyPress,
    tabIndex,
    accessibilityLabel,
    testID,
    disabled,
    ...props
  }: SelectOptionProps) => {
    const selectOptionRef = useRef<HTMLButtonElement | null>(null);

    const minHeight = useScaleConditional(
      compact ? selectOptionCompactMinHeight : selectOptionMinHeight,
    );
    const maxHeight = useScaleConditional(
      compact ? selectOptionCompactMaxHeight : selectOptionMaxHeight,
    );

    const { onChange, value: selectedValue, handleCloseMenu } = useSelectContext();
    const selected = selectedValue === value;

    useEffect(() => {
      if (selected) {
        selectOptionRef.current?.focus();
      }
    }, [selected]);

    const handleChange = useCallback(() => {
      onChange?.(value);
      // You can disable close on option change from either an individual SelectOption or globally through the Select or Dropdown components
      if (!disableCloseOnOptionChange) {
        handleCloseMenu?.();
      }
    }, [onChange, value, disableCloseOnOptionChange, handleCloseMenu]);

    const handlePress = useCallback(
      (event: React.MouseEvent) => {
        handleChange();
        onPress?.(event);
      },
      [onPress, handleChange],
    );

    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent) => {
        handleChange();
        onKeyPress?.(event);
      },
      [onKeyPress, handleChange],
    );

    return (
      <Pressable
        ref={selectOptionRef}
        noScaleOnPress
        accessibilityLabel={accessibilityLabel}
        background="background"
        className={cx(selectOptionStaticClassName, insetFocusRing, pressableStyles)}
        disabled={disabled}
        onKeyPress={handleKeyPress}
        onPress={handlePress}
        role="menuitem"
        tabIndex={tabIndex ?? -1} // default to -1 since this is a grouped control and the parent control will have tabIndex 0
        testID={testID}
      >
        <Cell
          {...selectCellSpacingConfig}
          accessory={
            <CellAccessory
              className={selected ? visibility.visible : visibility.hidden}
              type="selected"
            />
          }
          borderRadius="roundedNone"
          maxHeight={multiline ? undefined : maxHeight}
          minHeight={minHeight}
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
                className={multiline ? overflowClassName : undefined}
                color="foregroundMuted"
                overflow={multiline ? undefined : 'truncate'}
              >
                {description}
              </TextBody>
            )}
          </VStack>
        </Cell>
      </Pressable>
    );
  },
);
