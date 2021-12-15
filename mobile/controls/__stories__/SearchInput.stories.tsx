import React from 'react';
import { searchInputBuilder } from '@cbhq/cds-common/internal/searchInputBuilder';
import { SearchInput } from '../SearchInput';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const { Basic, Disabled, Compact, DefaultValue } = searchInputBuilder(SearchInput);

const SearchInputScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic">
        <Basic />
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
