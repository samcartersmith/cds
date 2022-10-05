import React, {
  ForwardedRef,
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useToggler } from '@cbhq/cds-common';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { helperTextHeight, inputStackGap } from '@cbhq/cds-common/tokens/input';
import { FOCUSABLE_ELEMENTS } from '@cbhq/cds-common/tokens/overlays';
import { SelectBaseProps } from '@cbhq/cds-common/types';

import { useRotateAnimation } from '../animation/useRotateAnimation';
import { Dropdown } from '../dropdown/Dropdown';
import { useSpacingValue } from '../hooks/useSpacingValue';
import { HStack } from '../layout/HStack';
import { PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';
import { isBrowser } from '../utils/browser';

import { TextInputFocusVariantContext } from './context';
import { SelectTrigger } from './SelectTrigger';

export type SelectProps = {
  children: ReactNode;
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
      helperText,
      onChange,
      ...props
    }: SelectProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    const [visible, toggleDropdownVisibility] = useToggler(false);
    const [hasBeenInFocus, toggleHasBeenInFocus] = useToggler(false);
    const { rotateAnimationRef, animateClockwise, animateCounterClockwise } =
      useRotateAnimation(180);
    const focusedVariant = useInputVariant(visible, variant);
    /** prevents animation from firing on mount */
    const [animationsEnabled, toggleAnimations] = useToggler(false);
    /** If the spacer height in InputStack between the helper text and the input changes, this value will need to change */
    const calculateInputStackGap = useSpacingValue(inputStackGap);
    const menuOffset = calculateInputStackGap + helperTextHeight;

    const handleOnSelectPress = useCallback(() => {
      onPress?.();
      toggleAnimations.toggleOn();
    }, [onPress, toggleAnimations]);

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

    const onOpenMenu = useCallback(() => {
      if (!hasBeenInFocus) {
        toggleHasBeenInFocus.toggleOn();
      }
      toggleDropdownVisibility.toggleOn();
    }, [toggleDropdownVisibility, hasBeenInFocus, toggleHasBeenInFocus]);
    const onCloseMenu = useCallback(() => {
      toggleDropdownVisibility.toggleOff();
    }, [toggleDropdownVisibility]);

    const internalRef = useRef<HTMLButtonElement>(null);
    const refs = useMergedRef(ref, internalRef);

    const trigger = useMemo(
      () => (
        <TextInputFocusVariantContext.Provider value={focusedVariant}>
          <SelectTrigger
            disabled={disabled}
            rotateAnimationRef={rotateAnimationRef}
            value={valueLabel ?? value}
            variant={variant}
            triggerHasFocus={visible}
            onPress={handleOnSelectPress}
            ref={refs}
            helperText={helperText}
            {...props}
          />
        </TextInputFocusVariantContext.Provider>
      ),
      [
        disabled,
        focusedVariant,
        handleOnSelectPress,
        helperText,
        props,
        rotateAnimationRef,
        value,
        valueLabel,
        variant,
        visible,
        refs,
      ],
    );

    const contentPosition: PopoverContentPositionConfig = useMemo(
      () => ({
        gap: 0.5,
        offsetGap: helperText ? menuOffset : undefined,
      }),
      [helperText, menuOffset],
    );

    useEffect(() => {
      //  focuses the element after the menu opens & closes at least once
      if (
        hasBeenInFocus &&
        !visible &&
        isBrowser() &&
        internalRef &&
        typeof internalRef !== 'function'
      ) {
        const focusableElements = internalRef.current?.querySelectorAll(FOCUSABLE_ELEMENTS);

        if (focusableElements?.length && focusableElements[0]) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }, [visible, hasBeenInFocus, internalRef]);

    return (
      <HStack width={width}>
        {disabled ? (
          trigger
        ) : (
          <Dropdown
            content={children}
            value={value}
            width={width}
            contentPosition={contentPosition}
            block
            onChange={onChange}
            onOpenMenu={onOpenMenu}
            onCloseMenu={onCloseMenu}
          >
            {trigger}
          </Dropdown>
        )}
      </HStack>
    );
  }),
);
