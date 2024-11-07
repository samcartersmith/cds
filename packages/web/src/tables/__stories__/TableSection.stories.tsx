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
          <TableCell subtitle="This is the TableHeader" title="TableHeader" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell subtitle="This is the TableBody" title="TableBody" />
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell subtitle="This is the TableFooter" title="TableFooter" />
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
          <TableCell subtitle="This is the TableBody" title="TableBody" />
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell subtitle="This is the TableFooter" title="TableFooter" />
        </TableRow>
      </TableFooter>
      <TableHeader>
        <TableRow>
          <TableCell subtitle="This is the TableHeader" title="TableHeader" />
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
        <VStack alignItems="center" justifyContent="center" minHeight={500}>
          <Spinner color="primary" size={4} />
          <TextHeadline as="p" color="foregroundMuted" spacingTop={2}>
            Loading content...
          </TextHeadline>
        </VStack>
      </TableBody>
    </Table>
  );
};
