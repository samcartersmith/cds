import React from 'react';
import { Story, Meta } from '@storybook/react';
import { TabProps } from '@cbhq/cds-common/types';
import { VStack } from '../../layout/VStack';

import { TabIndicator } from '..';
import { ThemeProvider } from '../../system';
import { TabNavigation } from '../TabNavigation';

// eslint-disable-next-line no-console
const handleChange = console.log;

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

export default {
  title: 'Core Components/Tabs/TabNavigation',
  component: TabIndicator,
} as Meta;

export const TabIndicatorPrimary: Story = () => {
  return (
    <>
      <ThemeProvider spectrum="light">
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation tabs={tabs} onChange={handleChange} />
        </VStack>
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation tabs={tabs} defaultTab="second_item" onChange={handleChange} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation tabs={tabs} onChange={handleChange} />
        </VStack>
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation tabs={tabs} defaultTab="second_item" onChange={handleChange} />
        </VStack>
      </ThemeProvider>
    </>
  );
};

export const TabIndicatorSecondary: Story = () => {
  return (
    <>
      <ThemeProvider spectrum="light">
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation tabs={tabs} variant="secondary" onChange={handleChange} />
        </VStack>
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation
            tabs={tabs}
            variant="secondary"
            defaultTab="second_item"
            onChange={handleChange}
          />
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation tabs={tabs} variant="secondary" onChange={handleChange} />
        </VStack>
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation
            tabs={tabs}
            variant="secondary"
            defaultTab="second_item"
            onChange={handleChange}
          />
        </VStack>
      </ThemeProvider>
    </>
  );
};
