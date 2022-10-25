import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { StoryExample } from '../__fixtures__/StoryExample';

describe('Tooltip', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<StoryExample />)).toHaveNoViolations();
  });

  it('passes accessibility when open', async () => {
    expect(
      await renderA11y(<StoryExample />, {
        async afterRender() {
          fireEvent.mouseEnter(screen.getByRole('button'));

          return waitFor(() => screen.getByRole('tooltip'));
        },
      }),
    ).toHaveNoViolations();
  });

  it('renders the button with a tooltip', () => {
    render(<StoryExample />);

    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByRole('tooltip', { hidden: true })).toBeDefined();
  });

  it('shows tooltip on hover', async () => {
    render(<StoryExample />);
    const button = screen.getByRole('button');

    let tooltip = screen.getByRole('tooltip', { hidden: true });

    expect(button).toHaveAttribute('aria-describedby', tooltip.id);
    expect(tooltip).toHaveAttribute('hidden');

    fireEvent.mouseEnter(button as Element);

    tooltip = await screen.findByRole('tooltip');

    expect(tooltip).not.toHaveAttribute('hidden');
  });
});
