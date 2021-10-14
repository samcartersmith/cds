/* eslint-disable no-console */
import { css } from 'linaria';
import { Story, Meta } from '@storybook/react';
import { Button } from '../../buttons';
import { TextHeadline } from '../../typography';

import { Table, TableRow, TableBody, TableCell } from '..';

export default {
  title: 'Core Components/Table/TableRow',
  component: TableRow,
} as Meta;

const handlePress = () => {
  return () => console.log('Thanks for tapping');
};

const customHoverStyles = css`
  &:hover {
    background-color: rgba(0, 0, 0, 0.0125);
  }
`;

export const TableRowExample: Story = () => {
  return (
    <Table variant="ruled" border>
      <TableBody>
        <TableRow className={customHoverStyles}>
          <TableCell direction="horizontal">
            <TextHeadline as="h2">Sample Row 1 (custom styles)</TextHeadline>
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
        <TableRow indicateHover>
          <TableCell direction="horizontal">
            <TextHeadline as="h2">Sample Row 3 (default hover)</TextHeadline>
            <Button variant="secondary" compact onPress={handlePress}>
              Export
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
