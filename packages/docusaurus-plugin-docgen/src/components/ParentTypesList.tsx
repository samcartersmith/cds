import React, { useMemo } from 'react';
import { HStack } from '@cbhq/cds-web/layout/HStack';

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

  return <ModalLink title={name} content={content} />;
}

export function ParentTypesList({
  parentTypes,
  sharedTypeAliases,
  sharedParentTypes,
}: ParentTypesListProps) {
  if (parentTypes) {
    return (
      <HStack gap={1} alignItems="center">
        {Object.entries(parentTypes).map(([key, value]) => {
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
