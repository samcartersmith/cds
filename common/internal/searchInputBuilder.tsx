/* eslint-disable no-console */
import React, { useCallback } from 'react';
import { TextInputBaseProps } from '../types/TextInputBaseProps';

type SearchInputProps = Omit<TextInputBaseProps, 'helperText' | 'suffix' | 'start' | 'end'> & {
  onFocus?: () => void;
  onBlur?: () => void;
  onSearch?: () => void;
  onClear?: () => void;
  value?: string;
};

export function searchInputBuilder(SearchInput: React.ComponentType<SearchInputProps>) {
  const Basic = () => {
    const handleOnClear = useCallback(() => {
      console.log('Clearing...');
    }, []);

    const handleOnSearch = useCallback(() => {
      console.log('Searching...');
    }, []);

    return (
      <SearchInput onSearch={handleOnSearch} onClear={handleOnClear} placeholder="Placeholder" />
    );
  };

  const Compact = () => <SearchInput accessibilityLabel="searchbox" compact />;

  const Disabled = () => <SearchInput disabled />;

  const DefaultValue = () => <SearchInput value="value" />;

  return {
    Basic,
    Disabled,
    Compact,
    DefaultValue,
  };
}
