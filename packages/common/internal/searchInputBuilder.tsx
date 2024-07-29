import React, { ComponentType, useState } from 'react';

import { SearchInputBaseProps } from '../types/SearchInputBaseProps';
import { TextInputBaseProps } from '../types/TextInputBaseProps';
import { NoopFn } from '../utils/mockUtils';

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
) {
  const Basic = () => {
    const [text, setText] = useState('Value');

    return (
      <SearchInput
        accessibilityLabel="Search"
        onChangeText={setText}
        onClear={NoopFn}
        placeholder="Placeholder"
        value={text}
      />
    );
  };

  const HideStartIcon = () => {
    const [text, setText] = useState('');

    return (
      <SearchInput
        hideStartIcon
        accessibilityLabel="Search"
        onChangeText={setText}
        onClear={NoopFn}
        value={text}
      />
    );
  };

  const HideEndIcon = () => {
    const [text, setText] = useState('');

    return (
      <SearchInput
        hideEndIcon
        accessibilityLabel="Search"
        onChangeText={setText}
        onClear={NoopFn}
        value={text}
      />
    );
  };

  const Compact = () => {
    const [text, setText] = useState('');

    return (
      <SearchInput
        compact
        accessibilityLabel="searchbox"
        onChangeText={setText}
        onClear={NoopFn}
        value={text}
      />
    );
  };

  const Disabled = () => {
    const [text, setText] = useState('');

    return (
      <SearchInput
        disabled
        accessibilityLabel="Search"
        onChangeText={setText}
        onClear={NoopFn}
        value={text}
      />
    );
  };

  const CustomEndNode = ({ end }: { end: React.ReactNode }) => {
    const [text, setText] = useState('');

    return (
      <SearchInput
        accessibilityLabel="Search"
        end={end}
        onChangeText={setText}
        onClear={NoopFn}
        value={text}
      />
    );
  };

  return {
    Basic,
    Disabled,
    Compact,
    HideStartIcon,
    HideEndIcon,
    CustomEndNode,
  };
}
