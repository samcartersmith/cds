import React, { useMemo, useState } from 'react';
import { SearchInput } from '@cbhq/cds-web2/controls/SearchInput';
import { HStack, VStack } from '@cbhq/cds-web2/layout';
import { Text } from '@cbhq/cds-web2/typography/Text';

import ModalLink from './ModalLink';
import PropsTable from './PropsTable';
import { ParentTypesItem, ParentTypesListProps } from './types';

const noResultsMessage = (
  <VStack alignContent="center" alignItems="center" gap={1.5} padding={2}>
    <Text font="headline">No results found</Text>
    <Text font="body">This prop does not exist.</Text>
  </VStack>
);

function ParentTypes({ name, sharedTypeAliases, sharedParentTypes, props }: ParentTypesItem) {
  const [searchValue, setSearchValue] = useState('');
  const filteredProps = useMemo(
    () =>
      Object.values(sharedParentTypes[name]).filter(
        (item) =>
          props.includes(item.name) && item.name.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [name, props, searchValue, sharedParentTypes],
  );
  const content = useMemo(() => {
    return (
      <VStack gap={2}>
        <SearchInput
          compact
          onChangeText={setSearchValue}
          placeholder="Search"
          value={searchValue}
        />
        {filteredProps.length > 0 ? (
          <PropsTable
            props={filteredProps}
            searchTerm={searchValue}
            sharedTypeAliases={sharedTypeAliases}
          />
        ) : (
          noResultsMessage
        )}
      </VStack>
    );
  }, [searchValue, filteredProps, sharedTypeAliases]);

  return (
    <ModalLink content={content} font="headline">
      {name}
    </ModalLink>
  );
}

function ParentTypesList({
  parentTypes,
  sharedTypeAliases,
  sharedParentTypes,
}: ParentTypesListProps) {
  const parentTypesAsArray = useMemo(() => Object.entries(parentTypes), [parentTypes]);

  if (!parentTypesAsArray.length) return null;

  return (
    <HStack alignItems="center" flexWrap="wrap" gap={1}>
      <Text color="fgMuted" font="label1">
        Extended from:&nbsp;
      </Text>
      {parentTypesAsArray.map(([key, value]) => (
        <ParentTypes
          key={key}
          name={key}
          props={value}
          sharedParentTypes={sharedParentTypes}
          sharedTypeAliases={sharedTypeAliases}
        />
      ))}
    </HStack>
  );
}

export default ParentTypesList;
