import { Meta, Story } from '@storybook/react';

import { VStack } from '../../layout';
import { Spinner } from '../../loaders';
import { TextHeadline } from '../../typography';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '..';

export default {
  title: 'Core Components/Table/TableSection',
  component: TableBody,
} as Meta;

export const SampleTableSection: Story = () => {
  return (
    <Table bordered variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell title="TableHeader" subtitle="This is the TableHeader" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell title="TableBody" subtitle="This is the TableBody" />
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell title="TableFooter" subtitle="This is the TableFooter" />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export const SectionFlowControl: Story = () => {
  return (
    <Table bordered variant="ruled">
      <TableBody>
        <TableRow>
          <TableCell title="TableBody" subtitle="This is the TableBody" />
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell title="TableFooter" subtitle="This is the TableFooter" />
        </TableRow>
      </TableFooter>
      <TableHeader>
        <TableRow>
          <TableCell title="TableHeader" subtitle="This is the TableHeader" />
        </TableRow>
      </TableHeader>
    </Table>
  );
};

export const LoadingStateExample: Story = () => {
  return (
    <Table bordered variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell title="TableHeader" />
        </TableRow>
      </TableHeader>
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
