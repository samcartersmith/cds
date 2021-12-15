import React from 'react';
import { searchInputBuilder } from '@cbhq/cds-common/internal/searchInputBuilder';
import { SearchInput } from '../SearchInput';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const { Basic, OnBlur, OnFocus, OnClear, OnSearch, Disabled, Compact, DefaultValue } =
  searchInputBuilder(SearchInput);

const SearchInputScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic">
        <Basic />
      </Example>
      <Example title="OnBlur">
        <OnBlur />
      </Example>
      <Example title="OnFocus">
        <OnFocus />
      </Example>
      <Example title="OnClear">
        <OnClear />
      </Example>
      <Example title="OnSearch">
        <OnSearch />
      </Example>
      <Example title="Disabled">
        <Disabled />
      </Example>
      <Example title="Compact">
        <Compact />
      </Example>
      <Example title="Default Value">
        <DefaultValue />
      </Example>
    </ExampleScreen>
  );
};

export default SearchInputScreen;
