import { render, screen } from '@testing-library/react';

import { HelperText } from '../HelperText';

describe('HelperText.test', () => {
  it('renders text', () => {
    render(<HelperText>Test text</HelperText>);

    expect(screen.getByText('Test text')).toBeTruthy();
  });

  it('renders negative color', () => {
    render(
      <HelperText color="fgNegative" errorIconTestID="error-icon">
        Test text
      </HelperText>,
    );

    expect(screen.getByText('Test text').className).toContain('fgNegative');
    expect(screen.getByTestId('error-icon').className).toContain('fgNegative');
  });

  it('renders custom padding', () => {
    render(
      <HelperText padding={4} testID="helper-text-test">
        Test text
      </HelperText>,
    );

    expect(screen.getByTestId('helper-text-test').className).toContain('4');
  });
});
