import React, { forwardRef, memo, useCallback, useRef } from 'react';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { interactableHeight } from '@cbhq/cds-common/tokens/interactableHeight';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { SearchInputBaseProps } from '@cbhq/cds-common/types/SearchInputBaseProps';

import { Box } from '../layout/Box';

import { InputIcon } from './InputIcon';
import { InputIconButton } from './InputIconButton';
import { TextInput } from './TextInput';

export type SearchInputProps = SearchInputBaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    onClear?: React.MouseEventHandler;
    onChangeText: (text: string) => void;
    onSearch?: (text: string) => void;
  } & Partial<Pick<HTMLInputElement, 'value'>>;

export const SearchInput = memo(
  forwardRef(function SearchInput(
    {
      onChange,
      onClear,
      onChangeText,
      onSearch,
      testID,
      value,
      compact,
      ...props
    }: SearchInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) {
    const scale = useScale();
    const height =
      interactableHeight[scale][compact ? 'compact' : 'regular'] + borderWidth.input * 2;
    const internalRef = useRef<HTMLInputElement>(null);
    const refs = useMergedRef(ref, internalRef);

    const handleOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        onChangeText?.(e.target.value);
      },
      [onChange, onChangeText],
    );

    const handleOnKeyUp = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
          onSearch?.(value?.toString() ?? '');
        }
      },
      [onSearch, value],
    );

    const handleOnClear = useCallback(
      (e: React.MouseEvent) => {
        onClear?.(e);
        internalRef.current?.focus();
        onChangeText?.('');
        onSearch?.('');
      },
      [onClear, onChangeText, onSearch],
    );

    return (
      <TextInput
        start={<InputIcon testID={testID && `${testID}-search-icon`} name="search" />}
        height={height}
        end={
          !!value && (
            <Box spacingEnd={0.5}>
              <InputIconButton
                name="close"
                testID={testID && `${testID}-close-iconbtn`}
                accessibilityLabel="Clear text"
                onPress={handleOnClear}
              />
            </Box>
          )
        }
        borderRadius="search"
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        role="searchbox"
        type="search"
        ref={refs}
        value={value}
        testID={testID}
        {...props}
      />
    );
  }),
);
