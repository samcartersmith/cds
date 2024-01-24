import React from 'react';
import { Story } from '@storybook/react';
import { Spacer, VStack } from '@cbhq/cds-web/layout';
import { NavigationBar } from '@cbhq/cds-web/navigation';
import { FeatureFlagProvider, ThemeProvider } from '@cbhq/cds-web/system';
import { TextTitle1 } from '@cbhq/cds-web/typography';

import { NavigationBarFullExample, NavigationBarTitle } from './NavigationStorySetup';

export default {
  component: NavigationBar,
  title: 'Deprecated/NavigationBar',
};

const a11ySkipConfig = {
  config: {
    /**
     * The TabNavigation docs explain the proper way to setup the tabpanel
     * @link https://cds.cbhq.net/components/tab-navigation#accessibility
     */
    rules: [{ id: 'aria-valid-attr-value', enabled: false }],
  },
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const NavigationBarFullExampleDefault: Story = () => {
  return (
    <FeatureFlagProvider frontierButton frontierColor>
      <ThemeProvider>
        <VStack alignItems="flex-start">
          <TextTitle1 as="h1">Navigation full example</TextTitle1>
          <Spacer />
          <NavigationBarFullExample />
        </VStack>
      </ThemeProvider>
    </FeatureFlagProvider>
  );
};

NavigationBarFullExampleDefault.parameters = {
  a11y: a11ySkipConfig,
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const NavigationBarTitleExample = () => {
  return (
    <VStack alignItems="flex-start">
      <TextTitle1 as="h1">NavigationBar title example</TextTitle1>
      <Spacer />
      <NavigationBarTitle />
    </VStack>
  );
};
