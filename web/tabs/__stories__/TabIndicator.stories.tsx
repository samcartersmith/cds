/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Button } from '../../buttons/Button';
import { VStack } from '../../layout/VStack';

import { TabIndicator } from '..';
import { ThemeProvider } from '../../system';

export default {
  title: 'Core Components/Tabs/TabIndicator',
  component: TabIndicator,
} as Meta;

const getRandomNumber = () => Math.random() * 100 + 100;
export const TabIndicatorExample: Story = () => {
  const [width, setWidth] = useState(120);
  const [x, setX] = useState(120);

  const handlePress = () => {
    setWidth(getRandomNumber());
    setX(getRandomNumber());
  };

  return (
    <ThemeProvider spectrum="light">
      <VStack spacing={4} gap={2} background="background">
        <Button onPress={handlePress} block>
          Randomize
        </Button>
        <TabIndicator width={width} x={x} />
      </VStack>
    </ThemeProvider>
  );
};
