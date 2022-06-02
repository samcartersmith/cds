import React, { memo } from 'react';
import type { PropsTableProps } from '@theme/PropsTable';
import PropsTableRow from '@theme/PropsTableRow';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextHeadline } from '@cbhq/cds-web/typography';

const PropsTable = memo(function PropsTable({ props, sharedTypeAliases }: PropsTableProps) {
  return (
    <>
      <HStack width="100%" alignItems="center" justifyContent="space-between">
        <VStack width="30%">
          <TextHeadline as="p">Name</TextHeadline>
        </VStack>
        <VStack width="10%" />
        <VStack width="30%">
          <TextHeadline as="p">Type</TextHeadline>
        </VStack>
        <VStack width="30%">
          <TextHeadline as="p" align="center">
            Default
          </TextHeadline>
        </VStack>
      </HStack>
      <VStack offsetHorizontal={3} offsetTop={1} gap={1} alignItems="flex-start">
        {props.map((item) => {
          return (
            <PropsTableRow key={item.name} prop={item} sharedTypeAliases={sharedTypeAliases} />
          );
        })}
      </VStack>
    </>
  );
});

export default PropsTable;
