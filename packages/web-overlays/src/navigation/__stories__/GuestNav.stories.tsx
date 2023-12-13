import { Meta, Story } from '@storybook/react';
import { VStack } from '@cbhq/cds-web/layout';
import { FeatureFlagProvider, ThemeProvider } from '@cbhq/cds-web/system';

import { Content, PrimaryNav, SecondaryNav } from './GuestNav';

export const GuestNav = () => (
  <VStack gap={0} offset={0} spacing={0} zIndex={0}>
    <VStack background="background" elevation={0} position="sticky" top={0}>
      <PrimaryNav />
      <SecondaryNav />
    </VStack>
    <Content />
  </VStack>
);

const Template: Story<unknown> = () => (
  <FeatureFlagProvider frontier>
    <ThemeProvider>
      <VStack left={0} overflow="clip" position="absolute" top={0}>
        <GuestNav />
      </VStack>
    </ThemeProvider>
  </FeatureFlagProvider>
);

export const Default = Template.bind({});

Default.args = {};

export default {
  title: 'Core Components/Navigation/GuestNav',
  component: GuestNav,
} as Meta;
