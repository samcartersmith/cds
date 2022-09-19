import { render } from '@testing-library/react';

import { SubBrandLogoWordmark } from '../SubBrandLogoWordmark';

describe('SubBrandLogoWordmark', () => {
  it('renders title by type', () => {
    const { getByText } = render(<SubBrandLogoWordmark type="analytics" />);

    expect(getByText('Coinbase analytics logo')).toBeTruthy();
  });
});
