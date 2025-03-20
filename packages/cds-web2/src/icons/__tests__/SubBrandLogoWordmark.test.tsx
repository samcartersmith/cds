import { render, screen } from '@testing-library/react';

import { SubBrandLogoWordmark } from '../SubBrandLogoWordmark';
import { DefaultThemeProvider } from '../../utils/test';

describe('SubBrandLogoWordmark', () => {
  it('renders title by type', () => {
    render(
      <DefaultThemeProvider>
        <SubBrandLogoWordmark type="analytics" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Coinbase analytics logo')).toBeTruthy();
  });
});
