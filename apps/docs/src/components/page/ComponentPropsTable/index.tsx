import React, { useState } from 'react';
import { SearchInput } from '@cbhq/cds-web2/controls/SearchInput';
import { VStack } from '@cbhq/cds-web2/layout';
import { Text } from '@cbhq/cds-web2/typography/Text';
import { SharedTypeAliases, SharedParentTypes } from '@cbhq/docusaurus-plugin-docgen';
import { ProcessedPropItem } from '@cbhq/docusaurus-plugin-docgen/types';

import ParentTypesList from './ParentTypesList';
import PropsTable from './PropsTable';

type ComponentPropsTableProps = {
  props: {
    props: ProcessedPropItem[];
    parentTypes: Record<string, string[]>;
  };
  sharedTypeAliases: SharedTypeAliases;
  sharedParentTypes: SharedParentTypes;
};

function ComponentPropsTable({
  props,
  sharedTypeAliases,
  sharedParentTypes,
}: ComponentPropsTableProps) {
  const [searchValue, setSearchValue] = useState('');
  const filteredProps = React.useMemo(() => {
    const searchTerm = searchValue.toLowerCase();
    return props.props.filter((item) => item.name.toLowerCase().includes(searchTerm));
  }, [searchValue, props.props]);
  const handleSearchChange = React.useCallback((value: string) => {
    setSearchValue(value);
  }, []);
  return (
    <VStack gap={2} maxWidth="100%" overflow="hidden" width="100%">
      <SearchInput
        compact
        onChangeText={handleSearchChange}
        placeholder="Search"
        value={searchValue}
      />
      <ParentTypesList
        parentTypes={props.parentTypes}
        sharedParentTypes={sharedParentTypes}
        sharedTypeAliases={sharedTypeAliases}
      />
      {filteredProps.length > 0 ? (
        <PropsTable
          props={filteredProps}
          searchTerm={searchValue}
          sharedTypeAliases={sharedTypeAliases}
        />
      ) : (
        <VStack alignContent="center" alignItems="center" gap={1.5} paddingBottom={2}>
          <Text font="headline">No results found</Text>
          <Text font="body">This prop does not exist.</Text>
        </VStack>
      )}
    </VStack>
  );
}

export default ComponentPropsTable;
