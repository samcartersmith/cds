import React, { useEffect, memo, forwardRef, ForwardedRef, useCallback, ReactElement } from 'react';
import { SelectBaseProps } from '@cbhq/cds-common/types';
import { useToggler } from '@cbhq/cds-common';
import { LinkableProps } from '../system';
import { useRotate180Animation } from '../animation/useRotate180Animation';
import { SelectTrigger } from './SelectTrigger';
import { PopoverMenu } from '../overlays/PopoverMenu/PopoverMenu';
import { MenuItemProps } from '../overlays/MenuItem';
import { PopoverTriggerWrapper } from '../overlays/PopoverMenu/PopoverTriggerWrapper';
import { HStack } from '../layout/HStack';

export type SelectProps = {
  children: ReactElement<MenuItemProps & LinkableProps>[];
  /** Callback that is fired whenever a select option is selected */
  onChange?: (newValue: string) => void;
} & SelectBaseProps;

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
    const { rotateAnimationRef, animateCaretIn, animateCaretOut } = useRotate180Animation();

    // this corrects for when value is initialized with an empty string, coerce it to undefined
    const sanitizedValue = value === '' ? undefined : value;

    // toggle focus animations for InputStack and caret whether menu is open or not
    useEffect(() => {
      if (visible) {
        toggleTriggerFocus.toggleOn();
        void animateCaretIn();
      } else {
        toggleTriggerFocus.toggleOff();
        void animateCaretOut();
      }
    }, [animateCaretIn, animateCaretOut, visible, toggleTriggerFocus]);

    const handleOnSelectPress = useCallback(() => {
      onPress?.();
      toggleTriggerFocus.toggleOn();
    }, [toggleTriggerFocus, onPress]);

    return (
      <HStack width={width}>
        <PopoverMenu
          value={value}
          onChange={onChange}
          visible={visible}
          openMenu={togglePopoverMenuVisibility.toggleOn}
          closeMenu={togglePopoverMenuVisibility.toggleOff}
          flush
        >
          <PopoverTriggerWrapper>
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
          </PopoverTriggerWrapper>
          {children}
        </PopoverMenu>
      </HStack>
    );
  }),
);
