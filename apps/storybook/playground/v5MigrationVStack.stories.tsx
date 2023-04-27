import React from 'react';
import { VStack as AlphaVStack } from '@cbhq/cds-web/alpha/VStack';
import { ListCell } from '@cbhq/cds-web/cells/ListCell';
import { VStack } from '@cbhq/cds-web/layout';

export const withA11yOldVStack = () => {
  return (
    <VStack as="ul">
      <ListCell as="li" title="Title" description="Description" />
      <ListCell as="li" title="Title" description="Description" />
    </VStack>
  );
};

export const withA11yVStack = () => {
  return (
    <AlphaVStack as="ul">
      <ListCell as="li" title="Title" description="Description" />
      <ListCell as="li" title="Title" description="Description" />
    </AlphaVStack>
  );
};

export default {
  title: 'Playground/CDSMigrator/V5/VStackA11yChange',
};
