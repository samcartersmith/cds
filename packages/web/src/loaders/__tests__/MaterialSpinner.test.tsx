import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { usePalette } from '../../hooks/usePalette';
import { MaterialSpinner } from '../MaterialSpinner';

describe('MaterialSpinner', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<MaterialSpinner color="primary" size={60} />)).toHaveNoViolations();
  });

  it('size and color are correctly set', () => {
    render(<MaterialSpinner color="primary" size={60} testID="material-spinner-svg" />);

    expect(screen.getByTestId('material-spinner-svg')).toHaveAttribute('height', `${60}px`);
    expect(screen.getByTestId('material-spinner-svg')).toHaveAttribute(
      'stroke',
      `${usePalette().primary}`,
    );
  });

  it('should render with a svg element', () => {
    render(<MaterialSpinner color="primary" size={60} testID="material-spinner-svg" />);
    expect(screen.getByTestId('material-spinner-svg')).toBeTruthy();
  });
});
