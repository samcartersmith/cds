import React from 'react';
import { Button } from '@cbhq/cds-mobile/buttons/Button';
import { GestureResponderEvent } from 'react-native';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

function onPress(event: GestureResponderEvent) {
  // eslint-disable-next-line no-console
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const ButtonScreen = () => {
  return (
    <ExamplesScreen>
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
        <Button transparent variant="primary">
          Primary
        </Button>
        <Button compact variant="primary">
          Compact primary
        </Button>
        <Button compact disabled variant="primary">
          Compact primary
        </Button>

        <Button variant="secondary">Secondary</Button>
        <Button transparent variant="secondary">
          Secondary
        </Button>
        <Button compact variant="secondary">
          Compact secondary
        </Button>
        <Button compact disabled variant="secondary">
          Compact secondary
        </Button>

        <Button variant="positive">Positive</Button>
        <Button transparent variant="positive">
          Positive
        </Button>
        <Button compact variant="positive">
          Compact positive
        </Button>
        <Button compact disabled variant="positive">
          Compact positive
        </Button>

        <Button variant="negative">Negative</Button>
        <Button transparent variant="negative">
          Negative
        </Button>
        <Button compact variant="negative">
          Compact negative
        </Button>
        <Button compact disabled variant="negative">
          Compact negative
        </Button>
      </Example>

      <Example title="Icons" inline>
        <Button startIcon="arrowLeft">With start icon</Button>
        <Button compact startIcon="arrowLeft">
          With start icon
        </Button>

        <Button endIcon="arrowRight" variant="secondary">
          With end icon
        </Button>
        <Button compact endIcon="arrowRight" variant="secondary">
          With end icon
        </Button>

        <Button startIcon="wireTransfer" endIcon="questionMark" variant="positive">
          With both icons
        </Button>
        <Button compact startIcon="wireTransfer" endIcon="questionMark" variant="positive">
          With both icons
        </Button>

        <Button disabled endIcon="sparkle" variant="negative">
          When disabled
        </Button>
        <Button compact disabled startIcon="identityCard" variant="negative">
          When disabled
        </Button>
      </Example>
    </ExamplesScreen>
  );
};

export default ButtonScreen;
