import React, { memo, useCallback, KeyboardEvent, ReactElement, forwardRef } from 'react';
import { selectKeys } from '@cbhq/cds-common/tokens/menu';
import { ForwardedRef, NoopFn } from '@cbhq/cds-common';
import { css } from 'linaria';
import { cx } from '../../utils/linaria';
import { insetFocusRing } from '../../styles/focus';
import { Pressable, PressableProps } from '../../system/Pressable';
import { usePopoverContext } from './PopoverContext';

export const menuItemStaticClassName = 'cds-menu-item';

const pressableStyles = css`
  /* overrides button defaults */
  padding: 0;
  /* overrides button defaults in safari */
  margin: 0;
  border: none;
`;

export type MenuItemProps = {
  children: ReactElement;
  /** automatically focus a select option if it's already been selected */
  value: string;
  /**
   * Necessary to control roving tabindex for accessibility
   * https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
   * */
  tabIndex?: number;
  /** Custom event handler for when a MenuItem is pressed */
  onPress?: NoopFn;
} & PressableProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const MenuItem = memo(
  forwardRef(function MenuItem(
    { tabIndex, children, onPress, value, ...props }: MenuItemProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    const {
      sanitizedValue: selectedValue,
      onChange,
      selectOptionRef,
      popoverMenuRef,
      handleExitMenu,
      handlePopoverMenuBlur,
    } = usePopoverContext();

    const selected = value === selectedValue;

    const handleOptionChange = useCallback(
      (newValue: string) => {
        onChange?.(newValue);
        // this is a hack for Safari to prevent blur from being called on option click
        selectOptionRef.current?.focus();
        handleExitMenu();
      },
      [onChange, handleExitMenu, selectOptionRef],
    );

    const handleOnOptionSelectPress = useCallback(() => {
      handleOptionChange(value);
      onPress?.();
    }, [handleOptionChange, onPress, value]);

    const handleOnOptionSelectKeyDown = useCallback(
      (event: KeyboardEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if (popoverMenuRef?.current) {
          const selectOptions = Array.from(popoverMenuRef.current?.getElementsByTagName('button'));
          const focusedOption = document.activeElement as HTMLButtonElement;

          if (selectOptions) {
            // get index of current active element
            const focusedOptionIndex: number = focusedOption
              ? selectOptions.indexOf(focusedOption)
              : -1;

            if (selectKeys.includes(event.key)) {
              handleOptionChange(value);
            } else if (event.key === 'Escape' || (event.shiftKey && event.key === 'Tab')) {
              handleExitMenu();
            } else if (event.key === 'ArrowUp') {
              if (focusedOptionIndex !== 0) {
                // focus on the previous option
                selectOptions[focusedOptionIndex - 1].focus();
              } else {
                // if it's the first option, close the menu
                handleExitMenu();
              }
            } else if (event.key === 'ArrowDown') {
              if (focusedOptionIndex !== selectOptions?.length - 1) {
                // focus the next option
                selectOptions[focusedOptionIndex + 1].focus();
              } else {
                // if it's the last option, close the menu and allow focus to move to the next element
                handleExitMenu();
              }
            } else if (event.key === 'Home') {
              selectOptions[0].focus();
            } else if (event.key === 'End') {
              selectOptions[selectOptions.length - 1].focus();
            } else if (event.key === 'Tab') {
              handleExitMenu();
            }
            // ignore all other events
          }
        }
      },
      [handleExitMenu, popoverMenuRef, value, handleOptionChange],
    );

    return (
      <Pressable
        backgroundColor={selected ? 'backgroundAlternate' : 'background'}
        ref={selected ? selectOptionRef : ref}
        noScaleOnPress
        onPress={handleOnOptionSelectPress}
        onKeyDown={handleOnOptionSelectKeyDown}
        tabIndex={selected ? 0 : tabIndex ?? -1}
        role="menuitem"
        className={cx(menuItemStaticClassName, insetFocusRing, pressableStyles)}
        onBlur={handlePopoverMenuBlur}
        {...props}
      >
        {children}
      </Pressable>
    );
  }),
);
