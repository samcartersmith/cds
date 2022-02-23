/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Button } from '../../buttons/Button';
import { VStack, HStack } from '../../layout';

import { TabLabel } from '..';
import { ThemeProvider } from '../../system';

export default {
  title: 'Core Components/Tabs/TabLabel',
  component: TabLabel,
} as Meta;

const getRandomNumber = () => Math.floor(Math.random() * 10);
export const TabIndicatorExample: Story = () => {
  const [count, setCount] = useState(1);

  const handlePress = () => {
    setCount(getRandomNumber());
  };

  return (
    <>
      <ThemeProvider spectrum="light">
        <VStack spacing={4} gap={2} background="background">
          <HStack gap={2}>
            <TabLabel count={count} active>
              All
            </TabLabel>
            <TabLabel>Tradable</TabLabel>
            <TabLabel>Watchlist</TabLabel>
            <TabLabel>Trending</TabLabel>
          </HStack>
          <HStack gap={2}>
            <TabLabel count={count} variant="secondary" active>
              Secondary Tab
            </TabLabel>
            <TabLabel variant="secondary">All</TabLabel>
            <TabLabel variant="secondary">Tradable</TabLabel>
            <TabLabel variant="secondary">Watchlist</TabLabel>
            <TabLabel variant="secondary">Trending</TabLabel>
          </HStack>
          <Button onPress={handlePress} block>
            Randomize
          </Button>
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <VStack spacing={4} gap={2} background="background">
          <HStack gap={2}>
            <TabLabel count={count} active>
              All
            </TabLabel>
            <TabLabel>Tradable</TabLabel>
            <TabLabel>Watchlist</TabLabel>
            <TabLabel>Trending</TabLabel>
          </HStack>
          <HStack gap={2}>
            <TabLabel count={count} variant="secondary" active>
              Secondary Tab
            </TabLabel>
            <TabLabel variant="secondary">All</TabLabel>
            <TabLabel variant="secondary">Tradable</TabLabel>
            <TabLabel variant="secondary">Watchlist</TabLabel>
            <TabLabel variant="secondary">Trending</TabLabel>
          </HStack>
          <Button onPress={handlePress} block>
            Randomize
          </Button>
        </VStack>
      </ThemeProvider>
    </>
  );
};
