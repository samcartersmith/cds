import { render } from '@testing-library/react';

import { LogoMark } from '../LogoMark';

describe('LogoMark', () => {
  it('renders', () => {
    const { container, getByText } = render(<LogoMark />);

    expect(container.querySelector('svg')).toBeTruthy();
    expect(getByText('Coinbase logo')).toBeTruthy();
  });
});
