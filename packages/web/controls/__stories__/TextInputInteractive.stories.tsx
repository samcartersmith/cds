import React from 'react';
import { expect } from '@storybook/jest';
import { ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { AddressForm } from './AddressForm';

export default {
  title: 'Interactive/Inputs',
  component: AddressForm,
};

const Template: ComponentStory<typeof AddressForm> = (args) => <AddressForm {...args} />;

export const Filled = Template.bind({});

Filled.args = {
  onSubmit: (e: React.FormEvent) => {
    e.preventDefault();
  },
};

Filled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.type(canvas.getByPlaceholderText('4321 Jade Palace'), '221 Stockholm Street');
  userEvent.type(canvas.getByLabelText('City/town'), 'San Jose');
  userEvent.type(canvas.getByLabelText('State'), 'California');
  userEvent.type(canvas.getByLabelText('Postal code'), '89201');
  userEvent.type(canvas.getByLabelText('Country'), 'United States');
  userEvent.click(canvas.getByTestId('save-btn'));
  expect(canvas.getByText('Submit button was clicked')).toBeInTheDocument();
};
