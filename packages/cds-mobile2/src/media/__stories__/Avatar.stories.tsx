import React from 'react';
import { AvatarBaseProps, AvatarSize } from '@cbhq/cds-common2';
import { getAvatarFallbackColor } from '@cbhq/cds-common2/media/getAvatarFallbackColor';

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
    <HStack alignItems="center" flexWrap="wrap" gap={dense ? 0.5 : 2}>
      {names.map((name, idx) => {
        const avatarFallbackColor = getAvatarFallbackColor(name);
        return (
          <Avatar
            key={name}
            alt=""
            colorScheme={idx === 0 ? 'blue' : avatarFallbackColor}
            name={name}
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
        <HStack alignItems="center" flexWrap="wrap" gap={2}>
          <Avatar alt="" src={image} />
          <Avatar alt="" name="Happy" shape="square" src={image} />
          <Avatar alt="" name="Grumpy" shape="hexagon" src={image} />
          <Avatar alt="" borderColor="bgPositive" name="Sleepy" src={image} />
          <Avatar alt="" name="Bashful" size="m" src={image} />
          <Avatar alt="" name="Grumpy" size="l" src={image} />
          <Avatar alt="" name="Grumpy" size="xl" src={image} />
          <Avatar alt="" name="Grumpy" size="xxl" src={image} />
          <Avatar alt="" name="Grumpy" size="xxxl" src={image} />
        </HStack>
      </Example>

      <Example title="Fallback Image">
        <HStack alignItems="center" flexWrap="wrap" gap={2}>
          <Avatar alt="" />
          <Avatar alt="" shape="square" />
          <Avatar alt="" shape="hexagon" />
          <Avatar alt="" borderColor="bgPositive" />
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
          <FallbackColoredBase key={`fallback-sizes-${size}`} size={size} />
        ))}
      </Example>
    </ExampleScreen>
  );
};

export default AvatarScreen;
