import React, { ComponentType, useCallback, useState } from 'react';

import { SearchInputBaseProps } from '../types/SearchInputBaseProps';
import { TextBaseProps } from '../types/TextBaseProps';
import { TextInputBaseProps } from '../types/TextInputBaseProps';

type SearchInputProps = Omit<TextInputBaseProps, 'helperText' | 'suffix' | 'start' | 'end'> & {
  onFocus?: () => void;
  onBlur?: () => void;
  onSearch?: (str: string) => void;
  onClear?: () => void;
  onChangeText: (str: string) => void;
  value: string;
  bordered?: boolean;
} & SearchInputBaseProps;

export function searchInputBuilder(
  SearchInput: ComponentType<SearchInputProps>,
  TextLabel1: ComponentType<TextBaseProps>,
) {
  const Basic = () => {
    const [text, setText] = useState('Value');

    return <SearchInput placeholder="Placeholder" onChangeText={setText} value={text} />;
  };

  const Borderless = () => {
    const [text, setText] = useState('');

    return <SearchInput bordered={false} value={text} onChangeText={setText} />;
  };

  const HideStartIcon = () => {
    const [text, setText] = useState('');

    return <SearchInput value={text} hideStartIcon onChangeText={setText} />;
  };

  const OnClear = () => {
    const [text, setText] = useState('');

    const handleOnClear = useCallback(() => {
      console.log('Clearing...');
    }, []);

    return (
      <SearchInput
        onClear={handleOnClear}
        onChangeText={setText}
        value={text}
        placeholder="Placeholder"
      />
    );
  };

  const OnSearch = () => {
    const [text, setText] = useState('');

    const handleOnSearch = useCallback((str: string) => {
      console.log(`User is typing: ${str}`);
    }, []);

    return (
      <SearchInput
        value={text}
        onChangeText={setText}
        onSearch={handleOnSearch}
        placeholder="Hit Enter to see the string logged to console"
      />
    );
  };

  const OnFocus = () => {
    const [text, setText] = useState('');

    const handleOnFocus = useCallback(() => {
      console.log('Focusing...');
    }, []);

    return (
      <SearchInput
        value={text}
        onChangeText={setText}
        onFocus={handleOnFocus}
        placeholder="Placeholder"
      />
    );
  };

  const OnBlur = () => {
    const [text, setText] = useState('');

    const handleOnBlur = useCallback(() => {
      console.log('Blurring...');
    }, []);

    return (
      <SearchInput
        value={text}
        onChangeText={setText}
        onBlur={handleOnBlur}
        placeholder="Placeholder"
      />
    );
  };

  const Compact = () => {
    const [text, setText] = useState('');

    return (
      <SearchInput onChangeText={setText} value={text} accessibilityLabel="searchbox" compact />
    );
  };

  const Disabled = () => {
    const [text, setText] = useState('');

    return <SearchInput value={text} onChangeText={setText} disabled />;
  };

  const DisplayValue = () => {
    const [text, setText] = useState('');

    return (
      <>
        <SearchInput value={text} onChangeText={setText} />
        <TextLabel1>{text}</TextLabel1>
      </>
    );
  };

  return {
    Basic,
    Borderless,
    OnClear,
    OnBlur,
    OnFocus,
    OnSearch,
    Disabled,
    Compact,
    DisplayValue,
    HideStartIcon,
  };
}
