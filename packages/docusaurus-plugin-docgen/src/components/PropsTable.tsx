import React from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';

import type { ProcessedPropItem, SharedTypeAliases } from '../scripts/types';

import { PropsTableRow } from './PropsTableRow';

export type PropsTableProps = {
  props: ProcessedPropItem[];
  sharedTypeAliases: SharedTypeAliases;
};

const cellSpacing = {
  inner: { spacingTop: 0.5, spacingBottom: 0.5 },
  outer: { spacingTop: 0.5, spacingBottom: 0.5 },
} as const;

export function PropsTable({ props, sharedTypeAliases }: PropsTableProps) {
  return (
    <ThemeProvider scale="xSmall">
      <VStack offsetHorizontal={2} gap={1} alignItems="flex-start">
        <Table bordered variant="ruled" cellSpacing={cellSpacing}>
          <TableHeader>
            <TableRow backgroundColor="backgroundAlternate">
              <TableCell title="Name" width="50%" />
              <TableCell title="Type" />
              <TableCell title="Default" />
              <TableCell title="" />
              <TableCell title="" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.map((item) => {
              return (
                <PropsTableRow key={item.name} prop={item} sharedTypeAliases={sharedTypeAliases} />
              );
            })}
          </TableBody>
        </Table>
      </VStack>
    </ThemeProvider>
  );
}
