import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Spinner color="backgroundPrimary" size={60} />)).toHaveNoViolations();
  });

  it('should render with a div element', () => {
    render(<Spinner color="backgroundPrimary" size={60} testID="div-spinner" />);
    expect(screen.getByTestId('div-spinner')).toBeTruthy();
  });

  it('renders with default color', () => {
    render(<Spinner size={60} testID="div-spinner" />);
    expect(screen.getByTestId('div-spinner')).toBeTruthy();
  });

  it('accepts custom styles', () => {
    render(
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      <Spinner color="backgroundPrimary" size={60} style={{ color: 'red' }} testID="div-spinner" />,
    );
    expect(screen.getByTestId('div-spinner')).toHaveStyle({ color: 'red' });
  });

  it('accepts custom className', () => {
    render(
      <Spinner className="custom-class" color="backgroundPrimary" size={60} testID="div-spinner" />,
    );
    expect(screen.getByTestId('div-spinner')).toHaveClass('custom-class');
  });
});
