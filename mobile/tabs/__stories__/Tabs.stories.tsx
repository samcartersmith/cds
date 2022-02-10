/* eslint-disable no-console */
import { useState } from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { TabProps } from '@cbhq/cds-common';
import { TabNavigation } from '../TabNavigation';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout/VStack';
import { TextLabel1, TextTitle2 } from '../../typography';

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
  const [activeTabOne, setActiveTabOne] = useState<string>();
  const [activeTabTwo, setActiveTabTwo] = useState<string>();

  return (
    <ExampleScreen>
      <Example title="Tab System" spacing={gutter} overflow="visible">
        <TabNavigation onChange={setActiveTabOne} tabs={tabs} />
        <VStack
          background="backgroundAlternate"
          alignItems="center"
          justifyContent="center"
          spacingVertical={6}
        >
          <TextLabel1>Static preview</TextLabel1>
          <TextTitle2 color="primary">{activeTabOne}</TextTitle2>
        </VStack>
      </Example>
      <Example title="Tab System (Secondary)" spacing={gutter} overflow="visible">
        <TabNavigation variant="secondary" onChange={setActiveTabTwo} tabs={tabs} />
        <VStack
          background="backgroundAlternate"
          alignItems="center"
          justifyContent="center"
          spacingVertical={6}
        >
          <TextLabel1>Static preview</TextLabel1>
          <TextTitle2 color="primary">{activeTabTwo}</TextTitle2>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default TabScreen;
