/* eslint-disable react-native-a11y/has-accessibility-hint */
import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { IconButton } from '../IconButton';

function onPress(event: GestureResponderEvent) {
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const ButtonGroupScreen = () => {
  return (
    <ExampleScreen>
      <Example>
        <ButtonGroup accessibilityLabel="Group">
          <Button onPress={onPress}>Save</Button>
          <Button variant="negative" onPress={onPress}>
            Cancel
          </Button>
        </ButtonGroup>

        <ButtonGroup accessibilityLabel="Group">
          <Button onPress={onPress}>Button</Button>
          <Button onPress={onPress}>Button</Button>
          <Button onPress={onPress}>Button</Button>
        </ButtonGroup>

        <ButtonGroup accessibilityLabel="Group">
          <Button compact variant="secondary" onPress={onPress}>
            Button
          </Button>
          <Button compact variant="secondary" onPress={onPress}>
            Button
          </Button>
          <Button compact variant="secondary" onPress={onPress}>
            Button
          </Button>
          <Button compact variant="secondary" onPress={onPress}>
            Button
          </Button>
        </ButtonGroup>

        <ButtonGroup accessibilityLabel="Group">
          <Button transparent onPress={onPress}>
            Button
          </Button>
          <Button transparent onPress={onPress}>
            Button
          </Button>
          <Button transparent onPress={onPress}>
            Button
          </Button>
        </ButtonGroup>

        <ButtonGroup accessibilityLabel="Group">
          <IconButton name="arrowLeft" onPress={onPress} />
          <IconButton name="arrowUp" onPress={onPress} />
          <IconButton name="arrowRight" onPress={onPress} />
        </ButtonGroup>
      </Example>

      <Example title="Block">
        <ButtonGroup block accessibilityLabel="Group">
          <Button onPress={onPress}>Save</Button>
          <Button variant="negative" onPress={onPress}>
            Cancel
          </Button>
        </ButtonGroup>

        <ButtonGroup block accessibilityLabel="Group">
          <Button onPress={onPress}>Button</Button>
          <Button onPress={onPress}>Button</Button>
          <Button onPress={onPress}>Button</Button>
        </ButtonGroup>

        <ButtonGroup block accessibilityLabel="Group">
          <Button compact variant="secondary" onPress={onPress}>
            Button
          </Button>
          <Button compact variant="secondary" onPress={onPress}>
            Button
          </Button>
          <Button compact variant="secondary" onPress={onPress}>
            Button
          </Button>
          <Button compact variant="secondary" onPress={onPress}>
            Button
          </Button>
        </ButtonGroup>

        <ButtonGroup block accessibilityLabel="Group">
          <Button transparent onPress={onPress}>
            Button
          </Button>
          <Button transparent onPress={onPress}>
            Button
          </Button>
          <Button transparent onPress={onPress}>
            Button
          </Button>
        </ButtonGroup>
      </Example>

      <Example title="Vertical">
        <ButtonGroup vertical accessibilityLabel="Group">
          <Button onPress={onPress}>Save</Button>
          <Button variant="negative" onPress={onPress}>
            Cancel
          </Button>
        </ButtonGroup>
      </Example>
    </ExampleScreen>
  );
};

export default ButtonGroupScreen;
