import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { interactableHeight } from '@cbhq/cds-common/tokens/interactableHeight';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { SearchInputBaseProps } from '@cbhq/cds-common/types/SearchInputBaseProps';

import { Box } from '../layout/Box';
import { OnPress } from '../system';
import { borderWidth } from '../tokens';

import { InputIcon } from './InputIcon';
import { InputIconButton } from './InputIconButton';
import { TextInput } from './TextInput';

export type SearchInputProps = SearchInputBaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    onClear?: OnPress;
    onChangeText: (text: string) => void;
    /**
     * Callback fired when pressed/clicked
     */
    onPress?: OnPress;
    /**
     * Adds border to input
     * @default true
     */
    bordered?: boolean;
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
      hideStartIcon = false,
      hideEndIcon,
      startIcon,
      end,
      ...props
    }: SearchInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) {
    const scale = useScale();
    const heightWithoutBorder = interactableHeight[scale][compact ? 'compact' : 'regular'];
    const height = `calc(${heightWithoutBorder}px + ${borderWidth.input} + ${borderWidth.input})`;
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

    const boxStyle = useMemo(() => {
      return compact ? { transform: 'scale(0.75)' } : undefined;
    }, [compact]);

    return (
      <TextInput
        ref={refs}
        borderRadius="roundedFull"
        end={
          end ??
          (!!value && !hideEndIcon && (
            <Box offsetEnd={compact ? 0.5 : 0} spacingEnd={compact ? 0 : 0.5} style={boxStyle}>
              <InputIconButton
                accessibilityLabel="Clear search query"
                name="close"
                onPress={handleOnClear}
                testID={testID && `${testID}-close-iconbtn`}
              />
            </Box>
          ))
        }
        height={height}
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        role="searchbox"
        start={
          !hideStartIcon && (
            <InputIcon name={startIcon ?? 'search'} testID={testID && `${testID}-search-icon`} />
          )
        }
        testID={testID}
        type="search"
        value={value}
        variant="secondary"
        {...props}
      />
    );
  }),
);
