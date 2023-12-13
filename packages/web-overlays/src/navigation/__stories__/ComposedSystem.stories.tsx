import React from 'react';
import { Story } from '@storybook/react';
import { Spacer, VStack } from '@cbhq/cds-web/layout';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider, ThemeProvider } from '@cbhq/cds-web/system';
import { TextTitle1 } from '@cbhq/cds-web/typography';

import { ComposedSystem } from './NavigationStorySetup';

export default {
  component: ComposedSystem,
  title: 'Core Components/Navigation/System',
};

const FullSystemExample: Story = () => {
  return (
    <PortalProvider>
      <FeatureFlagProvider frontier>
        <ThemeProvider>
          <VStack alignItems="flex-start">
            <TextTitle1 as="h1">A full system example</TextTitle1>
            <Spacer />
            <ComposedSystem />
          </VStack>
        </ThemeProvider>
      </FeatureFlagProvider>
    </PortalProvider>
  );
};

export { FullSystemExample };
