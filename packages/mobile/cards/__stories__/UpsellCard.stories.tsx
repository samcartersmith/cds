import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { coinbaseOneLogo } from '@cbhq/cds-common/internal/data/assets';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button } from '../../buttons/Button';
import { usePaletteValueToRgbaString } from '../../color/usePaletteValueToRgbaString';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useLargeTextStyles } from '../../hooks/useLargeTextStyles';
import { Carousel } from '../../media';
import { FeatureFlagProvider } from '../../system';
import { TextHeadline, TextLabel2 } from '../../typography';
import { UpsellCard } from '../UpsellCard';

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 174,
    position: 'relative',
    left: 10,
  },
});

const exampleProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT. ',
  media: (
    <Image
      accessibilityIgnoresInvertColors
      alt="Send a crypto gift illustration"
      source={{ uri: coinbaseOneLogo }}
      style={styles.image}
    />
  ),
  action: 'Join the movement',
  onActionPress: NoopFn,
  onDismissPress: NoopFn,
};

const UpsellCardScreen = () => {
  const customTextNodeColor = usePaletteValueToRgbaString('gray0');
  const customTextNodeBackgroundColor = usePaletteValueToRgbaString('blue80');
  const customBackgroundColor = usePaletteValueToRgbaString('purple70');

  const defaultBackground = usePaletteValueToRgbaString('teal20');
  const largeTextStyle = useLargeTextStyles();

  return (
    <FeatureFlagProvider frontier>
      <ExampleScreen>
        <Example title="Upsell Card">
          <UpsellCard {...exampleProps} dangerouslySetBackground={defaultBackground} />
        </Example>
        <Example title="Long action button text">
          <UpsellCard
            {...exampleProps}
            action="This is a very long action button text that will get truncated"
            dangerouslySetBackground={defaultBackground}
            description="This is a very long description text that will get truncated"
            title="This is a very long title text that will get truncated"
          />
        </Example>
        <Example title="Custom Text Nodes">
          <UpsellCard
            {...exampleProps}
            action={
              <Button compact flush="start" numberOfLines={1} onPress={NoopFn} variant="secondary">
                Sign up
              </Button>
            }
            dangerouslySetBackground={customTextNodeBackgroundColor}
            description={
              <TextLabel2
                dangerouslySetColor={customTextNodeColor}
                dangerouslySetStyle={largeTextStyle}
              >
                Start your free 30 day trial of Coinbase One
              </TextLabel2>
            }
            title={
              <TextHeadline
                dangerouslySetColor={customTextNodeColor}
                dangerouslySetStyle={largeTextStyle}
              >
                Coinbase One
              </TextHeadline>
            }
          />
        </Example>
        <Example title="Custom Background color">
          <UpsellCard
            {...exampleProps}
            dangerouslySetBackground={customBackgroundColor}
            description={
              <TextLabel2
                dangerouslySetColor={customTextNodeColor}
                dangerouslySetStyle={largeTextStyle}
              >
                Start your free 30 day trial of Coinbase One
              </TextLabel2>
            }
            title={
              <TextHeadline
                dangerouslySetColor={customTextNodeColor}
                dangerouslySetStyle={largeTextStyle}
              >
                Coinbase One
              </TextHeadline>
            }
          />
        </Example>
        <Example title="Custom Width">
          <UpsellCard {...exampleProps} dangerouslySetBackground={defaultBackground} width="100%" />
        </Example>
        <Example title="Carousel">
          <Carousel
            gap={2}
            items={[
              <UpsellCard
                key="carouselItem1"
                {...exampleProps}
                dangerouslySetBackground={defaultBackground}
              />,
              <UpsellCard
                key="carouselItem2"
                {...exampleProps}
                dangerouslySetBackground={defaultBackground}
              />,
              <UpsellCard
                key="carouselItem3"
                {...exampleProps}
                dangerouslySetBackground={defaultBackground}
              />,
            ]}
          />
        </Example>
      </ExampleScreen>
    </FeatureFlagProvider>
  );
};

export default UpsellCardScreen;
