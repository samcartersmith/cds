import { VStack } from '../../layout';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { IconButton } from '../IconButton';

const onPress = console.log;

export const Default = () => (
  <VStack gap={2}>
    <ButtonGroup accessibilityLabel="Group">
      <Button onPress={onPress}>Save</Button>
      <Button onPress={onPress} variant="negative">
        Cancel
      </Button>
    </ButtonGroup>
    <ButtonGroup accessibilityLabel="Group">
      <Button onPress={onPress}>Button</Button>
      <Button onPress={onPress}>Button</Button>
      <Button onPress={onPress}>Button</Button>
    </ButtonGroup>

    <ButtonGroup accessibilityLabel="Group">
      <Button compact onPress={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onPress={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onPress={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onPress={onPress} variant="secondary">
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
      <IconButton accessibilityLabel="Left" name="arrowLeft" onPress={onPress} />
      <IconButton accessibilityLabel="Up" name="arrowUp" onPress={onPress} />
      <IconButton accessibilityLabel="Right" name="arrowRight" onPress={onPress} />
    </ButtonGroup>
  </VStack>
);

export const Block = () => (
  <VStack gap={2}>
    <ButtonGroup block accessibilityLabel="Group">
      <Button onPress={onPress}>Save</Button>
      <Button onPress={onPress} variant="negative">
        Cancel
      </Button>
    </ButtonGroup>
    <ButtonGroup block accessibilityLabel="Group">
      <Button onPress={onPress}>Button</Button>
      <Button onPress={onPress}>Button</Button>
      <Button onPress={onPress}>Button</Button>
    </ButtonGroup>

    <ButtonGroup block accessibilityLabel="Group">
      <Button compact onPress={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onPress={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onPress={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onPress={onPress} variant="secondary">
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
    <Button onPress={onPress} variant="negative">
      Cancel
    </Button>
  </ButtonGroup>
);

export default {
  title: 'Core Components/Buttons/ButtonGroup',
  component: ButtonGroup,
};
