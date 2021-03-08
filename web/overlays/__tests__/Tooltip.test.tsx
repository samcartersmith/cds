import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';
import { renderA11y } from '@utils/jest/renderA11y';

import { StoryExample } from '../__fixtures__/StoryExample';

describe('Tooltip', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<StoryExample />)).toHaveNoViolations();
  });

  it('passes accessibility when open', async () => {
    expect(
      await renderA11y(<StoryExample />, {
        afterRender({ container, getByRole }) {
          fireEvent.mouseEnter(container.querySelector('button') as HTMLButtonElement);

          return waitFor(() => getByRole('tooltip'));
        },
      })
    ).toHaveNoViolations();
  });

  it('renders the button with a tooltip', () => {
    const { container, getByRole } = render(<StoryExample />);

    expect(container.querySelector('button')).toBeDefined();
    expect(getByRole('tooltip', { hidden: true })).toBeDefined();
  });

  it('shows tooltip on hover', async () => {
    const { container, getByRole } = render(<StoryExample />);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button).not.toHaveAttribute('aria-describedby');
    expect(getByRole('tooltip', { hidden: true })).toHaveAttribute('aria-hidden', 'true');

    fireEvent.mouseEnter(button);

    const tooltip = await waitFor(() => getByRole('tooltip'));

    expect(tooltip).toHaveAttribute('aria-hidden', 'false');
    expect(button).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('passes disabled state through', () => {
    const { container, getByRole } = render(<StoryExample disabled />);

    expect(container.querySelector('button')).toHaveAttribute('disabled');
    expect(getByRole('tooltip', { hidden: true })).toHaveAttribute('aria-disabled', 'true');
  });
});
