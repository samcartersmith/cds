import { render, screen } from '@testing-library/react';

import { HelperText } from '../HelperText';

describe('HelperText.test', () => {
  it('renders text', () => {
    render(<HelperText>Test text</HelperText>);

    expect(screen.getByText('Test text')).toBeTruthy();
  });

  it('renders negative color', () => {
    render(
      <HelperText color="textNegative" errorIconTestID="error-icon">
        Test text
      </HelperText>,
    );

    expect(screen.getByText('Test text').className).toContain('textNegative');
    expect(screen.getByTestId('error-icon').className).toContain('iconNegative');
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
