import React, { memo, forwardRef, ForwardedRef, useCallback, ReactElement, useEffect } from 'react';
import { SelectBaseProps } from '@cbhq/cds-common/types';
import { useToggler } from '@cbhq/cds-common';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { TextInputFocusVariantContext } from './context';
import { LinkableProps } from '../system';
import { useRotate180Animation } from '../animation/useRotate180Animation';
import { SelectTrigger } from './SelectTrigger';
import { PopoverMenu } from '../overlays';
import { MenuItemProps } from '../overlays/PopoverMenu/MenuItem';
import { PopoverTriggerWrapper } from '../overlays/PopoverMenu/PopoverTriggerWrapper';
import { HStack } from '../layout/HStack';

export type SelectProps = {
  children: ReactElement<MenuItemProps & LinkableProps>[];
  /** Callback that is fired whenever a select option is selected */
  onChange?: (newValue: string) => void;
} & SelectBaseProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Select = memo(
  forwardRef(function Select(
    {
      children,
      value,
      variant = 'foregroundMuted',
      disabled = false,
      width = '100%',
      onPress,
      onChange,
      ...props
    }: SelectProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    const [visible, togglePopoverMenuVisibility] = useToggler(false);
    const [triggerHasFocus, toggleTriggerFocus] = useToggler(false);
    const [animationsEnabled, toggleAnimations] = useToggler(false);
    const { rotateAnimationRef } = useRotate180Animation(visible, animationsEnabled);
    const focusedVariant = useInputVariant(triggerHasFocus, variant);

    // this corrects for when value is initialized with an empty string, coerce it to undefined
    const sanitizedValue = value === '' ? undefined : value;

    // toggle focus animations for InputStack when menu is open
    useEffect(() => {
      if (visible) {
        toggleTriggerFocus.toggleOn();
      }
      // TODO: if !visible and menu was closed because an option was selected, toggleTriggerFocus.toggleOn();
    }, [visible, toggleTriggerFocus]);

    const handleBlur = useCallback(() => {
      toggleTriggerFocus.toggleOff();
    }, [toggleTriggerFocus]);

    const handleOnSelectPress = useCallback(() => {
      toggleAnimations.toggleOn();
      onPress?.();
      toggleTriggerFocus.toggleOn();
    }, [toggleTriggerFocus, toggleAnimations, onPress]);

    return (
      <HStack width={width}>
        <PopoverMenu
          value={value}
          onChange={onChange}
          visible={visible}
          openMenu={togglePopoverMenuVisibility.toggleOn}
          closeMenu={togglePopoverMenuVisibility.toggleOff}
          flush
          width="100%"
          onBlur={handleBlur}
        >
          <PopoverTriggerWrapper>
            <TextInputFocusVariantContext.Provider value={focusedVariant}>
              <SelectTrigger
                disabled={disabled}
                rotateAnimationRef={rotateAnimationRef}
                value={sanitizedValue}
                variant={variant}
                triggerHasFocus={triggerHasFocus}
                onPress={handleOnSelectPress}
                ref={ref}
                {...props}
              />
            </TextInputFocusVariantContext.Provider>
          </PopoverTriggerWrapper>
          {children}
        </PopoverMenu>
      </HStack>
    );
  }),
);
