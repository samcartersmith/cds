import React, { useMemo, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { TabNavigationProps, TabProps } from '@cbhq/cds-common/types';
import { useToggler } from '@cbhq/cds-common';
import { VStack } from '../../layout/VStack';

import { ThemeProvider } from '../../system';
import { TabNavigation } from '../TabNavigation';
import { Select, SelectOption } from '../../controls';
import { Button } from '../../buttons';

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

export default {
  title: 'Core Components/Tabs/TabNavigation',
  component: TabNavigation,
} as Meta;

export const TabIndicatorPrimary: Story = () => {
  const [currentLightTab, setCurrentLightTab] = useState<TabNavigationProps['value']>(tabs[2].id);
  const [currentDarkTab, setCurrentDarkTab] = useState<TabNavigationProps['value']>();
  const [withCount, { toggle: toggleCount }] = useToggler();
  const tabsWithCount = useMemo(
    () => tabs.map((tab, idx) => (idx === 1 ? { ...tab, count: withCount ? 2 : 0 } : tab)),
    [withCount],
  );
  return (
    <>
      <ThemeProvider spectrum="light">
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation
            value={currentLightTab}
            tabs={tabsWithCount}
            onChange={setCurrentLightTab}
          />
          <Select value={currentLightTab} onChange={setCurrentLightTab} label="Select a tab">
            {tabsWithCount.map((option) => (
              <SelectOption value={option.id} title={option.label} key={option.id} />
            ))}
          </Select>
          <Button onPress={toggleCount}>Toggle Badge</Button>
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation tabs={tabs} onChange={setCurrentDarkTab} value={currentDarkTab} />
          <Select value={currentDarkTab} onChange={setCurrentDarkTab} label="Select a tab">
            {tabs.map((option) => (
              <SelectOption value={option.id} title={option.label} key={option.id} />
            ))}
          </Select>
        </VStack>
      </ThemeProvider>
    </>
  );
};

export const TabIndicatorSecondary: Story = () => {
  const [currentTab, setCurrentTab] = useState<TabNavigationProps['value']>();

  return (
    <>
      <ThemeProvider spectrum="light">
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation
            value={currentTab}
            tabs={tabs}
            variant="secondary"
            onChange={setCurrentTab}
          />
        </VStack>
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation
            tabs={tabs}
            variant="secondary"
            value={currentTab}
            onChange={setCurrentTab}
          />
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation
            value={currentTab}
            tabs={tabs}
            variant="secondary"
            onChange={setCurrentTab}
          />
        </VStack>
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation
            tabs={tabs}
            variant="secondary"
            value={currentTab}
            onChange={setCurrentTab}
          />
        </VStack>
      </ThemeProvider>
    </>
  );
};
