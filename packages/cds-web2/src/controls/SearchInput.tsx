import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import { css, cx } from '@linaria/core';
import { useMergeRefs } from '@cbhq/cds-common2/hooks/useMergeRefs';
import { SearchInputBaseProps } from '@cbhq/cds-common2/types/SearchInputBaseProps';
import type { OnPress } from '@cbhq/cds-web2/system/Pressable';

import { Box } from '../layout/Box';

import { InputIcon } from './InputIcon';
import { InputIconButton } from './InputIconButton';
import { TextInput } from './TextInput';

export const scales = {
  regular: 56,
  compact: 40,
};

const styles = css`
  height: ${scales.regular}px;
`;

const compactStyles = css`
  height: ${scales.compact}px;
`;

type HTMLElementProps = React.InputHTMLAttributes<HTMLInputElement> &
  Required<Pick<HTMLInputElement, 'value'>>;

export type SearchInputProps = SearchInputBaseProps &
  HTMLElementProps & {
    onClear?: OnPress;
    onChangeText: (text: string) => void;
    /**
     * Callback fired when pressed/clicked
     */
    onClick?: OnPress;
    /**
     * Adds border to input
     * @default true
     */
    bordered?: boolean;
  };

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
      bordered = true,
      hideEndIcon,
      startIcon,
      end,
      startIconAccessibilityLabel = 'Back',
      clearIconAccessibilityLabel = 'Clear search query',
      ...props
    }: SearchInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) {
    const internalRef = useRef<HTMLInputElement>(null);
    const refs = useMergeRefs(ref, internalRef);

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

    const determineStartIconAccessibilityLabel = useMemo(
      () => (startIcon === 'backArrow' ? startIconAccessibilityLabel : undefined),
      [startIconAccessibilityLabel, startIcon],
    );

    return (
      <TextInput
        ref={refs}
        borderRadius={1000}
        bordered={bordered}
        className={cx(styles, compact && compactStyles)}
        end={
          end ??
          (!!value && !hideEndIcon && (
            <Box marginEnd={compact ? -0.5 : 0} paddingEnd={compact ? 0 : 0.5}>
              <InputIconButton
                accessibilityLabel={clearIconAccessibilityLabel}
                name="close"
                onClick={handleOnClear}
                testID={testID && `${testID}-close-iconbtn`}
              />
            </Box>
          ))
        }
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        role="searchbox"
        start={
          !hideStartIcon && (
            <InputIcon
              accessibilityLabel={determineStartIconAccessibilityLabel}
              name={startIcon ?? 'search'}
              testID={testID && `${testID}-search-icon`}
            />
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
