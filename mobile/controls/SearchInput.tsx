import React, { useMemo, useCallback, memo, useState, ForwardedRef, forwardRef } from 'react';
import {
  GestureResponderEvent,
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
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
      { onChangeText, onSearch, onClear, value, testID, ...props }: SearchInputProps,
      ref: ForwardedRef<RNTextInput>,
    ) => {
      const [text, setText] = useState(value);
      const [startIconName, setStartIconName] = useState<IconName>('search');

      const addonProps = useMemo(() => {
        return {
          ...props,
          onChangeText: (textStr: string) => {
            onChangeText?.(textStr);
            setText(textStr);
          },
          // The icon of the start IconButton changes based on the focus state
          // When focused, it will be backArrow, otherwise its search
          onFocus: () => {
            setStartIconName('backArrow');
          },
          onBlur: () => {
            setStartIconName('search');
          },
        };
      }, [props, onChangeText]);

      const handleOnClear = useCallback(
        (e: GestureResponderEvent) => {
          onClear?.(e);
          setText('');
        },
        [setText, onClear],
      );

      return (
        <TextInput
          start={
            <InputIconButton
              testID={testID && `${testID}-searchinput-iconbtn`}
              onPress={onSearch}
              name={startIconName}
            />
          }
          borderRadius="search"
          ref={ref}
          end={
            text !== '' &&
            text !== undefined && (
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
          {...addonProps}
        />
      );
    },
  ),
);
