import { render, screen } from '@testing-library/react';

import { SubBrandLogoMark } from '../SubBrandLogoMark';

describe('SubBrandLogoMark', () => {
  it('renders title by type', () => {
    render(<SubBrandLogoMark type="analytics" />);

    expect(screen.getByText('Coinbase analytics logo')).toBeTruthy();
  });
});
