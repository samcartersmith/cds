import { render } from '@testing-library/react';
import { renderA11y } from '@utils/jest/renderA11y';

import { usePalette } from '../../hooks/usePalette';
import { MaterialSpinner } from '../MaterialSpinner';

describe('MaterialSpinner', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<MaterialSpinner size={60} color="primary" />)).toHaveNoViolations();
  });

  it('size and color are correctly set', async () => {
    const { getByTestId } = render(
      <MaterialSpinner size={60} color="primary" testID="material-spinner-svg" />,
    );

    expect(getByTestId('material-spinner-svg')).toHaveAttribute('height', `${60}px`);
    expect(getByTestId('material-spinner-svg')).toHaveAttribute(
      'style',
      `stroke: ${usePalette().primary};`,
    );
  });

  it('should render with a svg element', () => {
    const { queryByTestId } = render(
      <MaterialSpinner size={60} color="primary" testID="material-spinner-svg" />,
    );
    expect(queryByTestId('material-spinner-svg')).toBeTruthy();
  });
});
