import { ComponentStory } from '@storybook/react';

import { Box } from '../Box';
import { Divider } from '../Divider';
import { HStack } from '../HStack';
import { VStack } from '../VStack';

export default {
  title: 'Core Components/Divider',
  component: Divider,
  argTypes: {
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
};

const Template: ComponentStory<typeof Divider> = ({ direction, ...rest }) => {
  if (direction === 'horizontal') {
    return (
      <VStack width={500}>
        <Box height={100} width={500} background="background" />
        <Divider direction={direction} {...rest} />
        <Box height={100} width={500} background="background" />
      </VStack>
    );
  }

  return (
    <HStack>
      <Box height={200} width={250} background="background" />
      <Divider direction={direction} {...rest} />
      <Box height={200} width={250} background="background" />
    </HStack>
  );
};

export const HorizontalDirection = Template.bind({});
HorizontalDirection.args = {
  direction: 'horizontal',
};

export const VerticalDirection = Template.bind({});
VerticalDirection.args = {
  direction: 'vertical',
};

export const LightColor = Template.bind({});
LightColor.args = {
  direction: 'horizontal',
  color: 'line',
};

export const HeavyColor = Template.bind({});
HeavyColor.args = {
  direction: 'horizontal',
  color: 'lineHeavy',
};
