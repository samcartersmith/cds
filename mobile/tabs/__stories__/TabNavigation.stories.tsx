/* eslint-disable no-console */
import React from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { TabProps } from '@cbhq/cds-common';
import { TabNavigation } from '../TabNavigation';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const tabs: TabProps[] = [
  {
    id: 'first_item',
    label: 'First item',
  },
  {
    id: 'second_item',
    label: 'Second item',
  },
  {
    id: 'third_item',
    label: 'Third item',
  },
  {
    id: 'fourth_item',
    label: 'Fourth item',
  },
  {
    id: 'fifth_item',
    label: 'Fifth item',
  },
];

const TabNavigationScreen = () => {
  const handleChange = console.warn;

  return (
    <ExampleScreen>
      <Example title="Tab Navigation" spacing={gutter} overflow="visible">
        <TabNavigation tabs={tabs} onChange={handleChange} />
      </Example>
      <Example title="Tab Navigation (with Default Tab)" spacing={gutter} overflow="visible">
        <TabNavigation defaultTab="second_item" onChange={handleChange} tabs={tabs} />
      </Example>
      <Example title="Tab Navigation (Secondary)" spacing={gutter} overflow="visible">
        <TabNavigation variant="secondary" onChange={handleChange} tabs={tabs} />
      </Example>
    </ExampleScreen>
  );
};

export default TabNavigationScreen;
