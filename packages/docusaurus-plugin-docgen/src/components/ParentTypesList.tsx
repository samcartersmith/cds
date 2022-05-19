import React, { useMemo } from 'react';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { TextHeadline } from '@cbhq/cds-web/typography';

import type { ProcessedDoc, SharedParentTypes, SharedTypeAliases } from '../scripts/types';

import { ModalLink } from './ModalLink';
import { PropsTable } from './PropsTable';

export type ParentTypesItem = {
  name: string;
  props: string[];
  sharedTypeAliases: SharedTypeAliases;
  sharedParentTypes: SharedParentTypes;
};

export type ParentTypesListProps = {
  parentTypes: ProcessedDoc['parentTypes'];
  sharedTypeAliases: SharedTypeAliases;
  sharedParentTypes: SharedParentTypes;
};

export function ParentTypes({
  name,
  sharedTypeAliases,
  sharedParentTypes,
  props,
}: ParentTypesItem) {
  const content = useMemo(() => {
    const filteredProps = Object.values(sharedParentTypes[name]).filter((item) =>
      props.includes(item.name),
    );
    return <PropsTable sharedTypeAliases={sharedTypeAliases} props={filteredProps} />;
  }, [sharedTypeAliases, name, sharedParentTypes, props]);

  return (
    <ModalLink content={content} variant="headline">
      {name}
    </ModalLink>
  );
}

export function ParentTypesList({
  parentTypes,
  sharedTypeAliases,
  sharedParentTypes,
}: ParentTypesListProps) {
  const parentTypesAsArray = useMemo(() => Object.entries(parentTypes), [parentTypes]);
  if (parentTypesAsArray.length) {
    return (
      <HStack gap={1} alignItems="center">
        <TextHeadline as="p">Extends from:</TextHeadline>
        {parentTypesAsArray.map(([key, value]) => {
          return (
            <ParentTypes
              key={key}
              name={key}
              props={value}
              sharedTypeAliases={sharedTypeAliases}
              sharedParentTypes={sharedParentTypes}
            />
          );
        })}
      </HStack>
    );
  }

  return null;
}
