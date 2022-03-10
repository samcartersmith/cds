 
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { useMemo, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { startCase } from 'lodash';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';

import { Button } from '../../buttons';
import { Switch } from '../../controls/Switch';
import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { TextDisplay2 } from '../../typography';
import { assetHubMock } from '../__mocks__';
import { Table, TableBody, TableCell, TableHeader, TableRow, TableVariant } from '..';

const LABELS = ['name', 'ticker', 'appStatus', 'type', 'bookmarked'];
const LABELS_SHORT = LABELS.slice(0, 3);
export default {
  title: 'Core Components/Table/Table',
  component: Table,
} as Meta;

export const SampleTable: Story = () => {
  const [hasBorder, { toggle }] = useToggler();
  const [variant, setVariant] = useState<TableVariant | undefined>('default');

  const data = assetHubMock.slice(0, 6);
  const variants: TableVariant[] = ['default', 'graph', 'ruled'];

  const handlePress = (name: string) => {
    // eslint-disable-next-line no-alert
    alert(`hi ${name}`);
  };
  // Only apply a press event to a few items
  const pressEvents = (name: string) => ({
    onPress: name === 'Ethereum' ? () => handlePress(name) : undefined,
  });

  return (
    <Table bordered={hasBorder} variant={variant}>
      <TableHeader>
        <TableRow fullWidth>
          <HStack alignItems="center" justifyContent="space-between" flexGrow={1}>
            <TextDisplay2 as="h2">Sample Table</TextDisplay2>
            <HStack alignItems="center" justifyContent="space-between" gap={1}>
              {variants.map((v: TableVariant) => (
                <Button
                  compact
                  key={v}
                  variant={v === variant ? 'primary' : 'secondary'}
                  onPress={() => setVariant(v)}
                >
                  {v}
                </Button>
              ))}
              <Switch onChange={toggle} checked={hasBorder}>
                Border
              </Switch>
            </HStack>
          </HStack>
        </TableRow>
        <TableRow backgroundColor="backgroundAlternate">
          {LABELS_SHORT.map((label) => (
            <TableCell key={`${label}--idk`} title={startCase(label)} />
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={`row-${row.name}--${row.appSubmittedAt}`} {...pressEvents(row.name)}>
            {Object.entries(row)
              .filter(([label]) => LABELS_SHORT.includes(label))
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
    <Table bordered variant="ruled">
      <TableHeader>
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
      </TableHeader>
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

export const FixedLayoutExample: Story = () => {
  const [isFixed, { toggle }] = useToggler(true);

  const data = assetHubMock.slice(0, 6);
  const handlePress = (name: string) => {
    // eslint-disable-next-line no-alert
    alert(`hi ${name}`);
  };
  // Only apply a press event to a few items
  const pressEvents = (name: string) => ({
    onPress: name === 'Ethereum' ? () => handlePress(name) : undefined,
  });
  const widths = ['20%', '10%', '30%', '20%', '30%'];

  return (
    <>
      <HStack spacingBottom={2} alignItems="center" justifyContent="space-between" flexGrow={1}>
        <TextDisplay2 as="h2">Sample Table</TextDisplay2>
        <HStack alignItems="center" justifyContent="space-between" gap={1}>
          <Switch onChange={toggle} checked={isFixed}>
            Fixed Layout
          </Switch>
        </HStack>
      </HStack>
      <Table tableLayout={isFixed ? 'fixed' : 'auto'} variant="graph" bordered>
        <TableHeader>
          <TableRow backgroundColor="backgroundAlternate">
            {LABELS.map((label, index) => (
              <TableCell
                key={`fixed-table-cell--${label}`}
                title={startCase(label)}
                width={widths[index]}
              />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={`row-${row.name}--${row.appSubmittedAt}`} {...pressEvents(row.name)}>
              {Object.entries(row)
                .filter(([label]) => LABELS.includes(label))
                .map(([key, val]) => (
                  <TableCell
                    key={`fixed-table-cell--${key}`}
                    overflow="truncate"
                    title={`${val} and a little more`}
                  />
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
