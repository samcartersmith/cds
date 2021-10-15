import React from 'react';
import { HStack, VStack } from '@cbhq/cds-mobile/layout';
import { Avatar } from '@cbhq/cds-mobile/avatar';
import ExamplesScreen from './internal/ExamplesScreen';
import Example from './internal/Example';

const image48 = 'https://images.coinbase.com/avatar?s=48';
const image56 = 'https://images.coinbase.com/avatar?s=56';
const image80 = 'https://images.coinbase.com/avatar?s=80';
const image40 = 'https://images.coinbase.com/avatar?s=40';

const AvatarScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Normal Size">
        <VStack gap={2}>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <Avatar name="Sneezy" src={image80} />
            <Avatar name="Dopey" src={image56} shape="squircle" />
            <Avatar name="Happy" src={image56} shape="square" />
            <Avatar name="Sleepy" src={image56} borderColor="positive" />
            <Avatar name="Bashful" src={image48} size={48} />
            <Avatar name="Grumpy" src={image80} size={80} />
          </HStack>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <Avatar name="Sneezy" />
            <Avatar name="Dopey" shape="squircle" />
            <Avatar name="Happy" shape="square" />
            <Avatar name="Sleepy" borderColor="positive" />
            <Avatar name="Bashful" size={48} />
            <Avatar name="Grumpy" size={80} />
            <Avatar name="Grumpy" size={30} />
          </HStack>
        </VStack>
      </Example>
      <Example title="Compact Size">
        <VStack gap={2}>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <Avatar name="Sneezy" src={image40} compact />
            <Avatar name="Dopey" src={image40} compact shape="squircle" />
            <Avatar name="Happy" src={image40} shape="square" compact />
            <Avatar name="Sleepy" src={image40} borderColor="positive" compact />
          </HStack>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <Avatar name="Sneezy" compact />
            <Avatar name="Dopey" shape="squircle" compact />
            <Avatar name="Happy" shape="square" compact />
            <Avatar name="Sleepy" borderColor="positive" compact />
          </HStack>
        </VStack>
      </Example>
    </ExamplesScreen>
  );
};

export default AvatarScreen;
