import React, { useCallback, memo, forwardRef, useRef } from 'react';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { SearchInputBaseProps } from '@cbhq/cds-common/types/SearchInputBaseProps';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { interactableHeight } from '@cbhq/cds-common/tokens/interactableHeight';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { InputIcon } from './InputIcon';
import { InputIconButton } from './InputIconButton';
import { TextInput } from './TextInput';
import { Box } from '../layout/Box';

export type SearchInputProps = SearchInputBaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    onClear?: React.MouseEventHandler;
    onChangeText: (text: string) => void;
    onSearch?: (text: string) => void;
  } & Required<Pick<HTMLInputElement, 'value'>>;

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
                accessibilityLabel="Clear search query"
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
