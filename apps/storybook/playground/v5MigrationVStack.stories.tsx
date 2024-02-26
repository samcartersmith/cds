import React from 'react';
import { ListCell } from '@cbhq/cds-web/cells/ListCell';
import { VStack } from '@cbhq/cds-web/layout/VStack';

export const withA11yVStack = () => {
  return (
    <VStack as="ul">
      <ListCell as="li" description="Description" title="Title" />
      <ListCell as="li" description="Description" title="Title" />
    </VStack>
  );
};

export default {
  title: 'Playground/CDSMigrator/V5/VStackA11yChange',
};
