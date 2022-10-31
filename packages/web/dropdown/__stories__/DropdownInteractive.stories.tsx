import { expect } from '@storybook/jest';
import { ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { Default } from './Dropdown.stories';

export default {
  title: 'Interactive/Dropdown',
  component: Default,
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

export const Story: ComponentStoryObj<typeof Default> = {
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
