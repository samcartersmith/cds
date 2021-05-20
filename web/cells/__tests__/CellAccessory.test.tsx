import { render } from '@testing-library/react';
import { renderA11y } from '@utils/jest/renderA11y';

import { CellAccessory } from '../CellAccessory';

describe('CellAccessory', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<CellAccessory type="more" />)).toHaveNoViolations();
  });

  it('renders a more', () => {
    const result = render(<CellAccessory type="more" />);

    expect(result.getByRole('presentation')).toHaveAttribute('data-icon-name', 'more');
  });

  it('renders an arrow', () => {
    const result = render(<CellAccessory type="arrow" />);

    expect(result.getByRole('presentation')).toHaveAttribute('data-icon-name', 'caretRight');
  });

  it('renders a selected', () => {
    const result = render(<CellAccessory type="selected" />);

    expect(result.getByRole('presentation')).toHaveAttribute('data-icon-name', 'checkmark');
  });
});
