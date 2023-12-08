import { ContainedAssetCardBaseProps } from '@cbhq/cds-common';
import { assets, ethBackground } from '@cbhq/cds-common/internal/data/assets';
import { subheadIconSignMap } from '@cbhq/cds-common/tokens/sparkline';

import { HStack, VStack } from '../../layout';
import { FeatureFlagProvider } from '../../system';
import { TextLabel2 } from '../../typography';
import { enableJavascript } from '../../utils/storybookParams/percy';
import { ContainedAssetCard } from '../ContainedAssetCard';

const a11ySkipConfig = {
  config: {
    rules: [{ id: 'color-contrast', enabled: false }],
  },
};

const onPressConsole = console.log;

const exampleProps: ContainedAssetCardBaseProps = {
  title: 'Title',
  description: 'Description',
  subtitle: 'Subtitle',
  header: (
    <img
      alt="Image Alt"
      aria-hidden="true"
      height="32px"
      src={ethBackground}
      style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '100%' }}
      width="32px"
    />
  ),
  onPress: onPressConsole,
} as const;

const examplePropsWithChildren: ContainedAssetCardBaseProps = {
  ...exampleProps,
  children: (
    <img
      alt="Image Alt"
      aria-hidden="true"
      height="100%"
      src={ethBackground}
      style={{ objectFit: 'cover' }}
      width="100%"
    />
  ),
} as const;

export const Default = (): JSX.Element => {
  return (
    <FeatureFlagProvider frontier>
      <VStack>
        <ContainedAssetCard {...exampleProps} />
      </VStack>
    </FeatureFlagProvider>
  );
};

export const LongText = (): JSX.Element => {
  return (
    <FeatureFlagProvider frontier>
      <VStack>
        <ContainedAssetCard
          {...exampleProps}
          description="This is a very long description text that will get truncated"
          subtitle="This is a very long subtitle text that will get truncated"
          title="This is a very long title text that will get truncated"
        />
        <ContainedAssetCard
          {...examplePropsWithChildren}
          description="This is a very long description text that will get truncated"
          size="l"
          subtitle="This is a very long subtitle text that will get truncated"
          title="This is a very long title text that will get truncated"
        />
      </VStack>
    </FeatureFlagProvider>
  );
};

export const Vertical = (): JSX.Element => {
  return (
    <FeatureFlagProvider frontier>
      <VStack gap={1}>
        <ContainedAssetCard {...exampleProps} />
        <ContainedAssetCard {...exampleProps} size="l" />
        <ContainedAssetCard {...examplePropsWithChildren} size="l" />
      </VStack>
    </FeatureFlagProvider>
  );
};

export const Horizontal = (): JSX.Element => {
  return (
    <FeatureFlagProvider frontier>
      <HStack gap={1}>
        <ContainedAssetCard {...exampleProps} />
        <ContainedAssetCard {...exampleProps} size="l" />
        <ContainedAssetCard {...examplePropsWithChildren} size="l" />
      </HStack>
    </FeatureFlagProvider>
  );
};

export const Custom = (): JSX.Element => {
  return (
    <FeatureFlagProvider frontier>
      <ContainedAssetCard
        {...exampleProps}
        description={
          <TextLabel2 as="p" color="positive">
            {subheadIconSignMap.upwardTrend}6.37%
          </TextLabel2>
        }
        header={
          <img
            alt="Image Alt"
            aria-hidden="true"
            height="32px"
            src={assets.uni.imageUrl}
            style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '100%' }}
            width="32px"
          />
        }
        subtitle="UNI"
        title="$0.87"
      />
    </FeatureFlagProvider>
  );
};

Custom.parameters = {
  percy: enableJavascript,
  a11y: a11ySkipConfig,
};

export const Carousel = (): JSX.Element => (
  <FeatureFlagProvider frontier>
    <HStack gap={2} overflow="scroll">
      <ContainedAssetCard {...exampleProps} />
      <ContainedAssetCard {...exampleProps} size="l" />
      <ContainedAssetCard {...examplePropsWithChildren} size="l" />
    </HStack>
  </FeatureFlagProvider>
);

export default {
  title: 'Core Components/Cards/ContainedAssetCard',
  component: ContainedAssetCard,
};
