import React from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { TabLabel } from '../TabLabel';

const TabLabelScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Tab Label (defaults to primary)" spacing={gutter} overflow="visible">
        <HStack gap={4}>
          <TabLabel active>Active label</TabLabel>
          <TabLabel>Inactive label</TabLabel>
        </HStack>
      </Example>
      <Example title="Tab Label (primary)" spacing={gutter} overflow="visible">
        <HStack gap={4}>
          <TabLabel variant="primary" active>
            Active label
          </TabLabel>
          <TabLabel variant="primary">Inactive label</TabLabel>
        </HStack>
      </Example>
      <Example title="Tab Label (secondary)" spacing={gutter} overflow="visible">
        <HStack gap={4}>
          <TabLabel variant="secondary" active>
            Active label
          </TabLabel>
          <TabLabel variant="secondary">Inactive label</TabLabel>
        </HStack>
      </Example>
    </ExampleScreen>
  );
};

export default TabLabelScreen;
