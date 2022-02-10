/* eslint-disable no-console */
import { useState } from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { TabProps } from '@cbhq/cds-common';
import { TextLabel1 } from '../../typography';
import { TabNavigation } from '../TabNavigation';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const tabs: TabProps[] = [
  {
    id: 'first_item',
    label: 'First item',
    onPress: console.warn,
  },
  {
    id: 'second_item',
    label: 'Second item',
  },
  {
    id: 'third_item',
    label: 'Third item',
    onPress: console.warn,
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
  const [activeTabOne, setActiveTabOne] = useState<string>();
  const [activeTabTwo, setActiveTabTwo] = useState<string>();
  const [activeTabThree, setActiveTabThree] = useState<string>();

  return (
    <ExampleScreen>
      <Example title="Tab Navigation" spacing={gutter} overflow="visible">
        <TabNavigation onChange={setActiveTabOne} tabs={tabs} />
        <TextLabel1 color="primary">{activeTabOne}</TextLabel1>
      </Example>
      <Example title="Tab Navigation (with Default Tab)" spacing={gutter} overflow="visible">
        <TabNavigation defaultTab="second_item" onChange={setActiveTabTwo} tabs={tabs} />
        <TextLabel1 color="primary">{activeTabTwo}</TextLabel1>
      </Example>
      <Example title="Tab Navigation (Secondary)" spacing={gutter} overflow="visible">
        <TabNavigation variant="secondary" onChange={setActiveTabThree} tabs={tabs} />
        <TextLabel1 color="primary">{activeTabThree}</TextLabel1>
      </Example>
    </ExampleScreen>
  );
};

export default TabNavigationScreen;
