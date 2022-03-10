import React, { useCallback, useState } from 'react';
import sample from 'lodash/sample';
import { TabNavigationProps, TabProps } from '@cbhq/cds-common';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TabNavigation } from '../TabNavigation';

const tabs: TabProps[] = [
  {
    id: 'first_item',
    label: 'First item',
  },
  {
    id: 'second_item',
    label: 'Second item',
    count: 0,
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
  const [currentTabTwo, setCurrentTabTwo] = useState<TabNavigationProps['value']>(tabs[3].id);
  const [currentTabThree, setCurrentTabThree] = useState<TabNavigationProps['value']>();
  const randomizeCurrentTabOne = useCallback(() => {
    const randomTabItem = sample(tabs);

    setCurrentTabOne(randomTabItem?.id);
  }, []);

  return (
    <ExampleScreen>
      <Example title="Tab Navigation" spacing={gutter} overflow="visible">
        <TabNavigation tabs={tabs} value={currentTabOne} onChange={setCurrentTabOne} />
        <Button onPress={randomizeCurrentTabOne}>Select random item</Button>
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
