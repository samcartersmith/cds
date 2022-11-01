import { expect } from '@storybook/jest';
import { ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { Default as DefaultStory } from './Dropdown.stories';

export default {
  title: 'Interactive/Dropdown',
  component: DefaultStory,
};

const defaultOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
  'Option 9',
  'Option 10',
  'Option 11',
];

export const Default: ComponentStoryObj<typeof DefaultStory> = {
  args: {
    disablePortal: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // open the menu
    userEvent.click(canvas.getByText('Open Menu'));

    // expect to see the first option
    expect(canvas.findByText(defaultOptions[0])).toBeDefined();

    // click the second option
    userEvent.click(canvas.getByText(defaultOptions[1]));

    // reopen the menu using keyboard navigation
    userEvent.type(canvas.getByText('Open Menu'), ' ');

    // expect to see the first option
    expect(canvas.findByText(defaultOptions[0])).toBeDefined();

    // select the first option
    userEvent.type(await canvas.findByText(defaultOptions[0]), ' ');
  },
};

// Make sure opening dropdown doesn't scroll the page. This will be captured in percy.
export const ScrollContainer: ComponentStoryObj<typeof DefaultStory> = {
  args: {
    containerHeight: '200vh',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // open the menu
    userEvent.click(canvas.getByText('Open Menu'));
  },
};
