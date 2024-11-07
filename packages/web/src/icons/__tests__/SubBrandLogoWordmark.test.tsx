import { render, screen } from '@testing-library/react';

import { SubBrandLogoWordmark } from '../SubBrandLogoWordmark';

describe('SubBrandLogoWordmark', () => {
  it('renders title by type', () => {
    render(<SubBrandLogoWordmark type="analytics" />);

    expect(screen.getByText('Coinbase analytics logo')).toBeTruthy();
  });
});
