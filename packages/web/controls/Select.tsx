import React, { ForwardedRef, forwardRef, memo, ReactElement, useCallback, useEffect } from 'react';
import { useToggler } from '@cbhq/cds-common';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { SelectBaseProps } from '@cbhq/cds-common/types';

import { useRotateAnimation } from '../animation/useRotateAnimation';
import { HStack } from '../layout/HStack';
import { PopoverMenu } from '../overlays';
import { MenuItemProps } from '../overlays/PopoverMenu/MenuItem';
import { PopoverTriggerWrapper } from '../overlays/PopoverMenu/PopoverTriggerWrapper';
import { LinkableProps } from '../system';

import { TextInputFocusVariantContext } from './context';
import { SelectTrigger } from './SelectTrigger';

export type SelectProps = {
  children: ReactElement<MenuItemProps & LinkableProps>[];
} & SelectBaseProps;

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
      onChange,
      ...props
    }: SelectProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    const [visible, togglePopoverMenuVisibility] = useToggler(false);
    const [triggerHasFocus, toggleTriggerFocus] = useToggler(false);
    const { rotateAnimationRef, animateClockwise, animateCounterClockwise } =
      useRotateAnimation(180);
    const focusedVariant = useInputVariant(triggerHasFocus, variant);
    /** prevents animation from firing on mount */
    const [animationsEnabled, toggleAnimations] = useToggler(false);

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
      onPress?.();
      toggleAnimations.toggleOn();
      toggleTriggerFocus.toggleOn();
    }, [toggleTriggerFocus, onPress, toggleAnimations]);

    useEffect(() => {
      if (!animationsEnabled) {
        return;
      }
      if (visible) {
        void animateClockwise();
      } else {
        void animateCounterClockwise();
      }
    }, [animateClockwise, animateCounterClockwise, visible, animationsEnabled]);

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
                value={valueLabel ?? sanitizedValue}
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
