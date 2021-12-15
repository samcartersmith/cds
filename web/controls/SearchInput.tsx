import React, { useCallback, memo, useState, forwardRef } from 'react';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { SearchInputBaseProps } from '@cbhq/cds-common/types/SearchInputBaseProps';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { interactableHeight } from '@cbhq/cds-common/tokens/interactableHeight';
import { InputIcon } from './InputIcon';
import { InputIconButton } from './InputIconButton';
import { TextInput } from './TextInput';

export type SearchInputProps = SearchInputBaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    onClear?: React.MouseEventHandler;
  };

export const SearchInput = memo(
  forwardRef(function SearchInput(
    { onChange, onClear, testID, value, compact, ...props }: SearchInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) {
    const [text, setText] = useState(value);
    const scale = useScale();
    const height = interactableHeight[scale][compact ? 'compact' : 'regular'];

    const handleOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        setText(e.currentTarget.value);
      },
      [onChange],
    );

    const handleOnClear = useCallback(
      (e: React.MouseEvent) => {
        onClear?.(e);
        setText('');
      },
      [onClear],
    );

    return (
      <TextInput
        start={<InputIcon testID={testID && `${testID}-search-icon`} name="search" />}
        height={height + 2}
        end={
          text !== '' &&
          text !== undefined && (
            <InputIconButton
              name="close"
              testID={testID && `${testID}-close-iconbtn`}
              onPress={handleOnClear}
            />
          )
        }
        borderRadius="search"
        onChange={handleOnChange}
        role="searchbox"
        ref={ref}
        value={text}
        testID={testID}
        {...props}
      />
    );
  }),
);
