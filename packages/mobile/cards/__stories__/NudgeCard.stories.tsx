import React from 'react';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useToggler } from '@cbhq/cds-common';
import { squareAssets } from '@cbhq/cds-common/internal/data/assets';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { PictogramName } from '@cbhq/cds-illustrations';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { Carousel } from '../../media/Carousel/Carousel';
import { TextBody, TextHeadline, TextTitle3 } from '../../typography';
import { NudgeCard } from '../NudgeCard';

const styles = StyleSheet.create({
  customMediaStyles: {
    height: 60,
    width: 60,
  },
});

const exampleProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT. ',
  pictogram: 'coinbaseOneLogo' as PictogramName,
  action: 'Join the movement',
  onActionPress: NoopFn,
};

const compactProps = {
  title: 'Try this new thing',
  description: 'It will take you to the moon, I promise.',
  pictogram: 'wrapEth' as PictogramName,
  onPress: NoopFn,
};

const longProps = {
  action: 'Do the thing',
  title: 'Long title text that will overflow to the next line',
  description:
    'This is a super long description that will increase the height of the card to automagically fit the content.',
  numberOfLines: 4,
  pictogram: 'addWallet' as PictogramName,
};

const exampleMediaProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT. ',
  action: 'Join the movement',
  onActionPress: NoopFn,
  media: (
    <Image
      accessibilityIgnoresInvertColors
      alt="placeholder"
      source={{ uri: squareAssets.human2 }}
      style={styles.customMediaStyles}
    />
  ),
};

const compactMediaProps = {
  title: 'Try this new thing',
  description: 'It will take you to the moon, I promise. WAGMI!',
  action: undefined,
  onActionPress: undefined,
  media: (
    <Image
      accessibilityIgnoresInvertColors
      alt="placeholder"
      source={{ uri: squareAssets.human3 }}
      style={styles.customMediaStyles}
    />
  ),
};

const handleDismiss = () => {
  console.log('dismissed');
};

const NudgeCardScreen = () => {
  const [dismissed, { toggleOff }] = useToggler(false);
  const windowWidth = useWindowDimensions().width;
  const carouselCardWidth = windowWidth - 48;
  return (
    <ExampleScreen>
      <Example title="Nudge Card">
        <VStack gap={2}>
          <NudgeCard {...exampleProps} />
          {!dismissed && <NudgeCard {...exampleProps} onDismissPress={toggleOff} />}
        </VStack>
      </Example>
      <Example title="Compact">
        <NudgeCard {...compactProps} />
        <NudgeCard {...compactProps} onDismissPress={handleDismiss} />
      </Example>
      <Example title="Nudge Card Custom Media">
        <VStack gap={2}>
          <NudgeCard {...exampleMediaProps} />
          {!dismissed && <NudgeCard {...exampleMediaProps} onDismissPress={toggleOff} />}
          <NudgeCard {...compactMediaProps} />
          <NudgeCard {...compactMediaProps} onDismissPress={handleDismiss} />
        </VStack>
      </Example>
      <Example title="Number of lines is 1">
        <NudgeCard {...exampleProps} numberOfLines={1} />
      </Example>
      <Example title="Long strings">
        <NudgeCard {...longProps} />
      </Example>
      <VStack gap={2} spacing={3}>
        <TextTitle3>Carousel</TextTitle3>
        <Carousel
          gap={1}
          items={[
            <NudgeCard
              key="carouselItem1"
              width={carouselCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
            <NudgeCard
              key="carouselItem2"
              width={carouselCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
            <NudgeCard
              key="carouselItem3"
              width={carouselCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
            <NudgeCard
              key="carouselItem4"
              width={carouselCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
          ]}
        />
      </VStack>
      <Example title="Custom dimensions">
        <NudgeCard {...exampleProps} maxHeight={150} numberOfLines={1} width={250} />
        <NudgeCard {...compactProps} width={350} />
      </Example>
      <Example title="Custom nodes">
        <NudgeCard
          {...exampleProps}
          action={
            <HStack spacingBottom={1}>
              <Button compact onPress={NoopFn}>
                Custom action
              </Button>
            </HStack>
          }
          description={<TextBody color="foregroundMuted">Custom description</TextBody>}
          title={<TextHeadline color="primary">Custom title</TextHeadline>}
        />
      </Example>
    </ExampleScreen>
  );
};

export default NudgeCardScreen;
