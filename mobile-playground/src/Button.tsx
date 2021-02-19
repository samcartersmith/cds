import React from 'react';

import { Button } from '@cds/mobile';
import { GestureResponderEvent } from 'react-native';

import Example from './internal/Example';
import Screen from './internal/Screen';

function onPress(event: GestureResponderEvent) {
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const ButtonScreen = () => {
  return (
    <Screen>
      <Example inline>
        <Button onPress={onPress}>Button</Button>
        <Button compact onPress={onPress}>
          Compact button
        </Button>

        <Button block onPress={onPress}>
          Full-width button
        </Button>
        <Button compact block onPress={onPress}>
          Compact full-width button
        </Button>
      </Example>

      <Example title="States" inline>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </Example>

      <Example title="Variants" inline>
        <Button variant="primary">Primary</Button>
        <Button compact variant="primary">
          Compact primary
        </Button>

        <Button variant="secondary">Secondary</Button>
        <Button compact variant="secondary">
          Compact secondary
        </Button>

        <Button variant="positive">Positive</Button>
        <Button compact variant="positive">
          Compact positive
        </Button>

        <Button variant="negative">Negative</Button>
        <Button compact variant="negative">
          Compact negative
        </Button>
      </Example>
    </Screen>
  );
};

export default ButtonScreen;
