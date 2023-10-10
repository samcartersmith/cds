import React, { memo, useMemo } from 'react';
import ModalLink from '@theme/ModalLink';
import type { ParentTypesItem, ParentTypesListProps } from '@theme/ParentTypesList';
import PropsTable from '@theme/PropsTable';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { TextBody } from '@cbhq/cds-web/typography';

function ParentTypes({ name, sharedTypeAliases, sharedParentTypes, props }: ParentTypesItem) {
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

const ParentTypesList = memo(function ParentTypesList({
  parentTypes,
  sharedTypeAliases,
  sharedParentTypes,
}: ParentTypesListProps) {
  const parentTypesAsArray = useMemo(() => Object.entries(parentTypes), [parentTypes]);
  if (parentTypesAsArray.length) {
    return (
      <HStack gap={1} alignItems="center" flexWrap="wrap">
        <TextBody as="p" color="foregroundMuted">
          Extends from:
        </TextBody>
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
});

export default ParentTypesList;
