import { ButtonBaseProps } from '../types';

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

export const buttonStories: Omit<ButtonBaseProps, 'children'>[] = [
  { variant: 'secondary' },
  { variant: 'positive' },
  { variant: 'negative' },
  { variant: 'secondary', transparent: true },
  { variant: 'positive', transparent: true },
  { variant: 'negative', transparent: true },
  { block: true },
  { compact: true },
  { compact: true, block: true },
  { transparent: true },
  { disabled: true },
  { loading: true },
  { loading: true, compact: true },
  { startIcon: 'backArrow' },
  { endIcon: 'backArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow' },
  { startIcon: 'backArrow', endIcon: 'forwardArrow', block: true },
  { transparent: true, flush: 'start', compact: true, endIcon: 'forwardArrow' },
  { transparent: true, flush: 'end', compact: true, endIcon: 'forwardArrow' },
];
