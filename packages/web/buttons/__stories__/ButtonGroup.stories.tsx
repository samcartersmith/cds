import { VStack } from '../../layout';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { IconButton } from '../IconButton';

const onPress = console.log;

export const Default = () => (
  <VStack gap={2}>
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
      <IconButton name="arrowLeft" onPress={onPress} accessibilityLabel="Left" />
      <IconButton name="arrowUp" onPress={onPress} accessibilityLabel="Up" />
      <IconButton name="arrowRight" onPress={onPress} accessibilityLabel="Right" />
    </ButtonGroup>
  </VStack>
);

export const Block = () => (
  <VStack gap={2}>
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
  </VStack>
);

export const Vertical = () => (
  <ButtonGroup vertical accessibilityLabel="Group">
    <Button onPress={onPress}>Save</Button>
    <Button variant="negative" onPress={onPress}>
      Cancel
    </Button>
  </ButtonGroup>
);

/**
 * Disabling this a11y rule until we hear back from Sam if we should make a permanent change to the component.
 */
Default.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'listitem', enabled: false }],
    },
  },
};

Block.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'listitem', enabled: false }],
    },
  },
};

Vertical.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'listitem', enabled: false }],
    },
  },
};

export default {
  title: 'Core Components/Buttons/ButtonGroup',
  component: ButtonGroup,
};
