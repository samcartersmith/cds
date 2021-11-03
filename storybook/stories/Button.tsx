import React from 'react';
import { BoxBaseProps, ButtonBaseProps, Spectrum, Scale, StackBaseProps } from '@cbhq/cds-common';
import { FeatureFlagProvider } from '@cbhq/cds-common/system/FeatureFlagProvider';
import { SystemProviderProps } from '@cbhq/cds-common/SystemProvider';

const onPressConsole = () => console.log('pressed');

export type CreateButtonStoriesParams = {
  Button: React.ComponentType<ButtonBaseProps & { onPress?: () => void }>;
  ThemeProvider: React.ComponentType<SystemProviderProps>;
  VStack: React.ComponentType<BoxBaseProps & StackBaseProps>;
  frontier?: boolean;
  spectrum?: Spectrum;
  scale?: Scale;
};

export function createButtonStories({
  Button,
  ThemeProvider,
  VStack,
  spectrum,
  scale,
  frontier,
}: CreateButtonStoriesParams) {
  const Defaults = () => (
    <FeatureFlagProvider frontier={frontier}>
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack background alignItems="flex-start" width="100%" gap={3}>
          <Button onPress={onPressConsole}>Button</Button>
          <Button compact onPress={onPressConsole}>
            Compact button
          </Button>
          <Button block onPress={onPressConsole}>
            Full-width button
          </Button>
          <Button compact block onPress={onPressConsole}>
            Compact full-width button
          </Button>
        </VStack>
      </ThemeProvider>
    </FeatureFlagProvider>
  );

  const States = () => (
    <FeatureFlagProvider frontier={frontier}>
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack background alignItems="flex-start" width="100%" gap={3}>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button disabled variant="secondary">
            Secondary Disabled
          </Button>
          <Button disabled variant="negative">
            Negative Disabled
          </Button>
        </VStack>
      </ThemeProvider>
    </FeatureFlagProvider>
  );

  const Variants = () => (
    <FeatureFlagProvider frontier={frontier}>
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack background alignItems="flex-start" width="100%" gap={3}>
          <Button variant="primary">Primary</Button>
          <Button transparent variant="primary">
            Primary
          </Button>
          <Button compact variant="primary">
            Compact primary
          </Button>
          <Button compact disabled variant="primary">
            Compact primary
          </Button>

          <Button variant="secondary">Secondary</Button>
          <Button transparent variant="secondary">
            Secondary
          </Button>
          <Button compact variant="secondary">
            Compact secondary
          </Button>
          <Button compact disabled variant="secondary">
            Compact secondary
          </Button>

          <Button variant="positive">Positive</Button>
          <Button transparent variant="positive">
            Positive
          </Button>
          <Button compact variant="positive">
            Compact positive
          </Button>
          <Button compact disabled variant="positive">
            Compact positive
          </Button>

          <Button variant="negative">Negative</Button>
          <Button transparent variant="negative">
            Negative
          </Button>
          <Button compact variant="negative">
            Compact negative
          </Button>
          <Button compact disabled variant="negative">
            Compact negative
          </Button>
        </VStack>
      </ThemeProvider>
    </FeatureFlagProvider>
  );

  const Icons = () => (
    <FeatureFlagProvider frontier={frontier}>
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack background alignItems="flex-start" width="100%" gap={3}>
          <Button startIcon="arrowLeft">With start icon</Button>
          <Button compact startIcon="arrowLeft">
            With start icon
          </Button>

          <Button endIcon="arrowRight" variant="secondary">
            With end icon
          </Button>
          <Button compact endIcon="arrowRight" variant="secondary">
            With end icon
          </Button>

          <Button startIcon="wireTransfer" endIcon="questionMark" variant="positive">
            With both icons
          </Button>
          <Button compact startIcon="wireTransfer" endIcon="questionMark" variant="positive">
            With both icons
          </Button>

          <Button disabled endIcon="sparkle" variant="negative">
            When disabled
          </Button>
          <Button compact disabled startIcon="identityCard" variant="negative">
            When disabled
          </Button>
        </VStack>
      </ThemeProvider>
    </FeatureFlagProvider>
  );

  const BlockWithIcons = () => (
    <FeatureFlagProvider frontier={frontier}>
      <ThemeProvider spectrum={spectrum} scale={scale}>
        <VStack background alignItems="flex-start" width="100%" gap={3}>
          <Button block startIcon="chatBubble">
            With start icon
          </Button>
          <Button block compact startIcon="chatBubble">
            With start icon
          </Button>

          <Button block endIcon="forwardArrow" variant="secondary">
            With end icon
          </Button>
          <Button block compact endIcon="forwardArrow" variant="secondary">
            With end icon
          </Button>

          <Button block startIcon="chatBubble" endIcon="forwardArrow" variant="positive">
            With both icons
          </Button>
          <Button block compact startIcon="chatBubble" endIcon="forwardArrow" variant="positive">
            With both icons
          </Button>

          <Button block disabled endIcon="forwardArrow" variant="negative">
            When disabled
          </Button>
          <Button block compact disabled startIcon="chatBubble" variant="negative">
            When disabled
          </Button>
        </VStack>
      </ThemeProvider>
    </FeatureFlagProvider>
  );

  return {
    Defaults,
    States,
    Variants,
    Icons,
    BlockWithIcons,
  };
}
