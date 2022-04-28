import React from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';
import { TextDisplay2 } from '@cbhq/cds-web/typography';

import type { AliasTypes, ParentTypes, ParsedDoc } from '../scripts/docgenParser';

import { PropsTableRow } from './PropsTableRow';

export type PropsTableProps = ParsedDoc & {
  aliasTypes: AliasTypes;
  parentTypes: ParentTypes;
};

export function PropsTable({ props, aliasTypes, parentTypes }: PropsTableProps) {
  return (
    <VStack gap={1} alignItems="flex-start">
      <Table bordered variant="ruled">
        <TableHeader>
          <TableRow fullWidth>
            <TextDisplay2 as="h2">Props</TextDisplay2>
          </TableRow>
          <TableRow backgroundColor="backgroundAlternate">
            <TableCell title="Name" />
            <TableCell title="Type" />
            <TableCell title="Default" />
            <TableCell title="" />
            <TableCell title="" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((item) => {
            return (
              <PropsTableRow
                key={item.name}
                {...item}
                aliasTypes={aliasTypes}
                parentTypes={parentTypes}
              />
            );
          })}
        </TableBody>
      </Table>
    </VStack>
  );
}
