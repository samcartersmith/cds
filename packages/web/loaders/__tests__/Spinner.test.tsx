import { render } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Spinner } from '../Spinner';

describe('MaterialSpinner', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Spinner size={60} color="primary" />)).toHaveNoViolations();
  });

  it('should render with a div element', () => {
    const { queryByTestId } = render(<Spinner size={60} color="primary" testID="div-spinner" />);
    expect(queryByTestId('div-spinner')).toBeTruthy();
  });
});
