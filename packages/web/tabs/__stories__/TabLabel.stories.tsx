import React, { useCallback, useState } from 'react';
import sample from 'lodash/sample';
import { Story, Meta } from '@storybook/react';
import { Button } from '../../buttons/Button';
import { VStack, HStack } from '../../layout';

import { TabLabel } from '..';
import { ThemeProvider } from '../../system';

export default {
  title: 'Core Components/Tabs/TabLabel',
  component: TabLabel,
} as Meta;

export const TabIndicatorExample: Story = () => {
  const [count, setCount] = useState(1);

  const updateCount = useCallback(() => {
    setCount(Number(count ? 0 : sample([2, 14, 100])));
  }, [count]);

  return (
    <>
      <ThemeProvider spectrum="light">
        <VStack spacing={4} gap={2} background="background">
          <Button onPress={updateCount} block>
            Randomize
          </Button>
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
              All
            </TabLabel>
            <TabLabel variant="secondary">Tradable</TabLabel>
            <TabLabel variant="secondary">Watchlist</TabLabel>
            <TabLabel variant="secondary">Trending</TabLabel>
          </HStack>
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="light" scale="xSmall">
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
              All
            </TabLabel>
            <TabLabel variant="secondary">Tradable</TabLabel>
            <TabLabel variant="secondary">Watchlist</TabLabel>
            <TabLabel variant="secondary">Trending</TabLabel>
          </HStack>
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
              All
            </TabLabel>
            <TabLabel variant="secondary">Tradable</TabLabel>
            <TabLabel variant="secondary">Watchlist</TabLabel>
            <TabLabel variant="secondary">Trending</TabLabel>
          </HStack>
        </VStack>
      </ThemeProvider>
    </>
  );
};
