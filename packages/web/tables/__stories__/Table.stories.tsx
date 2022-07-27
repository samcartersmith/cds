/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { useCallback, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import startCase from 'lodash/startCase';
import { useSort } from '@cbhq/cds-common/hooks/useSort';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { CellMediaType } from '@cbhq/cds-common/types';

import { HStack } from '../../alpha/HStack';
import { Button } from '../../buttons';
import { CellMedia } from '../../cells';
import { Switch } from '../../controls/Switch';
import { TextDisplay2 } from '../../typography';
import { assetHubMock } from '../__mocks__';
import { useSortableCell, UseSortableCellProps } from '../hooks/useSortableCell';
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

type Columns = 'name' | 'ticker' | 'appStatus';
export const SortingExample: Story = () => {
  const [{ sortBy, sortDirection }, setSort] = useState<{
    sortBy: Columns;
    sortDirection: UseSortableCellProps['sortDirection'];
  }>({
    sortBy: 'name',
    sortDirection: 'ascending',
  });

  // Config to handle sortiing
  const data = useSort({ data: assetHubMock, sortDirection, sortBy });
  const onChange = useCallback(
    (by: Columns) => {
      const flipSort = by === sortBy && sortDirection === 'ascending';
      setSort({ sortBy: by, sortDirection: flipSort ? 'descending' : 'ascending' });
    },
    [sortBy, sortDirection],
  );
  const getSortableProps = useSortableCell({ sortBy, sortDirection, onChange });

  return (
    <Table bordered variant="ruled" maxHeight={500}>
      <TableHeader sticky>
        <TableRow fullWidth>
          <HStack alignItems="center" justifyContent="space-between" flexGrow={1}>
            <TextDisplay2 as="h2">Your assets</TextDisplay2>
            <Button variant="secondary" compact onPress={() => console.log('Fake Export')}>
              Export
            </Button>
          </HStack>
        </TableRow>
        <TableRow backgroundColor="backgroundAlternate">
          <TableCell title="Asset" {...getSortableProps('name')} />
          <TableCell title="Ticker" {...getSortableProps('name')} />
          <TableCell title="Application Status" />
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

const COMPACT_LABELS = ['name', 'ticker', 'appStatus'];
const mediaTypes: CellMediaType[] = ['asset', 'avatar', 'icon', 'image', 'pictogram'];
export const CompactExample: Story = () => {
  const [compact, { toggle }] = useToggler(true);
  const data = assetHubMock.slice(0, 20);

  return (
    <Table variant="ruled" bordered compact={compact}>
      <TableHeader>
        <TableRow fullWidth>
          <HStack alignItems="center" justifyContent="space-between" flexGrow={1}>
            <TextDisplay2 as="h2">Compact Table</TextDisplay2>
            <Switch onChange={toggle} checked={compact}>
              Compact
            </Switch>
          </HStack>
        </TableRow>
        <TableRow backgroundColor="backgroundAlternate">
          {COMPACT_LABELS.map((label) => (
            <TableCell key={`header-cell-${label}`} title={label} />
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell title="Title" />
          <TableCell title="Title" />
          <TableCell title="Title" />
        </TableRow>
        <TableRow>
          <TableCell title="Title" subtitle="A description" />
          <TableCell title="Title" subtitle="A description" />
          <TableCell title="Title" subtitle="A description" />
        </TableRow>
        {data.map((row, index) => (
          <TableRow key={`row-${row.name}--${row.appSubmittedAt}`}>
            {Object.entries(row)
              .filter(([label]) => COMPACT_LABELS.includes(label))
              .map(([key, val]) => {
                const mediaType = mediaTypes[index % mediaTypes.length];
                return (
                  <TableCell
                    key={`cell-${key}`}
                    title={`${val}`}
                    subtitle="Some subtitle"
                    start={
                      mediaType === 'image' ? (
                        <CellMedia
                          type="image"
                          source="https://via.placeholder.com/200/0000ff/ffffff.webp?text=CDS"
                        />
                      ) : (
                        <CellMedia
                          type="avatar"
                          source="https://via.placeholder.com/200/0000ff/ffffff.webp?text=CDS"
                        />
                      )
                    }
                  />
                );
              })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
