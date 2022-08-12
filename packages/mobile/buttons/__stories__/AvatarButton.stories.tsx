import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { AvatarButton, AvatarButtonProps } from '../AvatarButton';

const avatarImageUrl =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';
const names = ['Sneezy', 'Happy', 'Sleepy', 'Doc', 'Bashful', 'Grumpy', 'Dopey', 'Lilo', 'Stitch'];

const FallbackColoredBase = ({
  dense = true,
  ...props
}: Pick<AvatarButtonProps, 'shape' | 'loading' | 'compact'> & { dense?: boolean }) => {
  return (
    <HStack gap={dense ? 0.5 : 2} alignItems="center" flexWrap="wrap">
      {names.map((name, idx) => {
        const avatarFallbackColor = getAvatarFallbackColor(name);
        return (
          <AvatarButton
            key={name}
            alt=""
            name={name}
            colorScheme={idx === 0 ? 'blue' : avatarFallbackColor}
            {...props}
          />
        );
      })}
    </HStack>
  );
};

const AvatarButtonScreen = () => {
  const [numPresses, setNumPresses] = useState(0);

  const handlePress = useCallback(() => {
    setNumPresses((num) => num + 1);
  }, [setNumPresses]);

  return (
    <ExampleScreen>
      <View>
        <Text>Number of presses: {numPresses}</Text>
      </View>
      <Example title="Normal">
        <VStack gap={2}>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <AvatarButton alt="Sneezy" src={avatarImageUrl} onPress={handlePress} />
            <AvatarButton alt="Sneezy" src={avatarImageUrl} onPress={handlePress} compact />
          </HStack>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <AvatarButton alt="Sneezy" onPress={handlePress} />
            <AvatarButton alt="Sneezy" onPress={handlePress} compact />
          </HStack>
        </VStack>
      </Example>

      <Example title="Loading">
        <VStack gap={2}>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <AvatarButton alt="Sneezy" src={avatarImageUrl} onPress={handlePress} loading />
            <AvatarButton alt="Sneezy" src={avatarImageUrl} onPress={handlePress} loading compact />
          </HStack>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <AvatarButton alt="Sneezy" onPress={handlePress} loading />
            <AvatarButton alt="Sneezy" onPress={handlePress} loading compact />
          </HStack>
        </VStack>
      </Example>
      <Example title="Colored Fallback">
        <FallbackColoredBase />
      </Example>
      <Example title="Colored Fallback Loading">
        <FallbackColoredBase loading />
      </Example>
      <Example title="Colored Fallback Compact">
        <FallbackColoredBase compact />
      </Example>
      <Example title="Colored Fallback Compact Loading">
        <FallbackColoredBase compact loading />
      </Example>
      <Example title="Colored Fallback Square">
        <FallbackColoredBase shape="square" />
      </Example>
    </ExampleScreen>
  );
};

export default AvatarButtonScreen;
