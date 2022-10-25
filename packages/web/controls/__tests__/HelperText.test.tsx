import { render, screen } from '@testing-library/react';

import { ThemeProvider } from '../../system';
import { HelperText } from '../HelperText';

describe('HelperText.test', () => {
  it('renders text', () => {
    render(<HelperText>Test text</HelperText>);

    expect(screen.getByText('Test text')).toBeTruthy();
  });

  it('renders dense text', () => {
    render(
      <ThemeProvider scale="xSmall">
        <HelperText>Test text</HelperText>
      </ThemeProvider>,
    );

    expect(screen.getByText('Test text')).toBeTruthy();
  });
});
