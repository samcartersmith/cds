import { expect } from '@storybook/jest';
import { ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { SortingExample } from './Table.stories';

export default {
  title: 'Interactive/Table',
  component: SortingExample,
};

export const SortingFocus: ComponentStoryObj<typeof SortingExample> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstSortButton = canvas.getByText('Asset').closest('button');

    // Tab into the document and expect the active element to be in focus
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    expect(firstSortButton).toHaveFocus();
  },
};
