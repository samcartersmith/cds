import { render, screen } from '@testing-library/react-native';

import { HelperText } from '../HelperText';

describe('HelperText.test', () => {
  it('renders children', () => {
    render(<HelperText>Test text</HelperText>);

    expect(screen.getByText('Test text')).toBeTruthy();
  });

  it('renders custom color', () => {
    render(
      <HelperText color="negative" dangerouslySetColor="yellow" errorIconTestID="error-icon">
        Test text
      </HelperText>,
    );

    expect(screen.getByText('Test text')).toHaveStyle({ color: 'yellow' });
    expect(screen.getByRole('image')).toHaveStyle({ color: 'yellow' });
  });

  it('renders custom spacing', () => {
    render(
      <HelperText spacing={4} testID="helper-text-test">
        Test text
      </HelperText>,
    );
    expect(screen.getByTestId('helper-text-test')).toHaveStyle({
      paddingBottom: 32,
      paddingLeft: 32,
      paddingRight: 32,
      paddingTop: 32,
    });
  });
});
