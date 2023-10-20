import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Spinner } from '../Spinner';

describe('MaterialSpinner', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Spinner color="primary" size={60} />)).toHaveNoViolations();
  });

  it('should render with a div element', () => {
    render(<Spinner color="primary" size={60} testID="div-spinner" />);
    expect(screen.getByTestId('div-spinner')).toBeTruthy();
  });

  it('renders with default color', () => {
    render(<Spinner size={60} testID="div-spinner" />);
    expect(screen.getByTestId('div-spinner')).toBeTruthy();
  });
});
