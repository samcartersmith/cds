import React from 'react';
import { Story } from '@storybook/react';

import { Spacer, VStack } from '../../layout';
import { TextTitle1 } from '../../typography';

import { ComposedSystem } from './NavigationStorySetup';

export default {
  component: ComposedSystem,
  title: 'Core Components/Navigation/System',
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

export { FullSystemExample };
