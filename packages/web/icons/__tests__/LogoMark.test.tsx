import { render, screen } from '@testing-library/react';

import { LogoMark } from '../LogoMark';

describe('LogoMark', () => {
  it('renders', () => {
    render(<LogoMark />);

    expect(screen.getByRole('img')).toBeTruthy();
    expect(screen.getByText('Coinbase logo')).toBeTruthy();
  });
});
