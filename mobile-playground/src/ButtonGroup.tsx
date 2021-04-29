import { Button, ButtonGroup, IconButton, LinkButton } from '@cbhq/cds-mobile/buttons';
import { GestureResponderEvent } from 'react-native';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

function onPress(event: GestureResponderEvent) {
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const ButtonGroupScreen = () => {
  return (
    <ExamplesScreen>
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
          <LinkButton onPress={onPress}>Button</LinkButton>
          <LinkButton onPress={onPress}>Button</LinkButton>
          <LinkButton onPress={onPress}>Button</LinkButton>
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
          <LinkButton onPress={onPress}>Button</LinkButton>
          <LinkButton onPress={onPress}>Button</LinkButton>
          <LinkButton onPress={onPress}>Button</LinkButton>
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
    </ExamplesScreen>
  );
};

export default ButtonGroupScreen;
