import React, {
  useEffect,
  useRef,
  memo,
  useMemo,
  forwardRef,
  ForwardedRef,
  useCallback,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
} from 'react';
import { SelectInputBaseProps } from '@cbhq/cds-common/types';
import { useToggler } from '@cbhq/cds-common';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { css } from 'linaria';
import { selectKeys } from '@cbhq/cds-common/tokens/selectInput';
import { InputStack } from './InputStack';
import { PressableOpacity, LinkableProps } from '../system';
import { HStack } from '../layout/HStack';
import { InputLabel } from './InputLabel';
import { TextBody } from '../typography/TextBody';
import { TextInputFocusVariantContext } from './context';
import { InputIconButton } from './InputIconButton';
import { HelperText } from './HelperText';
import { Menu } from '../overlays/Menu/Menu';
import { useRotate180Animation } from '../animation/useRotate180Animation';
import { SelectOptionCellProps } from '../cells/SelectOptionCell';

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
  }
`;

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
    const caretVariantWithFocus = useInputVariant(
      focused,
      variant === 'foregroundMuted' ? 'foreground' : variant,
    );

    const defaultSelectInputTriggerRef = useRef<HTMLElement | null>(null);
    const selectInputTriggerRef =
      (ref as React.MutableRefObject<HTMLElement | null>) ?? defaultSelectInputTriggerRef;
    const inputStackRef = useRef<HTMLElement | null>(null);

    // this corrects for when value is initialized with an empty string, coerce it to undefined
    const sanitizedValue = value === '' ? undefined : value;
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
      if (isMenuOpened) {
        void animateCaretOut();
      }
    }, [animateCaretOut, toggleMenu, toggleFocused, isMenuOpened]);

    useEffect(() => {
      const window = document.getElementsByTagName('body')[0];
      window.addEventListener('click', handleBlurSelectInput);
      return () => {
        window.removeEventListener('click', handleBlurSelectInput);
      };
    }, [handleBlurSelectInput]);

    // toggle focus animations for InputStack and caret whether menu is open or not
    useEffect(() => {
      if (isMenuOpened) {
        // this will force focus styles to persist even when the InputStack is not the active element
        toggleFocused.toggleOn();
        void animateCaretIn();
      } else {
        toggleFocused.toggleOff();
        void animateCaretOut();
      }
    }, [toggleFocused, animateCaretIn, animateCaretOut, isMenuOpened]);

    const handleOnSelectInputPress = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        event?.stopPropagation();
        onPress?.();
        toggleMenu.toggle();
      },
      [onPress, toggleMenu],
    );

    const handleOnSelectInputKeyDown = useCallback(
      (event: KeyboardEvent<HTMLElement>) => {
        if (['ArrowUp', 'ArrowDown', ...selectKeys].includes(event.key)) {
          event.preventDefault();
          toggleMenu.toggle();
        } else if (event.key === 'Tab') {
          toggleFocused.toggleOff();
        }
      },
      [toggleMenu, toggleFocused],
    );

    return (
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
              >
                <TextBody as="p" color="foregroundMuted" disabled={disabled} overflow="truncate">
                  {sanitizedValue ?? placeholder ?? (!compact && label)}
                </TextBody>
              </HStack>
            </PressableOpacity>
          }
          endNode={
            <TextInputFocusVariantContext.Provider value={caretVariantWithFocus}>
              <HStack alignItems="center">
                <InputIconButton
                  onPress={handleOnSelectInputPress}
                  tabIndex={-1}
                  ref={rotateAnimationRef}
                  name="caretDown"
                />
              </HStack>
            </TextInputFocusVariantContext.Provider>
          }
          helperTextNode={
            Boolean(helperText) && (
              <HelperText overflow="truncate" color={variant ?? 'foregroundMuted'}>
                {helperText}
              </HelperText>
            )
          }
          labelNode={
            !compact &&
            Boolean(label) && (
              <InputLabel overflow="truncate" color={labelTextColor} disabled={disabled}>
                {label}
              </InputLabel>
            )
          }
        />
        {isMenuOpened && (
          <Menu
            value={value}
            parentRef={inputStackRef}
            triggerRef={selectInputTriggerRef}
            offsetConfig={menuOffsetConfig}
            dismissMenu={toggleMenu.toggleOff}
            onChange={onChange}
          >
            {children}
          </Menu>
        )}
      </HStack>
    );
  }),
);
