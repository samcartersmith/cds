import React, { useState } from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { TabNavigationProps, TabProps } from '@cbhq/cds-common';
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
    count: 1,
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
  const [currentTabOne, setCurrentTabOne] = useState<TabNavigationProps['value']>();
  const [currentTabTwo, setCurrentTabTwo] = useState<TabNavigationProps['value']>(tabs[2].id);
  const [currentTabThree, setCurrentTabThree] = useState<TabNavigationProps['value']>();

  return (
    <ExampleScreen>
      <Example title="Tab Navigation" spacing={gutter} overflow="visible">
        <TabNavigation tabs={tabs} value={currentTabOne} onChange={setCurrentTabOne} />
      </Example>
      <Example title="Tab Navigation (with Default Tab)" spacing={gutter} overflow="visible">
        <TabNavigation value={currentTabTwo} onChange={setCurrentTabTwo} tabs={tabs} />
      </Example>
      <Example title="Tab Navigation (Secondary)" spacing={gutter} overflow="visible">
        <TabNavigation
          variant="secondary"
          value={currentTabThree}
          onChange={setCurrentTabThree}
          tabs={tabs}
        />
      </Example>
    </ExampleScreen>
  );
};

export default TabNavigationScreen;
