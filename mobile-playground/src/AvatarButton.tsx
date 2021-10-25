import React, { useState, useCallback } from 'react';
import { HStack, VStack } from '@cbhq/cds-mobile/layout';
import { AvatarButton } from '@cbhq/cds-mobile/buttons/AvatarButton';
import { View, Text } from 'react-native';
import ExamplesScreen from './internal/ExamplesScreen';
import Example from './internal/Example';

const avatarImageUrl = 'https://uifaces.co/our-content/donated/fyXUlj0e.jpg';

const AvatarButtonScreen = () => {
  const [numPresses, setNumPresses] = useState(0);

  const handlePress = useCallback(() => {
    setNumPresses((num) => num + 1);
  }, [setNumPresses]);

  return (
    <ExamplesScreen>
      <View>
        <Text>Number of presses: {numPresses}</Text>
      </View>
      <Example title="Normal">
        <VStack gap={2}>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <AvatarButton alt="Sneezy" src={avatarImageUrl} onPress={handlePress} />
          </HStack>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <AvatarButton alt="Sneezy" onPress={handlePress} />
          </HStack>
        </VStack>
      </Example>

      <Example title="Loading">
        <VStack gap={2}>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <AvatarButton alt="Sneezy" src={avatarImageUrl} onPress={handlePress} loading />
          </HStack>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <AvatarButton alt="Sneezy" onPress={handlePress} loading />
          </HStack>
        </VStack>
      </Example>

      <Example title="Disabled">
        <VStack gap={2}>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <AvatarButton alt="Sneezy" src={avatarImageUrl} onPress={handlePress} disabled />
          </HStack>
          <HStack gap={2} alignItems="center" flexWrap="wrap">
            <AvatarButton alt="Sneezy" onPress={handlePress} disabled />
          </HStack>
        </VStack>
      </Example>
    </ExamplesScreen>
  );
};

export default AvatarButtonScreen;
