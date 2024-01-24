import { expect } from '@storybook/jest';
import { ComponentStoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { pauseStory } from '@cbhq/cds-web/utils/storybook';

import { Default } from './Dropdown.stories';

export default {
  title: 'Deprecated/Dropdown Interactive',
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

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const SimpleDropdown: ComponentStoryObj<typeof Default> = {
  args: {
    disablePortal: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // open the menu
    await userEvent.click(canvas.getByText('Open Menu'));
    await pauseStory(1000);

    // expect to see the first option
    await waitFor(() => expect(canvas.findByText(defaultOptions[0])).toBeDefined());

    // close the menu by clicking outside of it (this is hacky, but it clicks the invisible scrim)
    await userEvent.click(canvas.getByRole('dialog'));
    await pauseStory(1000);

    // open the menu again
    await userEvent.click(canvas.getAllByRole('button')[0]);
    await pauseStory(1000);

    // select an option
    await userEvent.click(canvas.getByText(defaultOptions[4]));
    await pauseStory(1000);

    // expect menu to be dismounted
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  },
};

// Make sure opening dropdown doesn't scroll the page. This will be captured in percy.
/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const ScrollContainer: ComponentStoryObj<typeof Default> = {
  args: {
    containerHeight: '200vh',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // open the menu
    await userEvent.click(canvas.getByText('Open Menu'));
  },
};
