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
import { TextInput } from './TextInput';
import { Box } from '../layout/Box';
import { InputIconButton } from './InputIconButton';

export type SearchInputProps = SearchInputBaseProps &
  RNTextInputProps & {
    onSearch?: null | ((event: GestureResponderEvent) => void) | undefined;
    onClear?: null | ((event: GestureResponderEvent) => void) | undefined;
  };

export const SearchInput = memo(
  forwardRef(
    (
      {
        value,
        testID,
        onChangeText,
        onSearch,
        onClear,
        onFocus,
        onBlur,
        ...props
      }: SearchInputProps,
      ref: ForwardedRef<RNTextInput>,
    ) => {
      const [text, setText] = useState(value);
      const [startIconName, setStartIconName] = useState<IconName>('search');
      const localRef = useRef<RNTextInput>(null);
      const externalRef = ref ?? localRef;

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

      const handleOnChangeText = useCallback(
        (textStr: string) => {
          onChangeText?.(textStr);
          setText(textStr);
        },
        [onChangeText],
      );

      const handleOnClear = useCallback(
        (e: GestureResponderEvent) => {
          onClear?.(e);
          setText('');

          if (externalRef && 'current' in externalRef) {
            externalRef.current?.focus();
          }
        },
        [externalRef, onClear],
      );

      return (
        <TextInput
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChangeText={handleOnChangeText}
          start={
            <InputIconButton
              testID={testID && `${testID}-searchinput-iconbtn`}
              onPress={onSearch}
              name={startIconName}
            />
          }
          borderRadius="search"
          ref={externalRef}
          end={
            !!text && (
              <Box spacingEnd={0.5}>
                <InputIconButton
                  name="close"
                  testID={testID && `${testID}-close-iconbtn`}
                  onPress={handleOnClear}
                />
              </Box>
            )
          }
          accessibilityRole="search"
          value={text}
          testID={testID}
          {...props}
        />
      );
    },
  ),
);
