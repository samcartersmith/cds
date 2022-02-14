import React, { useRef, useCallback, memo, useState, ForwardedRef, forwardRef } from 'react';
import {
  GestureResponderEvent,
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { SearchInputBaseProps } from '@cbhq/cds-common/types/SearchInputBaseProps';
import { IconName } from '@cbhq/cds-common/types';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { TextInput } from './TextInput';
import { Box } from '../layout/Box';
import { InputIconButton } from './InputIconButton';

export type SearchInputProps = SearchInputBaseProps &
  RNTextInputProps & {
    /**
     * Callback is fired when a user hits enter/go on the keyboard. Can obtain the query
     * through str parameter
     */
    onSearch?: (str: string) => void;
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
        ...props
      }: SearchInputProps,
      ref: ForwardedRef<RNTextInput>,
    ) => {
      const [startIconName, setStartIconName] = useState<IconName>('search');
      const internalRef = useRef<RNTextInput>(null);
      const refs = useMergedRef(ref, internalRef);

      const handleOnFocus = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          onFocus?.(e);

          if (!disableBackArrow) {
            setStartIconName('backArrow');
          }
        },
        [disableBackArrow, onFocus],
      );

      const handleOnBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          onBlur?.(e);
          setStartIconName('search');
        },
        [onBlur],
      );

      /**
       * This is triggered when 'Enter', when Search IconButton is pressed, or when
       * clearing
       */
      const handleOnSearch = useCallback(() => {
        onSearch?.(value?.toString() ?? '');

        if (startIconName === 'backArrow') {
          internalRef.current?.blur();
        } else {
          internalRef.current?.focus();
        }
      }, [onSearch, startIconName, value]);

      const handleOnClear = useCallback(
        (e: GestureResponderEvent) => {
          onClear?.(e);
          internalRef.current?.focus();
          onChangeText?.('');
          onSearch?.('');
        },
        [onClear, onChangeText, onSearch],
      );

      return (
        <TextInput
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onSubmitEditing={handleOnSearch}
          onChangeText={onChangeText}
          disabled={disabled}
          start={
            <InputIconButton
              testID={testID && `${testID}-searchinput-iconbtn`}
              accessibilityLabel={startIconName}
              accessibilityHint={startIconName}
              onPress={startIconName === 'backArrow' ? onBack : handleOnSearch}
              disabled={disabled}
              name={startIconName}
            />
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
