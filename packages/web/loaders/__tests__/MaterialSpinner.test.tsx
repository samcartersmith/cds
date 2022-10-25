import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { usePalette } from '../../hooks/usePalette';
import { MaterialSpinner } from '../MaterialSpinner';

describe('MaterialSpinner', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<MaterialSpinner size={60} color="primary" />)).toHaveNoViolations();
  });

  it('size and color are correctly set', async () => {
    render(<MaterialSpinner size={60} color="primary" testID="material-spinner-svg" />);

    expect(screen.getByTestId('material-spinner-svg')).toHaveAttribute('height', `${60}px`);
    expect(screen.getByTestId('material-spinner-svg')).toHaveAttribute(
      'style',
      `stroke: ${usePalette().primary}; transform-origin: center center;`,
    );
  });

  it('should render with a svg element', () => {
    render(<MaterialSpinner size={60} color="primary" testID="material-spinner-svg" />);
    expect(screen.getByTestId('material-spinner-svg')).toBeTruthy();
  });
});
