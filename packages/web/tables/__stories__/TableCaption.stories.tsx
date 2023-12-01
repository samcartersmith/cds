import { Meta } from '@storybook/react';

import { VStack } from '../../alpha/VStack';
import { Table, TableCaption } from '..';

export default {
  title: 'Core Components/Table/TableCaption',
  component: TableCaption,
} as Meta;

const TABLE_SPACING = { outer: { spacing: 1 }, inner: { spacing: 1 } } as const;
const CAPTION_SPACING = { spacing: 3 } as const;

export const SpacingExamples = () => {
  return (
    <VStack gap={2}>
      <Table bordered variant="ruled">
        <TableCaption>Default Spacing</TableCaption>
      </Table>
      <Table bordered cellSpacing={TABLE_SPACING} variant="ruled">
        <TableCaption outerPadding={CAPTION_SPACING}>
          {'Outer Padding: { spacing: 3 }'}
        </TableCaption>
      </Table>
      <Table bordered cellSpacing={TABLE_SPACING} variant="ruled">
        <TableCaption innerPadding={CAPTION_SPACING}>
          {'Inner Padding: { spacing: 3 }'}
        </TableCaption>
      </Table>
      <Table bordered cellSpacing={TABLE_SPACING} variant="ruled">
        <TableCaption innerPadding={CAPTION_SPACING} outerPadding={CAPTION_SPACING}>
          {'Outer Padding: { spacing: 3 } + Inner Padding: { spacing: 3 }'}
        </TableCaption>
      </Table>
    </VStack>
  );
};
