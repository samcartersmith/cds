import React from 'react';
import { Story } from '@storybook/react';
import { Spacer, VStack } from '@cbhq/cds-web/layout';
import { NavigationBar } from '@cbhq/cds-web/navigation';
import { TextTitle1 } from '@cbhq/cds-web/typography';

import { NavigationBarFullExample, NavigationBarTitle } from './NavigationStorySetup';

export default {
  component: NavigationBar,
  title: 'Core Components/Navigation/NavigationBar',
};

const a11ySkipConfig = {
  config: {
    /** The NavigationBar docs explain the proper way to setup the tabpanel */
    rules: [
      { id: 'aria-valid-attr-value', enabled: false },
      { id: 'aria-required-children', enabled: false },
    ],
  },
};

export const NavigationBarFullExampleDefault: Story = () => {
  return (
    <VStack alignItems="flex-start">
      <TextTitle1 as="h1">Navigation full example</TextTitle1>
      <Spacer />
      <NavigationBarFullExample />
    </VStack>
  );
};

NavigationBarFullExampleDefault.parameters = {
  a11y: a11ySkipConfig,
};

export const NavigationBarTitleExample = () => {
  return (
    <VStack alignItems="flex-start">
      <TextTitle1 as="h1">NavigationBar title example</TextTitle1>
      <Spacer />
      <NavigationBarTitle />
    </VStack>
  );
};
