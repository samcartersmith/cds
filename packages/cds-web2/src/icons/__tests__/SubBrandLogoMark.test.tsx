import { render, screen } from '@testing-library/react';

import { SubBrandLogoMark } from '../SubBrandLogoMark';
import { DefaultThemeProvider } from '../../utils/test';

describe('SubBrandLogoMark', () => {
  it('renders title by type', () => {
    render(
      <DefaultThemeProvider>
        <SubBrandLogoMark type="analytics" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Coinbase analytics logo')).toBeTruthy();
  });
});
