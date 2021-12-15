import { searchInputBuilder } from '@cbhq/cds-common/internal/searchInputBuilder';
import { SearchInput } from '../SearchInput';

export default {
  title: 'Core Components/Inputs/SearchInput',
  component: SearchInput,
};

export const { Basic, OnClear, OnFocus, OnBlur, Disabled, Compact, DefaultValue } =
  searchInputBuilder(SearchInput);
