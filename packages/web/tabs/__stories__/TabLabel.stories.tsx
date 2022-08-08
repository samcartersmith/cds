import React, { useCallback, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import sample from 'lodash/sample';
import { Spectrum, TabLabelProps } from '@cbhq/cds-common';

import { Button } from '../../buttons/Button';
import { HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system';
import { TabLabel } from '..';

export default {
  title: 'Core Components/Tabs/TabLabel',
  component: TabLabel,
} as Meta;

type ExampleProps = {
  variant: TabLabelProps['variant'];
  spectrum: Spectrum;
};

const Example = ({ variant, spectrum }: ExampleProps) => {
  const [count, setCount] = useState(1);

  const updateCount = useCallback(() => {
    setCount(Number(count ? 0 : sample([2, 14, 100])));
  }, [count]);

  return (
    <ThemeProvider spectrum={spectrum}>
      <VStack spacing={4} gap={2} background="background">
        <Button onPress={updateCount} block>
          Randomize count: {variant} ({spectrum})
        </Button>
        <HStack gap={2}>
          <TabLabel count={count} variant={variant} active>
            All
          </TabLabel>
          <TabLabel variant={variant}>Tradable</TabLabel>
          <TabLabel variant={variant}>Watchlist</TabLabel>
          <TabLabel variant={variant}>Trending</TabLabel>
        </HStack>
      </VStack>
    </ThemeProvider>
  );
};

export const Default: Story = () => {
  return (
    <>
      <Example spectrum="light" variant="primary" />
      <Example spectrum="light" variant="secondary" />
      <Example spectrum="dark" variant="primary" />
      <Example spectrum="dark" variant="secondary" />
    </>
  );
};
