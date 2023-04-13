import React from 'react';
import { Story } from '@storybook/react';

import { Spacer, VStack } from '../../layout';
import { TextTitle1 } from '../../typography';

import { ComposedSystem } from './NavigationStorySetup';

export default {
  component: ComposedSystem,
  title: 'Core Components/Navigation/System',
};

const a11ySkipConfig = {
  config: {
    rules: [{ id: 'aria-required-children', enabled: false }],
  },
};

const FullSystemExample: Story = () => {
  return (
    <VStack alignItems="flex-start">
      <TextTitle1 as="h1">A full system example</TextTitle1>
      <Spacer />
      <ComposedSystem />
    </VStack>
  );
};

FullSystemExample.parameters = {
  a11y: a11ySkipConfig,
};

export { FullSystemExample };
