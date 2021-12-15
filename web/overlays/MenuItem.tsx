import React, {
  memo,
  useCallback,
  KeyboardEvent,
  ReactElement,
  forwardRef,
  ForwardedRef,
} from 'react';
import { selectKeys } from '@cbhq/cds-common/tokens/menu';
import { NoopFn } from '@cbhq/cds-common';
import { cx } from 'linaria';
import { insetFocusRing } from '../styles/focus';
import { Pressable, PressableProps } from '../system/Pressable';

export const menuItemStaticClassName = 'cds-menu-item';

export type MenuItemProps = {
  children: ReactElement;
  /** automatically focus a select option if it's already been selected
   * Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement()
   */
  value: string;
  /**
   * Callback that is fired whenever a select option is selected
   * Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement()
   * */
  onChange?: (newValue: string) => void;
  /** Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement() */
  key?: string;
  /** This is passed in via React.cloneElement and is necessary to control option focus during keyboard interactions */
  popoverMenuRef?: React.MutableRefObject<HTMLElement | null>;
  /**
   * Necessary to control roving tabindex for accessibility
   * https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
   * */
  tabIndex?: number;
  /** Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement()
   * @danger this is for internal use only when a MenuItem is a child of a PopoverMenu. For custom handlers please use onPress
   */
  hideMenu?: NoopFn;
  /** Custom event handler for when a MenuItem is pressed */
  onPress?: NoopFn;
  /** Indicates whether option has been chosen already
   * Note: the value passed will be ignored on Web because PopoverMenu overrides it with React.cloneElement()
   * @default false
   */
  selected?: boolean;
} & PressableProps;

export const MenuItem = memo(
  forwardRef(
    (
      {
        selected = false,
        tabIndex,
        onChange,
        popoverMenuRef,
        hideMenu,
        value,
        children,
        onPress,
        ...props
      }: MenuItemProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const handleValueChange = useCallback(() => {
        hideMenu?.();
        onChange?.(value);
      }, [hideMenu, onChange, value]);

      const handleOnOptionSelectPress = useCallback(() => {
        handleValueChange();
        onPress?.();
      }, [handleValueChange, onPress]);

      const handleOnOptionSelectKeyDown = useCallback(
        (event: KeyboardEvent<HTMLElement>) => {
          event.stopPropagation();
          event.preventDefault();

          if (popoverMenuRef?.current) {
            const selectOptions = Array.from(
              popoverMenuRef.current?.getElementsByTagName('button'),
            );
            const focusedOption = document.activeElement as HTMLButtonElement;

            if (selectOptions) {
              // get index of current active element
              const focusedOptionIndex: number = focusedOption
                ? selectOptions.indexOf(focusedOption)
                : -1;

              if (selectKeys.includes(event.key)) {
                handleValueChange();
              } else if (event.key === 'Escape' || (event.shiftKey && event.key === 'Tab')) {
                hideMenu?.();
              } else if (event.key === 'ArrowUp') {
                if (focusedOptionIndex !== 0) {
                  // focus on the previous option
                  selectOptions[focusedOptionIndex - 1].focus();
                } else {
                  // if it's the first option, close the menu
                  hideMenu?.();
                }
              } else if (event.key === 'ArrowDown') {
                if (focusedOptionIndex !== selectOptions?.length - 1) {
                  // focus the next option
                  selectOptions[focusedOptionIndex + 1].focus();
                } else {
                  // if it's the last option, close the menu and allow focus to move to the next element
                  hideMenu?.();
                }
              } else if (event.key === 'Home') {
                selectOptions[0].focus();
              } else if (event.key === 'End') {
                selectOptions[selectOptions.length - 1].focus();
              } else if (event.key === 'Tab') {
                hideMenu?.();
              }
              // ignore all other events
            }
          }
        },
        [hideMenu, popoverMenuRef, handleValueChange],
      );

      return (
        <Pressable
          backgroundColor={selected ? 'backgroundAlternate' : 'background'}
          ref={ref}
          noScaleOnPress
          onPress={handleOnOptionSelectPress}
          onKeyDown={handleOnOptionSelectKeyDown}
          tabIndex={selected ? 0 : tabIndex ?? -1}
          role="menuitem"
          className={cx(menuItemStaticClassName, insetFocusRing)}
          {...props}
        >
          {children}
        </Pressable>
      );
    },
  ),
);
