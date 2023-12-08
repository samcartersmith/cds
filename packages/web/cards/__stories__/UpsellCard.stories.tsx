import { coinbaseOneLogo } from '@cbhq/cds-common/internal/data/assets';

import { Button } from '../../buttons';
import { usePaletteValueToRgbaString } from '../../color/usePaletteValueToRgbaString';
import { HStack, VStack } from '../../layout';
import { FeatureFlagProvider } from '../../system';
import { TextHeadline, TextLabel2 } from '../../typography';
import { UpsellCard } from '../UpsellCard';

const onPressConsole = console.log;

const exampleProps = {
  title: 'Headline',
  description: 'Check out the most popular assets',
  action: 'Buy Bitcoin now',
  media: <img alt="" data-testid="media" src={coinbaseOneLogo as string} width={120} />,
  background: 'primaryWash',
  onActionPress: onPressConsole,
  onDismissPress: onPressConsole,
} as const;

export const Default = (): JSX.Element => (
  <FeatureFlagProvider frontier>
    <UpsellCard {...exampleProps} />
  </FeatureFlagProvider>
);

export const Vertical = (): JSX.Element => (
  <FeatureFlagProvider frontier>
    <VStack gap={1.5}>
      <UpsellCard {...exampleProps} />
      <UpsellCard {...exampleProps} />
    </VStack>
  </FeatureFlagProvider>
);

export const Horizontal = (): JSX.Element => (
  <FeatureFlagProvider frontier>
    <HStack gap={1.5}>
      <UpsellCard {...exampleProps} />
      <UpsellCard {...exampleProps} />
    </HStack>
  </FeatureFlagProvider>
);

export const LongText = (): JSX.Element => (
  <FeatureFlagProvider frontier>
    <UpsellCard
      {...exampleProps}
      action="This is a really long action"
      description="This is a really long description for the UpsellCard component"
      title="This is a really long title."
    />
  </FeatureFlagProvider>
);

export const CustomTextNodes = (): JSX.Element => {
  const backgroundColor = usePaletteValueToRgbaString('blue80');
  return (
    <FeatureFlagProvider frontier>
      <UpsellCard
        {...exampleProps}
        action={
          <Button
            compact
            flush="start"
            numberOfLines={1}
            onPress={onPressConsole}
            variant="secondary"
          >
            Sign up
          </Button>
        }
        dangerouslySetBackground={backgroundColor}
        description={
          <TextLabel2 as="p" color="primaryForeground">
            Start your free 30 day trial of Coinbase One
          </TextLabel2>
        }
        title={
          <TextHeadline as="h3" color="primaryForeground">
            Coinbase One
          </TextHeadline>
        }
      />
    </FeatureFlagProvider>
  );
};

export const CustomBackground = (): JSX.Element => {
  const backgroundColor = usePaletteValueToRgbaString('yellow20');
  return (
    <FeatureFlagProvider frontier>
      <UpsellCard {...exampleProps} dangerouslySetBackground={backgroundColor} />
    </FeatureFlagProvider>
  );
};

export const CustomWidth = (): JSX.Element => (
  <FeatureFlagProvider frontier>
    <UpsellCard {...exampleProps} width="100%" />
  </FeatureFlagProvider>
);

export const Carousel = (): JSX.Element => (
  <FeatureFlagProvider frontier>
    <HStack gap={2} overflow="scroll">
      <UpsellCard {...exampleProps} />
      <UpsellCard {...exampleProps} />
      <UpsellCard {...exampleProps} />
      <UpsellCard {...exampleProps} />
    </HStack>
  </FeatureFlagProvider>
);

export default {
  title: 'Core Components/Cards/UpsellCard',
  component: UpsellCard,
};
