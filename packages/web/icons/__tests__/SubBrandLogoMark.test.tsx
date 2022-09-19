import { render } from '@testing-library/react';

import { SubBrandLogoMark } from '../SubBrandLogoMark';

describe('SubBrandLogoMark', () => {
  it('renders title by type', () => {
    const { getByText } = render(<SubBrandLogoMark type="analytics" />);

    expect(getByText('Coinbase analytics logo')).toBeTruthy();
  });
});
