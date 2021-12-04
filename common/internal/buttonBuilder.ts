import { storyBuilder } from './utils/storyBuilder';

// eslint-disable-next-line no-console
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
