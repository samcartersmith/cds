import { Story, Meta } from '@storybook/react';
import { TextHeadline } from '../../typography';

import { Table, TableHead, TableBody, TableFoot, TableRow, TableCell } from '..';
import { Spinner } from '../../loaders';
import { VStack } from '../../layout';

export default {
  title: 'Core Components/Table/TableSection',
  component: TableBody,
} as Meta;

export const SampleTableSection: Story = () => {
  return (
    <Table border variant="ruled">
      <TableHead>
        <TableRow>
          <TableCell title="TableHead" subtitle="This is the TableHead" />
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell title="TableBody" subtitle="This is the TableBody" />
        </TableRow>
      </TableBody>
      <TableFoot>
        <TableRow>
          <TableCell title="TableFoot" subtitle="This is the TableFoot" />
        </TableRow>
      </TableFoot>
    </Table>
  );
};

export const SectionFlowControl: Story = () => {
  return (
    <Table border variant="ruled">
      <TableBody>
        <TableRow>
          <TableCell title="TableBody" subtitle="This is the TableBody" />
        </TableRow>
      </TableBody>
      <TableFoot>
        <TableRow>
          <TableCell title="TableFoot" subtitle="This is the TableFoot" />
        </TableRow>
      </TableFoot>
      <TableHead>
        <TableRow>
          <TableCell title="TableHead" subtitle="This is the TableHead" />
        </TableRow>
      </TableHead>
    </Table>
  );
};

export const LoadingStateExample: Story = () => {
  return (
    <Table border variant="ruled">
      <TableHead>
        <TableRow>
          <TableCell title="TableHead" />
        </TableRow>
      </TableHead>
      <TableBody>
        <VStack minHeight={500} alignItems="center" justifyContent="center">
          <Spinner size={4} color="primary" />
          <TextHeadline as="p" spacingTop={2} color="foregroundMuted">
            Loading content...
          </TextHeadline>
        </VStack>
      </TableBody>
    </Table>
  );
};
