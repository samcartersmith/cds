import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { CellAccessory } from '../CellAccessory';

describe('CellAccessory', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<CellAccessory type="more" />)).toHaveNoViolations();
  });

  it('renders a more', () => {
    render(<CellAccessory type="more" />);

    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'more');
  });

  it('renders an arrow', () => {
    render(<CellAccessory type="arrow" />);

    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'caretRight');
  });

  it('renders a selected', () => {
    render(<CellAccessory type="selected" />);

    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'checkmark');
  });
});
