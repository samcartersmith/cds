import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ContainedAssetCardBaseProps } from '@cbhq/cds-common';
import { assets, ethBackground } from '@cbhq/cds-common/internal/data/assets';
import { subheadIconSignMap } from '@cbhq/cds-common/tokens/sparkline';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { usePaletteValueToRgbaString } from '../../color/usePaletteValueToRgbaString';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Carousel } from '../../media';
import { TextLabel2 } from '../../typography';
import { ContainedAssetCard } from '../ContainedAssetCard';

const styles = StyleSheet.create({
  media: {
    width: 32,
    height: 32,
    objectFit: 'cover',
    borderRadius: 100,
  },
  children: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const exampleProps: ContainedAssetCardBaseProps = {
  title: '$0.87',
  description: '10%',
  subtitle: 'UNI',
  header: (
    <Image
      accessibilityIgnoresInvertColors
      source={{
        uri: ethBackground,
      }}
      style={styles.media}
    />
  ),
  onPress: NoopFn,
};

const ContainedAssetCardScreen = () => {
  const customUpwardTrendColor = usePaletteValueToRgbaString('green60');

  return (
    <ExampleScreen>
      <Example title="ContainedAssetCard">
        <ContainedAssetCard {...exampleProps} />
      </Example>
      <Example title="ContainedAssetCard large">
        <ContainedAssetCard {...exampleProps} size="l" />
      </Example>
      <Example title="ContainedAssetCard large with child">
        <ContainedAssetCard {...exampleProps} size="l">
          <Image
            accessibilityIgnoresInvertColors
            source={{
              uri: ethBackground,
            }}
            style={styles.children}
          />
        </ContainedAssetCard>
      </Example>
      <Example title="ContainedAssetCard with long text">
        <ContainedAssetCard
          {...exampleProps}
          description="This is a very long description text that will get truncated"
          size="l"
          subtitle="This is a very long subtitle text that will get truncated"
          title="This is a very long title text that will get truncated"
        >
          <Image
            accessibilityIgnoresInvertColors
            source={{
              uri: ethBackground,
            }}
            style={styles.children}
          />
        </ContainedAssetCard>
      </Example>
      <Example title="ContainedAssetCard with custom text nodes">
        <ContainedAssetCard
          {...exampleProps}
          description={
            <TextLabel2 accessibilityLabel="Up 6.37%" dangerouslySetColor={customUpwardTrendColor}>
              {subheadIconSignMap.upwardTrend}6.37%
            </TextLabel2>
          }
          header={
            <Image
              accessibilityIgnoresInvertColors
              source={{
                uri: assets.uni.imageUrl,
              }}
              style={styles.media}
            />
          }
          subtitle="UNI"
          title="$0.87"
        />
      </Example>
      <Example title="Carousel">
        <Carousel
          gap={1.5}
          items={[
            <ContainedAssetCard key="carouselItem1" {...exampleProps} />,
            <ContainedAssetCard key="carouselItem2" {...exampleProps} size="l" />,
            <ContainedAssetCard key="carouselItem3" {...exampleProps} size="l">
              <Image
                accessibilityIgnoresInvertColors
                source={{
                  uri: ethBackground,
                }}
                style={styles.children}
              />
            </ContainedAssetCard>,
          ]}
        />
      </Example>
    </ExampleScreen>
  );
};

export default ContainedAssetCardScreen;
