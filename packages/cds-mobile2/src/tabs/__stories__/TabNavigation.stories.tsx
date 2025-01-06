import React, { useCallback, useState } from 'react';
import sample from 'lodash/sample';
import { CustomTabProps, TabNavigationProps } from '@cbhq/cds-common2';
import { sampleTabs } from '@cbhq/cds-common2/internal/data/tabs';
import { gutter } from '@cbhq/cds-common2/tokens/sizing';

import { Button } from '../../buttons';
import { Chip } from '../../chips/Chip';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { TextHeadline } from '../../typography';
import { TabNavigation } from '../TabNavigation';

const renderCustomTab = ({ label, ...props }: CustomTabProps) => (
  <HStack bordered background="background" borderRadius={100} paddingX={2} paddingY={1} {...props}>
    <TextHeadline>{label}</TextHeadline>
  </HStack>
);

const renderAnotherCustomTab = ({ label, ...props }: CustomTabProps) => (
  <Chip {...props}>{label}</Chip>
);

const someCustomTabs = [
  ...sampleTabs.slice(0, 3),
  {
    id: 'custom_tab',
    label: 'Custom',
    testID: 'custom_tab',
    Component: renderCustomTab,
  },
];

const TabNavigationScreen = () => {
  const [currentTabOne, setCurrentTabOne] = useState<TabNavigationProps['value']>();
  const [currentTabTwo, setCurrentTabTwo] = useState<TabNavigationProps['value']>(sampleTabs[3].id);
  const [currentTabThree, setCurrentTabThree] = useState<TabNavigationProps['value']>();
  const [currentTabFour, setCurrentTabFour] = useState<TabNavigationProps['value']>();
  const randomizeCurrentTabOne = useCallback(() => {
    const randomTabItem = sample(sampleTabs);

    setCurrentTabOne(randomTabItem?.id);
  }, []);

  return (
    <ExampleScreen>
      <Example overflow="visible" padding={gutter} title="Tab Navigation">
        <TabNavigation onChange={setCurrentTabOne} tabs={sampleTabs} value={currentTabOne} />
        <Button onPress={randomizeCurrentTabOne}>Select random item</Button>
      </Example>
      <Example overflow="visible" padding={gutter} title="Tab Navigation (with Default Tab)">
        <TabNavigation onChange={setCurrentTabTwo} tabs={sampleTabs} value={currentTabTwo} />
      </Example>
      <Example overflow="visible" padding={gutter} title="Tab Navigation (Secondary)">
        <TabNavigation
          onChange={setCurrentTabThree}
          tabs={sampleTabs}
          value={currentTabThree}
          variant="secondary"
        />
      </Example>
      <Example title="Custom Tab">
        <TabNavigation onChange={setCurrentTabFour} tabs={someCustomTabs} value={currentTabFour} />
      </Example>
      <Example title="Custom Tabs">
        <TabNavigation
          Component={renderCustomTab}
          onChange={setCurrentTabFour}
          tabs={sampleTabs}
          value={currentTabFour}
        />
      </Example>
      <Example title="Custom Tabs with one override">
        <TabNavigation
          Component={renderAnotherCustomTab}
          onChange={setCurrentTabFour}
          tabs={someCustomTabs}
          value={currentTabFour}
        />
      </Example>
      <Example overflow="visible" padding={gutter} title="Tab Navigation with disabled tab">
        <TabNavigation
          onChange={setCurrentTabOne}
          tabs={sampleTabs.map((tab, index) => ({ ...tab, disabled: index === 1 }))}
          value={currentTabOne}
        />
        <Button onPress={randomizeCurrentTabOne}>Select random item</Button>
      </Example>
    </ExampleScreen>
  );
};

export default TabNavigationScreen;
