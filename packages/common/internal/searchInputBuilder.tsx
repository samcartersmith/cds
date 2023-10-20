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
  SearchInput: ComponentType<React.PropsWithChildren<SearchInputProps>>,
  TextLabel1: ComponentType<React.PropsWithChildren<TextBaseProps>>,
) {
  const Basic = () => {
    const [text, setText] = useState('Value');

    return (
      <SearchInput
        accessibilityLabel="Search"
        onChangeText={setText}
        placeholder="Placeholder"
        value={text}
      />
    );
  };

  const Borderless = () => {
    const [text, setText] = useState('');

    return (
      <SearchInput
        accessibilityLabel="Search"
        bordered={false}
        onChangeText={setText}
        value={text}
      />
    );
  };

  const HideStartIcon = () => {
    const [text, setText] = useState('');

    return (
      <SearchInput hideStartIcon accessibilityLabel="Search" onChangeText={setText} value={text} />
    );
  };

  const OnClear = () => {
    const [text, setText] = useState('');

    const handleOnClear = useCallback(() => {
      console.log('Clearing...');
    }, []);

    return (
      <SearchInput
        accessibilityLabel="Search"
        onChangeText={setText}
        onClear={handleOnClear}
        placeholder="Placeholder"
        value={text}
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
        accessibilityLabel="Search"
        onChangeText={setText}
        onSearch={handleOnSearch}
        placeholder="Hit Enter to see the string logged to console"
        value={text}
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
        accessibilityLabel="Search"
        onChangeText={setText}
        onFocus={handleOnFocus}
        placeholder="Placeholder"
        value={text}
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
        accessibilityLabel="Search"
        onBlur={handleOnBlur}
        onChangeText={setText}
        placeholder="Placeholder"
        value={text}
      />
    );
  };

  const Compact = () => {
    const [text, setText] = useState('');

    return (
      <SearchInput compact accessibilityLabel="searchbox" onChangeText={setText} value={text} />
    );
  };

  const Disabled = () => {
    const [text, setText] = useState('');

    return <SearchInput disabled accessibilityLabel="Search" onChangeText={setText} value={text} />;
  };

  const DisplayValue = () => {
    const [text, setText] = useState('');

    return (
      <>
        <SearchInput accessibilityLabel="Search" onChangeText={setText} value={text} />
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
