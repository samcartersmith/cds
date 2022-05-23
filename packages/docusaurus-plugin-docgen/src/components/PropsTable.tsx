import React from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { Table, TableBody, TableHeader, TableRow } from '@cbhq/cds-web/tables';

import type { ProcessedPropItem, SharedTypeAliases } from '../scripts/types';

import {
  DefaultValueCell,
  LinkCell,
  NameCell,
  PropsTableRow,
  TagsCell,
  TypeCell,
} from './PropsTableRow';

export type PropsTableRowProps = {
  prop: ProcessedPropItem;
  sharedTypeAliases: SharedTypeAliases;
};

export type PropsTableProps = {
  props: ProcessedPropItem[];
  sharedTypeAliases: SharedTypeAliases;
};

const CELL_SPACING = {
  inner: { spacingTop: 0.5, spacingBottom: 0.5, spacingHorizontal: 2 },
  outer: { spacingTop: 0.5, spacingBottom: 0.5, spacingHorizontal: 2 },
} as const;

export function PropsTable({ props, sharedTypeAliases }: PropsTableProps) {
  return (
    <VStack offsetHorizontal={2} gap={1} alignItems="flex-start">
      <Table cellSpacing={CELL_SPACING}>
        <TableHeader>
          <TableRow>
            <NameCell title="Name" />
            <TagsCell title="" />
            <TypeCell title="Type" />
            <DefaultValueCell title="Default" />
            <LinkCell title="" />
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
  );
}
