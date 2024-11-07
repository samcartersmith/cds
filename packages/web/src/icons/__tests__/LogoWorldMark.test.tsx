import { render, screen } from '@testing-library/react';

import { LogoWordmark } from '../LogoWordmark';

describe('LogoWordmark', () => {
  it('renders', () => {
    render(<LogoWordmark />);

    expect(screen.getByRole('img')).toBeTruthy();
    expect(screen.getByText('Coinbase logo')).toBeTruthy();
  });
});
