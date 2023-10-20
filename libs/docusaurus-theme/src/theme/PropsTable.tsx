import React, { memo } from 'react';
import type { PropsTableProps } from '@theme/PropsTable';
import PropsTableRow from '@theme/PropsTableRow';
import { Box } from '@cbhq/cds-web/layout/Box';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';

const PropsTable = memo(function PropsTable({ props, sharedTypeAliases }: PropsTableProps) {
  return (
    <Box background offset={2} overflow="auto">
      <Table tableLayout="fixed">
        <TableHeader>
          <TableRow>
            <TableCell title="Name" width="32%" />
            {/* Colspan won't work with fixed tableLayout so we render an empty cell */}
            <TableCell title="" />
            <TableCell title="Type" width="35%" />
            <TableCell alignItems="flex-end" title="Default" />
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
    </Box>
  );
});

export default PropsTable;
