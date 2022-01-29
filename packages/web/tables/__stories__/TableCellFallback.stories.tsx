import { Meta, Story } from '@storybook/react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { CellMediaType } from '@cbhq/cds-common/types';

import { CellMedia } from '../../cells';
import { Switch } from '../../controls/Switch';
import { HStack } from '../../layout';
import { ThemeProvider } from '../../system';
import { TextDisplay2 } from '../../typography';
import { assetHubMock } from '../__mocks__';
import { Table, TableBody, TableCell, TableCellFallback, TableHeader, TableRow } from '..';

export default {
  title: 'Core Components/Table/TableCellFallback',
  component: TableCellFallback,
} as Meta;

const LABELS = ['name', 'ticker', 'appStatus'];
const mediaTypes: CellMediaType[] = ['asset', 'avatar', 'icon', 'image', 'pictogram'];
export const TableCellFallbackExample: Story = () => {
  const [loading, { toggle }] = useToggler();
  const data = assetHubMock.slice(0, 20);

  return (
    <ThemeProvider spectrum="light">
      <Table variant="ruled" bordered>
        <TableHeader>
          <TableRow fullWidth>
            <HStack alignItems="center" justifyContent="space-between" flexGrow={1}>
              <TextDisplay2 as="h2">Sample Table</TextDisplay2>
              <Switch onChange={toggle} checked={loading}>
                Loading
              </Switch>
            </HStack>
          </TableRow>
          <TableRow backgroundColor="backgroundAlternate">
            {LABELS.map((label) =>
              loading ? (
                <TableCellFallback key={`header-fallback-cell${label}`} title />
              ) : (
                <TableCell key={`header-cell-${label}`} title={label} />
              ),
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={`row-${row.name}--${row.appSubmittedAt}`}>
              {Object.entries(row)
                .filter(([label]) => LABELS.includes(label))
                .map(([key, val]) => {
                  const mediaType = mediaTypes[index % mediaTypes.length];
                  return loading ? (
                    <TableCellFallback
                      key={`fallback-cell-${key}`}
                      width="33%"
                      title
                      subtitle
                      start={mediaTypes[index % mediaTypes.length]}
                    />
                  ) : (
                    <TableCell
                      width="33%"
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
    </ThemeProvider>
  );
};
