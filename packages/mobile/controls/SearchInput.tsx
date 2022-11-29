import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { IconName } from '@cbhq/cds-common/types';
import { SearchInputBaseProps } from '@cbhq/cds-common/types/SearchInputBaseProps';

import { Box } from '../layout/Box';

import { InputIconButton } from './InputIconButton';
import { TextInput } from './TextInput';

export type SearchInputProps = SearchInputBaseProps &
  RNTextInputProps & {
    /** Callback is fired when the clear icon is pressed */
    onClear?: (event: GestureResponderEvent) => void;
    /**
     * Callback is fired when backArrow is pressed.
     * If disableBackArrow is true, this will do nothing
     * */
    onBack?: (event: GestureResponderEvent) => void;
    /**
     * If this is set to true, the start icon won't toggle between backArrow and Search.
     * The start icon will always be a search icon
     * @default false
     * */
    disableBackArrow?: boolean;
  } & Required<Pick<RNTextInputProps, 'onChangeText' | 'value'>>;

export const SearchInput = memo(
  forwardRef(
    (
      {
        value,
        testID,
        onSearch,
        onBack,
        onChangeText,
        onClear,
        onFocus,
        onBlur,
        disabled,
        disableBackArrow = false,
        hideStartIcon = false,
        startIcon,
        ...props
      }: SearchInputProps,
      ref: ForwardedRef<RNTextInput>,
    ) => {
      const [startIconName, setStartIconName] = useState<IconName>(startIcon ?? 'search');
      const internalRef = useRef<RNTextInput>(null);
      const refs = useMergedRef(ref, internalRef);

      const handleOnFocus = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          onFocus?.(e);

          if (!disableBackArrow && startIcon === undefined) {
            setStartIconName('backArrow');
          }
        },
        [disableBackArrow, onFocus, startIcon],
      );

      const handleOnBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          onBlur?.(e);

          if (startIcon === undefined) {
            setStartIconName('search');
          }
        },
        [onBlur, startIcon],
      );

      /**
       * This is triggered when 'Enter', when Search IconButton is pressed, or when
       * clearing
       */
      const handleOnSearch = useCallback(() => {
        onSearch?.(value?.toString() ?? '');

        internalRef.current?.focus();
      }, [onSearch, value]);

      const handleOnClear = useCallback(
        (e: GestureResponderEvent) => {
          onClear?.(e);
          internalRef.current?.focus();
          onChangeText?.('');
          onSearch?.('');
        },
        [onClear, onChangeText, onSearch],
      );

      const handleOnBack = useCallback(
        (e: GestureResponderEvent) => {
          onBack?.(e);
          internalRef.current?.blur();
        },
        [onBack],
      );

      const startIconAccessabilityLabel = useMemo(
        () => (startIconName === 'backArrow' ? 'Back' : undefined),
        [startIconName],
      );
      const startIconAccessabilityHint = useMemo(
        () => (startIconName === 'backArrow' ? 'Return to previous view' : undefined),
        [startIconName],
      );

      return (
        <TextInput
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onSubmitEditing={handleOnSearch}
          onChangeText={onChangeText}
          disabled={disabled}
          start={
            !hideStartIcon && (
              <InputIconButton
                testID={testID && `${testID}-searchinput-iconbtn`}
                onPress={startIconName === 'backArrow' ? handleOnBack : handleOnSearch}
                disabled={disabled}
                name={startIconName}
                // A11y props will get passed to the pressable wrapper
                accessibilityLabel={startIconAccessabilityLabel}
                accessibilityHint={startIconAccessabilityHint}
                // The pressable wrapper will be accessible, not the icon
                accessibilityElementsHidden
                importantForAccessibility="no"
              />
            )
          }
          borderRadius="search"
          ref={refs}
          end={
            !!value && (
              <Box spacingEnd={0.5}>
                <InputIconButton
                  name="close"
                  testID={testID && `${testID}-close-iconbtn`}
                  accessibilityLabel="Clear text"
                  accessibilityHint="Clear text"
                  onPress={handleOnClear}
                />
              </Box>
            )
          }
          accessibilityRole="search"
          value={value}
          testID={testID}
          keyboardType="web-search"
          {...props}
        />
      );
    },
  ),
);
