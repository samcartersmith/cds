import { storyBuilder } from './utils/storyBuilder';

const onPressConsole = () => console.log('pressed');

const config = {
  argTypes: {
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Button',
    onPress: onPressConsole,
  },
} as const;

export const buttonBuilder = storyBuilder(config);
