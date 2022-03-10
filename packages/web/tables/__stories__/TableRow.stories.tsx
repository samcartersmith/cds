import { Meta, Story } from '@storybook/react';

import { Button } from '../../buttons';
import { TextHeadline } from '../../typography';
import { Table, TableBody, TableCell, TableRow } from '..';

export default {
  title: 'Core Components/Table/TableRow',
  component: TableRow,
} as Meta;

const handlePress = () => {
  return () => console.log('Thanks for tapping');
};

export const TableRowExample: Story = () => {
  return (
    <Table variant="ruled" bordered>
      <TableBody>
        <TableRow>
          <TableCell direction="horizontal">
            <TextHeadline as="h2">Sample Row 1</TextHeadline>
            <Button variant="secondary" compact onPress={handlePress}>
              Export
            </Button>
          </TableCell>
        </TableRow>
        <TableRow backgroundColor="backgroundAlternate">
          <TableCell
            direction="horizontal"
            title="Sample Row 2 (with background set)"
            end={
              <Button variant="secondary" compact onPress={handlePress}>
                Export
              </Button>
            }
          />
        </TableRow>
        <TableRow disableHoverIndicator>
          <TableCell direction="horizontal">
            <TextHeadline as="h2">Sample Row 3 (disable hover indicator)</TextHeadline>
            <Button variant="secondary" compact onPress={handlePress}>
              Export
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
