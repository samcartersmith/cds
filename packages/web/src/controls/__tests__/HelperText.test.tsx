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

  it('renders custom color', () => {
    render(
      <HelperText color="negative" dangerouslySetColor="yellow" errorIconTestID="error-icon">
        Test text
      </HelperText>,
    );

    expect(screen.getByText('Test text')).toHaveStyle({ color: 'yellow' });
    expect(screen.getByTestId('error-icon-glyph')).toHaveStyle({ color: 'yellow' });
  });

  it('renders custom spacing', () => {
    render(
      <HelperText spacing={4} testID="helper-text-test">
        Test text
      </HelperText>,
    );

    expect(screen.getByTestId('helper-text-test')).toHaveStyle({ padding: 40 });
  });
});
