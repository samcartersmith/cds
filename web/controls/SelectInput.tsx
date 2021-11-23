import React, {
  useEffect,
  useRef,
  memo,
  useMemo,
  forwardRef,
  ForwardedRef,
  useCallback,
  cloneElement,
  ReactElement,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import { SelectInputBaseProps } from '@cbhq/cds-common/types';
import { useToggler } from '@cbhq/cds-common';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { css } from 'linaria';
import { InputStack } from './InputStack';
import { LinkableProps, PressableOpacity } from '../system';
import { SelectOptionCellProps } from '../cells/SelectOptionCell';
import { HStack } from '../layout/HStack';
import { InputLabel } from './InputLabel';
import { TextBody } from '../typography/TextBody';
import { TextInputFocusVariantContext } from './context';
import { InputIcon } from './InputIcon';
import { HelperText } from './HelperText';
import { Menu } from '../overlays/Menu/Menu';
import { useRotate180Animation } from '../animation/useRotate180Animation';

export type SelectInputProps = {
  children: ReactElement<SelectOptionCellProps & LinkableProps>[];
  /** Callback that is fired whenever a select option is selected */
  onChange?: (newValue: string) => void;
} & SelectInputBaseProps;

/* Increase specificity to guarantee these override pressable styles  */
const selectTrigger = css`
  && {
    &:focus-within:before {
      border: none;
    }
    :focus-visible {
      outline: none;
    }
`;

const selectKeys = [' ', 'Spacebar', 'Enter'];

export const SelectInput = memo(
  forwardRef(function SelectInput(
    {
      children,
      placeholder,
      label,
      helperText,
      value,
      variant = 'foregroundMuted',
      disabled = false,
      testID,
      width = 100,
      compact,
      onPress,
      onChange,
      ...props
    }: SelectInputProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    const [focused, toggleFocused] = useToggler(false);
    const [isMenuOpened, toggleMenu] = useToggler(false);
    const { rotateAnimationRef, animateCaretIn, animateCaretOut } = useRotate180Animation();
    const variantWithFocus = useInputVariant(focused, variant);

    const menuRef = useRef<HTMLElement | null>(null);
    const selectOptionRef = useRef<HTMLElement | null>(null);
    const defaultSelectInputTriggerRef = useRef<HTMLElement | null>(null);
    const selectInputTriggerRef =
      (ref as React.MutableRefObject<HTMLElement | null>) ?? defaultSelectInputTriggerRef;
    const inputStackRef = useRef<HTMLElement | null>(null);

    const labelTextColor = 'foregroundMuted';
    const menuOffsetConfig = useMemo(() => {
      return {
        label: !!label,
        compact: !!compact,
      };
    }, [label, compact]);

    const handleBlurSelectInput = useCallback(() => {
      toggleMenu.toggleOff();
      toggleFocused.toggleOff();
      if (focused) {
        void animateCaretOut();
      }
    }, [animateCaretOut, toggleMenu, toggleFocused, focused]);

    useEffect(() => {
      const window = document.getElementsByTagName('body')[0];
      window.addEventListener('click', handleBlurSelectInput);
      return () => {
        window.removeEventListener('click', handleBlurSelectInput);
      };
    }, [handleBlurSelectInput]);

    const handleOnSelectInputPress = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        event?.stopPropagation();
        onPress?.();
        toggleFocused.toggleOn();
        toggleMenu.toggle();
        if (!isMenuOpened) {
          void animateCaretIn();
        } else {
          void animateCaretOut();
        }
        // TODO: focus on the first menu option or already selected option
      },
      [onPress, toggleMenu, animateCaretIn, animateCaretOut, isMenuOpened, toggleFocused],
    );

    const handleOnSelectInputKeyDown = useCallback(
      (event: KeyboardEvent<HTMLElement>) => {
        if (selectKeys.includes(event.key)) {
          event.preventDefault();
          toggleMenu.toggle();
          toggleFocused.toggleOn();
          selectInputTriggerRef?.current?.focus();
          if (!isMenuOpened) {
            void animateCaretIn();
          } else {
            void animateCaretOut();
          }
        }
        // if user changes focus to Menu, toggle off focus
        if (event.key === 'Tab') {
          toggleFocused.toggleOff();
        }
      },
      [
        toggleMenu,
        animateCaretIn,
        animateCaretOut,
        isMenuOpened,
        toggleFocused,
        selectInputTriggerRef,
      ],
    );

    const handleOnOptionSelectPress = useCallback(
      (event: MouseEvent<HTMLElement>, newValue: string) => {
        // prevent parent select input trigger events from firing on select option cell events
        event.stopPropagation();
        onChange?.(newValue);
        toggleMenu.toggleOff();
        toggleFocused.toggleOff();
        void animateCaretOut();
      },
      [onChange, toggleMenu, toggleFocused, animateCaretOut],
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
              toggleMenu.toggleOff();
              toggleFocused.toggleOn();
              selectInputTriggerRef?.current?.focus();
              void animateCaretOut();
            } else if (event.key === 'Escape') {
              toggleMenu.toggleOff();
              selectInputTriggerRef?.current?.focus();
            } else if (event.key === 'ArrowUp' || (event.shiftKey && event.key === 'Tab')) {
              if (focusedOptionIndex !== 0) {
                // focus on the previous option
                selectOptions[focusedOptionIndex - 1].focus();
              } else {
                // if it's the first option, close the menu
                toggleMenu.toggleOff();
                selectInputTriggerRef?.current?.focus();
              }
            } else if (event.key === 'ArrowDown' || event.key === 'Tab') {
              if (focusedOptionIndex !== selectOptions?.length - 1) {
                // focus the next option
                selectOptions[focusedOptionIndex + 1].focus();
              } else {
                // if it's the last option, close the menu and allow focus to move to the next element
                toggleMenu.toggleOff();
                toggleFocused.toggleOff();
                void animateCaretOut();
              }
            } else if (event.key === 'Home') {
              selectOptions[0].focus();
            } else if (event.key === 'End') {
              selectOptions[selectOptions.length - 1].focus();
            }
            // ignore all other events
          }
        }
      },
      [onChange, toggleMenu, selectInputTriggerRef, toggleFocused, animateCaretOut],
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
      <TextInputFocusVariantContext.Provider value={variantWithFocus}>
        <HStack position="relative">
          <InputStack
            width={width}
            disabled={disabled}
            variant={variant}
            focused={focused}
            ref={inputStackRef}
            startNode={
              compact && (
                <HStack spacingStart={compact ? 1 : 2} alignItems="center">
                  <InputLabel color={labelTextColor} disabled={disabled}>
                    {label}
                  </InputLabel>
                </HStack>
              )
            }
            inputNode={
              <PressableOpacity
                onPress={handleOnSelectInputPress}
                onKeyDown={handleOnSelectInputKeyDown}
                width="100%"
                noScaleOnPress
                testID={testID}
                ref={selectInputTriggerRef}
                className={selectTrigger}
                {...props}
              >
                <HStack
                  alignItems="center"
                  borderRadius="standard"
                  justifyContent="space-between"
                  spacingStart={compact ? 1 : 2}
                  spacingVertical={compact ? 1 : 2}
                  flexGrow={1}
                  flexShrink={1}
                >
                  <TextBody as="p" color="foregroundMuted" disabled={disabled}>
                    {value ?? placeholder ?? (!compact && label)}
                  </TextBody>
                </HStack>
              </PressableOpacity>
            }
            endNode={
              <HStack alignItems="center">
                <InputIcon ref={rotateAnimationRef} name="caretDown" />
              </HStack>
            }
            helperTextNode={
              Boolean(helperText) && (
                <HelperText color={variant ?? 'foregroundMuted'}>{helperText}</HelperText>
              )
            }
            labelNode={
              !compact &&
              Boolean(label) && (
                <InputLabel color={labelTextColor} disabled={disabled}>
                  {label}
                </InputLabel>
              )
            }
          />
          {isMenuOpened && (
            <Menu parentRef={inputStackRef} ref={menuRef} offsetConfig={menuOffsetConfig}>
              {children.map(renderSelectOptionCell)}
            </Menu>
          )}
        </HStack>
      </TextInputFocusVariantContext.Provider>
    );
  }),
);
