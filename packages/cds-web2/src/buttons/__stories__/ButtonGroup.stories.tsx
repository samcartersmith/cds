import React from 'react';

import { VStack } from '../../layout';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { IconButton } from '../IconButton';

// eslint-disable-next-line no-console
const onPress = console.log;

export const Default = () => (
  <VStack gap={2}>
    <ButtonGroup accessibilityLabel="Group">
      <Button onClick={onPress}>Save</Button>
      <Button onClick={onPress} variant="negative">
        Cancel
      </Button>
    </ButtonGroup>
    <ButtonGroup accessibilityLabel="Group">
      <Button onClick={onPress}>Button</Button>
      <Button onClick={onPress}>Button</Button>
      <Button onClick={onPress}>Button</Button>
    </ButtonGroup>

    <ButtonGroup accessibilityLabel="Group">
      <Button compact onClick={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onPress} variant="secondary">
        Button
      </Button>
    </ButtonGroup>
    <ButtonGroup accessibilityLabel="Group">
      <Button transparent onClick={onPress}>
        Button
      </Button>
      <Button transparent onClick={onPress}>
        Button
      </Button>
      <Button transparent onClick={onPress}>
        Button
      </Button>
    </ButtonGroup>
    <ButtonGroup accessibilityLabel="Group">
      <IconButton accessibilityLabel="Left" name="arrowLeft" onClick={onPress} />
      <IconButton accessibilityLabel="Up" name="arrowUp" onClick={onPress} />
      <IconButton accessibilityLabel="Right" name="arrowRight" onClick={onPress} />
    </ButtonGroup>
  </VStack>
);

export const Block = () => (
  <VStack gap={2}>
    <ButtonGroup block accessibilityLabel="Group">
      <Button onClick={onPress}>Save</Button>
      <Button onClick={onPress} variant="negative">
        Cancel
      </Button>
    </ButtonGroup>
    <ButtonGroup block accessibilityLabel="Group">
      <Button onClick={onPress}>Button</Button>
      <Button onClick={onPress}>Button</Button>
      <Button onClick={onPress}>Button</Button>
    </ButtonGroup>

    <ButtonGroup block accessibilityLabel="Group">
      <Button compact onClick={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onPress} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onPress} variant="secondary">
        Button
      </Button>
    </ButtonGroup>
    <ButtonGroup block accessibilityLabel="Group">
      <Button transparent onClick={onPress}>
        Button
      </Button>
      <Button transparent onClick={onPress}>
        Button
      </Button>
      <Button transparent onClick={onPress}>
        Button
      </Button>
    </ButtonGroup>
  </VStack>
);

export const Vertical = () => (
  <ButtonGroup accessibilityLabel="Group" direction="vertical">
    <Button onClick={onPress}>Save</Button>
    <Button onClick={onPress} variant="negative">
      Cancel
    </Button>
  </ButtonGroup>
);

export default {
  title: 'Core Components/Buttons/ButtonGroup',
  component: ButtonGroup,
};
