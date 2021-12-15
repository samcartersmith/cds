import React, { useCallback, memo, useState, forwardRef, useRef } from 'react';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { SearchInputBaseProps } from '@cbhq/cds-common/types/SearchInputBaseProps';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { interactableHeight } from '@cbhq/cds-common/tokens/interactableHeight';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { InputIcon } from './InputIcon';
import { InputIconButton } from './InputIconButton';
import { TextInput } from './TextInput';
import { Box } from '../layout/Box';

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
    const height =
      interactableHeight[scale][compact ? 'compact' : 'regular'] + borderWidth.input * 2;
    const internalRef = useRef<HTMLInputElement>(null);
    const externalRef = ref ?? internalRef;

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

        if (externalRef && 'current' in externalRef) {
          externalRef.current?.focus();
        }
      },
      [externalRef, onClear],
    );

    return (
      <TextInput
        start={<InputIcon testID={testID && `${testID}-search-icon`} name="search" />}
        height={height}
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
        borderRadius="search"
        onChange={handleOnChange}
        role="searchbox"
        ref={externalRef}
        value={text}
        testID={testID}
        {...props}
      />
    );
  }),
);
