import React from 'react';
import { NoopFn as noopFn } from '@cbhq/cds-common/utils/mockUtils';
import { PictogramName } from '@cbhq/cds-illustrations';

import { Button } from '../../buttons';
import { HStack, VStack } from '../../layout';
import { TextBody, TextHeadline } from '../../typography';
import { NudgeCard, NudgeCardProps } from '../NudgeCard';

const exampleProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT. ',
  pictogram: 'key' as PictogramName,
  action: 'Join the movement',
  onActionPress: noopFn,
};

const compactProps = {
  title: 'Try this new thing',
  description: 'It will take you to the moon, I promise. WAGMI!',
  pictogram: 'key' as PictogramName,
  action: undefined,
  onActionPress: undefined,
};

const longProps = {
  action: 'Do the thing',
  title: 'Long title text that will overflow to the next line',
  description:
    'This is a super long description that will increase the height of the card to automagically fit the content.',
  numberOfLines: 4,
  pictogram: 'addWallet' as PictogramName,
};

export const Default = (overrides: Partial<NudgeCardProps>) => (
  <VStack gap={2}>
    <NudgeCard {...exampleProps} {...overrides} />
    <NudgeCard {...exampleProps} {...overrides} onDismissPress={noopFn} />
  </VStack>
);

export const Compact = () => (
  <VStack gap={2}>
    <NudgeCard {...compactProps} />
    <NudgeCard {...compactProps} onDismissPress={noopFn} />
  </VStack>
);

export const LongText = () => (
  <HStack gap={2}>
    <NudgeCard {...longProps} />
    <NudgeCard
      description="I'll get truncated after one line"
      numberOfLines={1}
      pictogram="addCard"
      title="I can be multiple lines long even if my description is not"
    />
  </HStack>
);

export const VerticallyStacked = () => (
  <VStack gap={2}>
    <NudgeCard {...exampleProps} />
    <NudgeCard {...exampleProps} />
    <NudgeCard {...exampleProps} />
  </VStack>
);

// TODO: replace this with web Carousel once created
export const Carousel = () => (
  <HStack gap={2} overflow="scroll">
    <NudgeCard {...exampleProps} onDismissPress={noopFn} />
    <NudgeCard {...longProps} numberOfLines={3} onDismissPress={noopFn} />
    <NudgeCard {...exampleProps} />
  </HStack>
);

export const CustomDimensions = () => (
  <VStack gap={2}>
    <NudgeCard
      {...exampleProps}
      height={150}
      minHeight={150}
      minWidth={250}
      numberOfLines={1}
      width={250}
    />
    <NudgeCard {...exampleProps} minWidth={380} numberOfLines={1} width={380} />
    <NudgeCard {...exampleProps} maxHeight={150} maxWidth={250} numberOfLines={1} />
    <NudgeCard {...exampleProps} width="100%" />
  </VStack>
);

export const CustomTextNodes = () => (
  <NudgeCard
    {...exampleProps}
    // spacingBottom cancels out the negative margin on buttons
    action={
      <HStack spacingBottom={1}>
        <Button compact onPress={noopFn}>
          Custom action
        </Button>
      </HStack>
    }
    description={
      <TextBody as="p" color="foregroundMuted">
        Custom description
      </TextBody>
    }
    title={
      <TextHeadline as="h3" color="primary">
        Custom title
      </TextHeadline>
    }
  />
);

export default {
  title: 'Core Components/Cards/NudgeCard',
  component: Default,
};
