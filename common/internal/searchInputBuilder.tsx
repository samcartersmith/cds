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
    return <SearchInput placeholder="Placeholder" />;
  };

  const OnClear = () => {
    const handleOnClear = useCallback(() => {
      console.log('Clearing...');
    }, []);

    return <SearchInput onClear={handleOnClear} placeholder="Placeholder" />;
  };

  const OnSearch = () => {
    const handleOnSearch = useCallback(() => {
      console.log('Searching...');
    }, []);

    return <SearchInput onSearch={handleOnSearch} placeholder="Placeholder" />;
  };

  const OnFocus = () => {
    const handleOnFocus = useCallback(() => {
      console.log('Focusing...');
    }, []);

    return <SearchInput onFocus={handleOnFocus} placeholder="Placeholder" />;
  };

  const OnBlur = () => {
    const handleOnBlur = useCallback(() => {
      console.log('Blurring...');
    }, []);

    return <SearchInput onBlur={handleOnBlur} placeholder="Placeholder" />;
  };

  const Compact = () => <SearchInput accessibilityLabel="searchbox" compact />;

  const Disabled = () => <SearchInput disabled />;

  const DefaultValue = () => <SearchInput value="value" />;

  return {
    Basic,
    OnClear,
    OnBlur,
    OnFocus,
    OnSearch,
    Disabled,
    Compact,
    DefaultValue,
  };
}
