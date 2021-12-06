import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';

import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { AvatarButton } from '../AvatarButton';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const avatarImageUrl = 'https://uifaces.co/our-content/donated/fyXUlj0e.jpg';

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
    </ExampleScreen>
  );
};

export default AvatarButtonScreen;
