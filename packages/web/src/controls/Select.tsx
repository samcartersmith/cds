import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { helperTextHeight, inputStackGap } from '@cbhq/cds-common/tokens/input';
import { SelectBaseProps } from '@cbhq/cds-common/types';

import { Dropdown } from '../dropdown/Dropdown';
import { DropdownProps } from '../dropdown/DropdownProps';
import { useSpacingValue } from '../hooks/useSpacingValue';
import { HStack } from '../layout/HStack';
import { PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';

import { TextInputFocusVariantContext } from './context';
import { SelectTrigger } from './SelectTrigger';
import { useRefocusTrigger } from './useRefocusTrigger';

export type SelectProps = {
  children: React.ReactNode;
} & SelectBaseProps &
  Pick<DropdownProps, 'disablePortal'>;

export const Select = memo(
  forwardRef(function Select(
    {
      children,
      value,
      valueLabel,
      variant = 'foregroundMuted',
      disabled = false,
      width = '100%',
      onPress,
      helperText,
      onChange,
      disablePortal,
      ...props
    }: SelectProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) {
    const [visible, toggleDropdownVisibility] = useToggler(false);
    const [menuHasClosed, toggleMenuHasClosed] = useToggler(false);
    const focusedVariant = useInputVariant(visible, variant);
    /** prevents animation from firing on mount */
    const [animationsEnabled, toggleAnimations] = useToggler(false);
    /** If the spacer height in InputStack between the helper text and the input changes, this value will need to change */
    const calculateInputStackGap = useSpacingValue(inputStackGap);
    const menuOffset = calculateInputStackGap + helperTextHeight;
    const triggerRef = useRefocusTrigger(menuHasClosed);

    const handleOnSelectPress = useCallback(() => {
      onPress?.();
      toggleAnimations.toggleOn();
    }, [onPress, toggleAnimations]);

    const onOpenMenu = useCallback(() => {
      toggleDropdownVisibility.toggleOn();
      // this makes sure if you open/close the menu more than once it'll work as expected
      if (menuHasClosed) {
        toggleMenuHasClosed.toggleOff();
      }
    }, [menuHasClosed, toggleDropdownVisibility, toggleMenuHasClosed]);
    const onCloseMenu = useCallback(() => {
      toggleDropdownVisibility.toggleOff();
      toggleMenuHasClosed.toggleOn();
    }, [toggleDropdownVisibility, toggleMenuHasClosed]);

    const refs = useMergedRef(ref, triggerRef);

    const trigger = useMemo(
      () => (
        <TextInputFocusVariantContext.Provider value={focusedVariant}>
          <SelectTrigger
            ref={refs}
            disabled={disabled}
            helperText={helperText}
            onPress={handleOnSelectPress}
            triggerHasFocus={visible}
            value={valueLabel ?? value}
            variant={variant}
            visible={animationsEnabled && visible}
            {...props}
          />
        </TextInputFocusVariantContext.Provider>
      ),
      [
        focusedVariant,
        disabled,
        valueLabel,
        value,
        variant,
        visible,
        handleOnSelectPress,
        refs,
        helperText,
        animationsEnabled,
        props,
      ],
    );

    const contentPosition: PopoverContentPositionConfig = useMemo(
      () => ({
        gap: 0.5,
        offsetGap: helperText ? menuOffset : undefined,
      }),
      [helperText, menuOffset],
    );

    return (
      <HStack width={width}>
        {disabled ? (
          trigger
        ) : (
          <Dropdown
            block
            content={children}
            contentPosition={contentPosition}
            disablePortal={disablePortal}
            // @ts-expect-error TODO: support string values for dimensions in layout components
            maxWidth="95vw"
            onChange={onChange}
            onCloseMenu={onCloseMenu}
            onOpenMenu={onOpenMenu}
            value={value}
            width={width}
          >
            {trigger}
          </Dropdown>
        )}
      </HStack>
    );
  }),
);
