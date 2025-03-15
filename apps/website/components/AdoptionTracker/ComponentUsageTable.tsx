import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { kebabCase } from 'lodash';
import { useSort } from '@cbhq/cds-common/hooks/useSort';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';
import { useSortableCell, UseSortableCellProps } from '@cbhq/cds-web/tables/hooks/useSortableCell';
import { TextBody } from '@cbhq/cds-web/typography';

type SortState = {
  sortBy: 'name' | 'totalInstances';
  sortDirection: UseSortableCellProps['sortDirection'];
};

type UsageData = {
  name: string;
  importPaths: string;
  totalInstances: number;
};
const cmptsUsageAndImportData =
  require(`@site/static/data/__generated__/adoption/componentsUsageAndImportData.json`) as UsageData[];

export const ComponentUsageTable = memo(() => {
  const data = cmptsUsageAndImportData;
  const [{ sortBy, sortDirection }, setSort] = useState<SortState>({
    sortBy: 'totalInstances',
    sortDirection: 'descending',
  });
  const onChange = useCallback(
    (_sortBy: SortState['sortBy']) => {
      const toggleSortDirection = _sortBy === sortBy && sortDirection === 'ascending';
      setSort({ sortBy: _sortBy, sortDirection: toggleSortDirection ? 'descending' : 'ascending' });
    },
    [sortBy, sortDirection],
  );
  const getSortableProps = useSortableCell({ sortDirection, sortBy, onChange });
  const sortedComponentList = useSort({ data, sortBy, sortDirection });

  return (
    <Table variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell title="Component" {...getSortableProps('name')} />
          <TableCell title="Total instances" {...getSortableProps('totalInstances')} />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedComponentList.map(({ name, totalInstances }) => {
          return (
            <TableRow>
              <TableCell>
                <Link to={`/components/${kebabCase(name)}`}>{name}</Link>
              </TableCell>
              <TableCell alignItems="flex-end">
                <TextBody tabularNumbers as="span" color="foregroundMuted">
                  {new Intl.NumberFormat('en-us').format(totalInstances)}
                </TextBody>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
});

ComponentUsageTable.displayName = 'ComponentUsageTable';
