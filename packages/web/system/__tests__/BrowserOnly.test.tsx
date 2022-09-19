import { render } from '@testing-library/react';

import { BrowserOnly } from '../BrowserOnly';

describe('BrowserOnly', () => {
  it('renders children in browser', () => {
    const { getByTestId } = render(
      <BrowserOnly>
        <div data-testid="children" />
      </BrowserOnly>,
    );

    expect(getByTestId('children')).toBeTruthy();
  });
});
