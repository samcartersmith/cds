import { render, screen } from '@testing-library/react';

import { LogoWordmark } from '../LogoWordmark';
import { DefaultThemeProvider } from '../../utils/test';

describe('LogoWordmark', () => {
  it('renders', () => {
    render(
      <DefaultThemeProvider>
        <LogoWordmark />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('img')).toBeTruthy();
    expect(screen.getByText('Coinbase logo')).toBeTruthy();
  });
});
