import React, {
  cloneElement,
  ForwardedRef,
  forwardRef,
  useMemo,
  memo,
  useRef,
  useCallback,
  useEffect,
  ReactElement,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { css, cx } from 'linaria';
import { menuGutter } from '@cbhq/cds-common/tokens/menu';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { MenuBaseProps } from '@cbhq/cds-common/types';
import {
  selectInputMenuMaxHeight,
  inputStackLabelHeight,
  selectKeys,
} from '@cbhq/cds-common/tokens/selectInput';
import { VStack } from '../../layout/VStack';
import { SelectOptionCellProps } from '../../cells/SelectOptionCell';
import { LinkableProps } from '../../system';
import { cellStaticClassName } from '../../cells/Cell';

export const menuStaticClassName = 'cds-menu';

// TODO: figure out how to inset the focus ring on Cell
// the first and last Cells should have rounded borders where they meet the edge of the container
const menuContainer = css`
  &.${menuStaticClassName} {
    z-index: 1;

    .${cellStaticClassName} {
      position: relative;
    }
  }
`;

type MenuProps = {
  children: ReactElement<SelectOptionCellProps & LinkableProps>[];
} & MenuBaseProps;

export const Menu = memo(
  forwardRef(
    (
      {
        children,
        parentRef,
        offsetConfig,
        onChange,
        value,
        dismissMenu,
        triggerRef,
        width,
      }: MenuProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const selectOptionRef = useRef<HTMLElement | null>(null);
      const defaultMenuRef = useRef<HTMLElement | null>(null);
      const menuRef = (ref as React.MutableRefObject<HTMLElement | null>) ?? defaultMenuRef;

      // this is needed to calculate the position of the Menu (parent height + menuGutter)
      const parentHeight = useMemo(() => parentRef?.current?.offsetHeight ?? 0, [parentRef]);
      // When Menu is used with a SelectInput as a trigger, we need to calculate Menu offset based on presence of nodes in the SelectInput
      const labelHeight = useScaleConditional(inputStackLabelHeight);
      const parentHeightWithOffsets = useMemo(
        () =>
          offsetConfig?.label && !offsetConfig?.compact ? parentHeight + labelHeight : parentHeight,
        [offsetConfig, parentHeight, labelHeight],
      );
      // this is for when you use the Menu with a Dropdown
      const triggerHeight = useMemo(() => triggerRef?.current?.offsetHeight ?? 0, [triggerRef]);

      // when menu is opened, focuses already selected option or first option
      useEffect(() => {
        if (selectOptionRef.current) {
          const focusableSelectOption = selectOptionRef.current.getElementsByTagName('button')[0];
          focusableSelectOption.focus();
        } else if (menuRef.current) {
          const selectOptions = Array.from(menuRef.current?.getElementsByTagName('button'));
          selectOptions[0].focus();
        }
      }, [menuRef]);

      const handleOnOptionSelectPress = useCallback(
        (event: MouseEvent<HTMLElement>, newValue: string) => {
          // prevent parent select input trigger events from firing on select option cell events
          event.stopPropagation();
          onChange?.(newValue);
          dismissMenu();
        },
        [onChange, dismissMenu],
      );

      const handleOnOptionSelectKeyDown = useCallback(
        (event: KeyboardEvent<HTMLElement>, newValue: string) => {
          event.stopPropagation();
          event.preventDefault();

          if (menuRef.current) {
            const selectOptions = Array.from(menuRef.current?.getElementsByTagName('button'));
            const focusedOption = document.activeElement as HTMLButtonElement;

            if (selectOptions) {
              // get index of current active element
              const focusedOptionIndex: number = focusedOption
                ? selectOptions.indexOf(focusedOption)
                : -1;

              if (selectKeys.includes(event.key)) {
                // prevent parent select input trigger events from firing on select option cell events
                onChange?.(newValue);
                dismissMenu();
                triggerRef?.current?.focus();
              } else if (event.key === 'Escape' || (event.shiftKey && event.key === 'Tab')) {
                dismissMenu();
                triggerRef?.current?.focus();
              } else if (event.key === 'ArrowUp') {
                if (focusedOptionIndex !== 0) {
                  // focus on the previous option
                  selectOptions[focusedOptionIndex - 1].focus();
                } else {
                  // if it's the first option, close the menu
                  dismissMenu();
                  triggerRef?.current?.focus();
                }
              } else if (event.key === 'ArrowDown') {
                if (focusedOptionIndex !== selectOptions?.length - 1) {
                  // focus the next option
                  selectOptions[focusedOptionIndex + 1].focus();
                } else {
                  // if it's the last option, close the menu and allow focus to move to the next element
                  dismissMenu();
                }
              } else if (event.key === 'Home') {
                selectOptions[0].focus();
              } else if (event.key === 'End') {
                selectOptions[selectOptions.length - 1].focus();
              } else if (event.key === 'Tab') {
                dismissMenu();
              }
              // ignore all other events
            }
          }
        },
        [onChange, dismissMenu, triggerRef, menuRef],
      );

      const renderSelectOptionCell = useCallback(
        (child: ReactElement<SelectOptionCellProps & LinkableProps>) => {
          return cloneElement(child, {
            onPress: (event: MouseEvent<HTMLElement>) =>
              handleOnOptionSelectPress(event, child.props.value),
            onKeyDown: (event: KeyboardEvent<HTMLElement>) =>
              handleOnOptionSelectKeyDown(event, child.props.value),
            key: child.props.value.toString(),
            selected: child.props.value === value,
            ref: (node: HTMLElement) => {
              if (node && child.props.value === value) {
                selectOptionRef.current = node;
              }
            },
          });
        },
        [handleOnOptionSelectPress, value, handleOnOptionSelectKeyDown],
      );

      return (
        <VStack
          ref={menuRef}
          background
          dangerouslySetClassName={cx(menuContainer, menuStaticClassName)}
          top={parentHeight ? parentHeightWithOffsets + menuGutter : triggerHeight + menuGutter}
          position="absolute"
          width={width ?? '100%'}
          elevation={2}
          borderRadius="standard"
          maxHeight={selectInputMenuMaxHeight}
          overflow="scroll"
        >
          {children.map(renderSelectOptionCell)}
        </VStack>
      );
    },
  ),
);
