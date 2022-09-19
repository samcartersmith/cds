import { render } from '@testing-library/react';

import { LogoWordmark } from '../LogoWordmark';

describe('LogoWordmark', () => {
  it('renders', () => {
    const { container, getByText } = render(<LogoWordmark />);

    expect(container.querySelector('svg')).toBeTruthy();
    expect(getByText('Coinbase logo')).toBeTruthy();
  });
});
