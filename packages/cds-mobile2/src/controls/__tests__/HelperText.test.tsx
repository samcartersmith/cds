/* eslint-disable react-native/no-raw-text */
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { HelperText } from '../HelperText';

describe('HelperText.test', () => {
  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <HelperText>Test text</HelperText>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Test text')).toBeTruthy();
  });

  it('renders custom color', () => {
    render(
      <DefaultThemeProvider>
        <HelperText color="textNegative" dangerouslySetColor="yellow" errorIconTestID="error-icon">
          Test text
        </HelperText>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Test text')).toHaveStyle({ color: 'yellow' });
    expect(screen.getByRole('image')).toHaveStyle({ color: 'yellow' });
  });

  it('renders custom spacing', () => {
    render(
      <DefaultThemeProvider>
        <HelperText padding={4} testID="helper-text-test">
          Test text
        </HelperText>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('helper-text-test')).toHaveStyle({
      paddingBottom: 32,
      paddingLeft: 32,
      paddingRight: 32,
      paddingTop: 32,
    });
  });
});
