import { searchInputBuilder } from '@cbhq/cds-common/internal/searchInputBuilder';
import { useRef } from 'react';
import { SearchInput } from '../SearchInput';

export default {
  title: 'Core Components/Inputs/SearchInput',
  component: SearchInput,
};

export const { Basic, OnClear, OnFocus, OnBlur, Disabled, Compact, DefaultValue } =
  searchInputBuilder(SearchInput);

export const CustomRef = () => {
  const ref = useRef(null);

  return <SearchInput ref={ref} value="Value" />;
};
