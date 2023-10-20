import React, { useState } from 'react';
import { TabNavigationProps, TabProps } from '@cbhq/cds-common';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout/VStack';
import { TextLabel1, TextTitle2 } from '../../typography';
import { TabNavigation } from '../TabNavigation';

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

// TODO update once _Tabs_ component is complete
const TabScreen = () => {
  const [activeTabOne, setActiveTabOne] = useState<TabNavigationProps['value']>(tabs[0].id);

  return (
    <ExampleScreen>
      <Example overflow="visible" spacing={gutter} title="Tab System">
        <TabNavigation onChange={setActiveTabOne} tabs={tabs} value={activeTabOne} />
        <VStack
          alignItems="center"
          background="backgroundAlternate"
          justifyContent="center"
          spacingVertical={6}
        >
          <TextLabel1>Static preview</TextLabel1>
          <TextTitle2 color="primary">{activeTabOne}</TextTitle2>
        </VStack>
      </Example>
      <Example overflow="visible" spacing={gutter} title="Tab System (Secondary)">
        <TabNavigation
          onChange={setActiveTabOne}
          tabs={tabs}
          value={activeTabOne}
          variant="secondary"
        />
        <VStack
          alignItems="center"
          background="backgroundAlternate"
          justifyContent="center"
          spacingVertical={6}
        >
          <TextLabel1>Static preview</TextLabel1>
          <TextTitle2 color="primary">{activeTabOne}</TextTitle2>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default TabScreen;
