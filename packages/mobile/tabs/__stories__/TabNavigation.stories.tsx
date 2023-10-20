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
      <Example overflow="visible" spacing={gutter} title="Tab Navigation">
        <TabNavigation onChange={setCurrentTabOne} tabs={tabs} value={currentTabOne} />
        <Button onPress={randomizeCurrentTabOne}>Select random item</Button>
      </Example>
      <Example overflow="visible" spacing={gutter} title="Tab Navigation (with Default Tab)">
        <TabNavigation onChange={setCurrentTabTwo} tabs={tabs} value={currentTabTwo} />
      </Example>
      <Example overflow="visible" spacing={gutter} title="Tab Navigation (Secondary)">
        <TabNavigation
          onChange={setCurrentTabThree}
          tabs={tabs}
          value={currentTabThree}
          variant="secondary"
        />
      </Example>
    </ExampleScreen>
  );
};

export default TabNavigationScreen;
