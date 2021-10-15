/* eslint-disable no-console */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { useMemo, useState } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { Story, Meta } from '@storybook/react';
import { startCase } from 'lodash';
import { Icon } from '../../icons';
import { Button } from '../../buttons';
import { HStack } from '../../layout';
import { Spacer } from '../../layout/Spacer';
import { TextDisplay2 } from '../../typography';
import { Switch } from '../../controls/Switch';

import { Table, TableVariant, TableHead, TableBody, TableRow, TableCell } from '..';
import { assetHubMock } from '../__mocks__';

const LABELS = ['name', 'ticker', 'appStatus'];
export default {
  title: 'Core Components/Table/Table',
  component: Table,
} as Meta;

export const SampleTable: Story = () => {
  const [border, { toggle }] = useToggler();
  const [variant, setVariant] = useState<TableVariant | undefined>('default');

  const data = assetHubMock.slice(0, 6);
  const variants: TableVariant[] = ['default', 'graph', 'ruled'];

  return (
    <Table border={border} variant={variant}>
      <TableHead>
        <TableRow fullWidth>
          <HStack alignItems="center" justifyContent="space-between" flexGrow={1}>
            <TextDisplay2 as="h2">Sample Table</TextDisplay2>
            <HStack alignItems="center" justifyContent="space-between">
              {variants.map((v: TableVariant) => (
                <>
                  <Button
                    compact
                    key={v}
                    variant={v === variant ? 'primary' : 'secondary'}
                    onPress={() => setVariant(v)}
                  >
                    {v}
                  </Button>
                  <Spacer horizontal={2} />
                </>
              ))}
              <Switch onChange={toggle} checked={border}>
                Border
              </Switch>
            </HStack>
          </HStack>
        </TableRow>
        <TableRow backgroundColor="backgroundAlternate">
          {LABELS.map((label) => (
            <TableCell key={`${label}--idk`} title={startCase(label)} />
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={`row-${row.name}--${row.appSubmittedAt}`}>
            {Object.entries(row)
              .filter(([label]) => LABELS.includes(label))
              .map(([key, val]) => (
                <TableCell key={`${key}--idk`}>{val}</TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const SortableIconHelper = ({
  direction,
  color,
}: {
  direction?: 'DESC' | 'ASC';
  color: 'primary' | 'foregroundMuted';
}) => {
  return (
    <Icon color={color} name={direction === 'DESC' ? 'sortUpCenter' : 'sortDownCenter'} size="s" />
  );
};

export const SortingExample: Story = () => {
  const [{ sortBy, sortDirection }, setSort] = useState<{
    sortBy: 'name' | 'ticker' | 'appStatus';
    sortDirection: 'ASC' | 'DESC';
  }>({
    sortBy: 'name',
    sortDirection: 'ASC',
  });

  const data = useMemo(() => {
    return assetHubMock.slice().sort((a, b) => {
      if (sortDirection === 'ASC') {
        return b[sortBy] > a[sortBy] ? -1 : 1;
      }
      return b[sortBy] < a[sortBy] ? -1 : 1;
    });
  }, [sortBy, sortDirection]);

  const sortTable = (by: 'name' | 'ticker' | 'appStatus') => {
    const flipSort = by === sortBy && sortDirection === 'ASC';
    setSort({ sortBy: by, sortDirection: flipSort ? 'DESC' : 'ASC' });
  };

  return (
    <Table border variant="ruled">
      <TableHead>
        <TableRow fullWidth>
          <HStack alignItems="center" justifyContent="space-between" flexGrow={1}>
            <TextDisplay2 as="h2">Your assets</TextDisplay2>
            <Button variant="secondary" compact onPress={() => console.log('Fake Export')}>
              Export
            </Button>
          </HStack>
        </TableRow>
        <TableRow backgroundColor="backgroundAlternate">
          <TableCell
            onPress={() => sortTable('name')}
            color={sortBy === 'name' ? 'primary' : 'foregroundMuted'}
            title="Asset"
            end={
              <SortableIconHelper
                color={sortBy === 'name' ? 'primary' : 'foregroundMuted'}
                direction={sortBy === 'name' ? sortDirection : undefined}
              />
            }
          />
          <TableCell
            onPress={() => sortTable('ticker')}
            color={sortBy === 'ticker' ? 'primary' : 'foregroundMuted'}
            title="Ticker"
            end={
              <SortableIconHelper
                color={sortBy === 'ticker' ? 'primary' : 'foregroundMuted'}
                direction={sortBy === 'ticker' ? sortDirection : undefined}
              />
            }
          />
          <TableCell
            onPress={() => sortTable('appStatus')}
            color={sortBy === 'appStatus' ? 'primary' : 'foregroundMuted'}
            title="Application Status"
            end={
              <SortableIconHelper
                color={sortBy === 'appStatus' ? 'primary' : 'foregroundMuted'}
                direction={sortBy === 'appStatus' ? sortDirection : undefined}
              />
            }
          />
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={`row-${row.name}--${row.appSubmittedAt}`}>
            <TableCell title={row.name} />
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.appStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
