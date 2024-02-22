import React from 'react';
import { useToggler } from '@cbhq/cds-common';
import { defaultNudgeCardWidth } from '@cbhq/cds-common/tokens/card';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';
import { PictogramName } from '@cbhq/cds-illustrations';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { Carousel } from '../../media/Carousel/Carousel';
import { TextBody, TextHeadline } from '../../typography';
import { NudgeCard } from '../NudgeCard';

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

const handleDismiss = () => {
  console.log('dismissed');
};

const NudgeCardScreen = () => {
  const [dismissed, { toggleOff }] = useToggler(false);
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
      <Example title="Number of lines is 1">
        <NudgeCard {...exampleProps} numberOfLines={1} />
      </Example>
      <Example title="Long strings">
        <NudgeCard {...longProps} />
      </Example>
      <Example title="Carousel">
        <Carousel
          items={[
            <NudgeCard
              key="carouselItem1"
              width={defaultNudgeCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
            <NudgeCard
              key="carouselItem2"
              width={defaultNudgeCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
            <NudgeCard
              key="carouselItem3"
              width={defaultNudgeCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
            <NudgeCard
              key="carouselItem4"
              width={defaultNudgeCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
          ]}
        />
      </Example>
      <Example title="Custom dimensions">
        <NudgeCard {...exampleProps} height={150} numberOfLines={1} width={250} />
        <NudgeCard {...exampleProps} minHeight={200} minWidth={380} numberOfLines={5} />
        <NudgeCard {...exampleProps} maxHeight={150} maxWidth={250} numberOfLines={1} />
        <NudgeCard {...compactProps} minWidth={350} />
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
