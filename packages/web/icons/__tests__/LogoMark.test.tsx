import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { LogoMark } from '../LogoMark';

describe('LogoMark', () => {
  it('renders', () => {
    render(<LogoMark />);

    expect(screen.getByRole('img')).toBeTruthy();
    expect(screen.getByText('Coinbase logo')).toBeTruthy();
  });

  it('passes accessibility', async () => {
    expect(await renderA11y(<LogoMark />)).toHaveNoViolations();
  });
});
