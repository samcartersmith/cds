import React from 'react';
import { AvatarBaseProps, AvatarSize } from '@cbhq/cds-common';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../Avatar';

const image = 'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';
const sizes: AvatarSize[] = ['m', 'l', 'xl', 'xxl', 'xxxl'];
const names = ['Sneezy', 'Happy', 'Sleepy', 'Doc', 'Bashful', 'Grumpy', 'Dopey', 'Lilo', 'Stitch'];

const FallbackColoredBase = ({
  shape,
  size,
  dense = true,
}: Pick<AvatarBaseProps, 'shape' | 'size'> & { dense?: boolean }) => {
  return (
    <HStack gap={dense ? 0.5 : 2} alignItems="center" flexWrap="wrap">
      {names.map((name, idx) => {
        const avatarFallbackColor = getAvatarFallbackColor(name);
        return (
          <Avatar
            alt=""
            key={name}
            name={name}
            colorScheme={idx === 0 ? 'blue' : avatarFallbackColor}
            shape={shape}
            size={size}
          />
        );
      })}
    </HStack>
  );
};

const AvatarScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Normal">
        <HStack gap={2} alignItems="center" flexWrap="wrap">
          <Avatar alt="" src={image} />
          <Avatar alt="" name="Happy" src={image} shape="square" />
          <Avatar alt="" name="Sleepy" src={image} borderColor="positive" />
          <Avatar alt="" name="Bashful" src={image} size="m" />
          <Avatar alt="" name="Grumpy" src={image} size="l" />
          <Avatar alt="" name="Grumpy" src={image} size="xl" />
          <Avatar alt="" name="Grumpy" src={image} size="xxl" />
          <Avatar alt="" name="Grumpy" src={image} size="xxxl" />
        </HStack>
      </Example>

      <Example title="Fallback Image">
        <HStack gap={2} alignItems="center" flexWrap="wrap">
          <Avatar alt="" />
          <Avatar alt="" shape="square" />
          <Avatar alt="" borderColor="positive" />
          <Avatar alt="" size="m" />
          <Avatar alt="" size="l" />
          <Avatar alt="" size="xl" />
          <Avatar alt="" size="xxl" />
          <Avatar alt="" size="xxxl" />
        </HStack>
      </Example>
      <Example title="Fallback Colored Default">
        <VStack gap={2}>
          <FallbackColoredBase />
        </VStack>
      </Example>
      <Example title="Fallback Colored Square">
        <FallbackColoredBase shape="square" />
      </Example>
      <Example title="Fallback Sizes">
        {sizes.map((size) => (
          <FallbackColoredBase size={size} />
        ))}
      </Example>
    </ExampleScreen>
  );
};

export default AvatarScreen;
