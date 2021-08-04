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
        async afterRender({ container, getByRole }) {
          fireEvent.mouseEnter(container.querySelector('button') as Element);

          return waitFor(() => getByRole('tooltip'));
        },
      }),
    ).toHaveNoViolations();
  });

  it('renders the button with a tooltip', () => {
    const { container, getByRole } = render(<StoryExample />);

    expect(container.querySelector('button')).toBeDefined();
    expect(getByRole('tooltip', { hidden: true })).toBeDefined();
  });

  it('shows tooltip on hover', async () => {
    const { container, getByRole } = render(<StoryExample />);
    const button = container.querySelector('button');

    let tooltip = getByRole('tooltip', { hidden: true });

    expect(button).toHaveAttribute('aria-describedby', tooltip.id);
    expect(tooltip).toHaveAttribute('hidden');

    fireEvent.mouseEnter(button as Element);

    tooltip = await waitFor(() => getByRole('tooltip'));

    expect(tooltip).not.toHaveAttribute('hidden');
  });
});
