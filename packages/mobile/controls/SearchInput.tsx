import React, { ForwardedRef, forwardRef, memo, useCallback, useRef, useState } from 'react';
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
    onSearch?: (str: string) => void;
    onClear?: (event: GestureResponderEvent) => void;
  } & Required<Pick<RNTextInputProps, 'onChangeText' | 'value'>>;

export const SearchInput = memo(
  forwardRef(
    (
      {
        value,
        testID,
        onSearch,
        onChangeText,
        onClear,
        onFocus,
        onBlur,
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
          setStartIconName('backArrow');
        },
        [onFocus],
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
          start={
            <InputIconButton
              testID={testID && `${testID}-searchinput-iconbtn`}
              accessibilityLabel={startIconName}
              accessibilityHint={startIconName}
              onPress={handleOnSearch}
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
