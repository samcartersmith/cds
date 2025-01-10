import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { Button } from '../../buttons/Button';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system';
import { TabIndicator } from '..';

const getRandomNumber = () => Math.random() * 100 + 100;

export default {
  title: 'Core Components/Tabs/TabIndicator',
  component: TabIndicator,
} as Meta;

export const Default: Story = () => {
  const [width, setWidth] = useState(120);
  const [x, setX] = useState(120);

  const handlePress = () => {
    setWidth(getRandomNumber());
    setX(getRandomNumber());
  };

  return (
    <ThemeProvider spectrum="light">
      <VStack background="background" gap={2} spacing={4}>
        <Button block onPress={handlePress}>
          Randomize
        </Button>
        <TabIndicator width={width} x={x} />
      </VStack>
    </ThemeProvider>
  );
};
