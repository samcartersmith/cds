import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../Avatar';

const image = 'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';

const AvatarScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Normal">
        <VStack gap={2}>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <Avatar alt="Sneezy" src={image} />
            <Avatar alt="Happy" src={image} shape="square" />
            <Avatar alt="Sleepy" src={image} borderColor="positive" />
            <Avatar alt="Bashful" src={image} size="m" />
            <Avatar alt="Grumpy" src={image} size="l" />
            <Avatar alt="Grumpy" src={image} size="xl" />
            <Avatar alt="Grumpy" src={image} size="xxl" />
            <Avatar alt="Grumpy" src={image} size="xxxl" />
          </HStack>
        </VStack>
      </Example>

      <Example title="Fallback">
        <VStack gap={2}>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <Avatar alt="Sneezy" />
            <Avatar alt="Happy" shape="square" />
            <Avatar alt="Sleepy" borderColor="positive" />
            <Avatar alt="Bashful" size="m" />
            <Avatar alt="Grumpy" size="l" />
            <Avatar alt="Grumpy" size="xl" />
            <Avatar alt="Grumpy" size="xxl" />
            <Avatar alt="Grumpy" size="xxxl" />
          </HStack>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default AvatarScreen;
