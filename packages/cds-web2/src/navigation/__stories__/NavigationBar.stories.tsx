import React from 'react';
import { Story } from '@storybook/react';

import { Spacer, VStack } from '../../layout';
import { TextTitle1 } from '../../typography';
import { NavigationBar } from '../NavigationBar';

import { NavigationBarFullExample, NavigationBarTitle } from './NavigationStorySetup';

export default {
  component: NavigationBar,
  title: 'Core Components/Navigation/NavigationBar',
};

const a11ySkipConfig = {
  config: {
    /**
     * The TabNavigation docs explain the proper way to setup the tabpanel.
     * Disabled because CDS TabNavigation doesn't have associated panels.
     * @link https://cds.cbhq.net/components/tab-navigation#accessibility
     * */
    rules: [{ id: 'aria-valid-attr-value', enabled: false }],
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
