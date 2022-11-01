import { render, screen } from '@testing-library/react-native';
import { defaultPalette } from '@cbhq/cds-common';

import { ThemeProvider } from '../../system';
import { paletteConfigToRgbaStrings } from '../../utils/palette';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('passes a11y', () => {
    render(<Spinner testID="mock-spinner" />);
    expect(screen.getByTestId('mock-spinner')).toBeAccessible();
  });

  it('renders CDS primary color in light mode', () => {
    render(<Spinner testID="mock-spinner" />);
    const mockPalette = paletteConfigToRgbaStrings(defaultPalette, 'light');

    expect(screen.getByTestId('mock-spinner').props.color).toBe(mockPalette.primary);
  });

  it('renders CDS backgroundOverlay in dark mode', () => {
    render(
      <ThemeProvider name="spinner-test" spectrum="dark">
        <Spinner testID="mock-spinner" />
      </ThemeProvider>,
    );
    const mockPalette = paletteConfigToRgbaStrings(defaultPalette, 'dark');

    expect(screen.getByTestId('mock-spinner').props.color).toBe(mockPalette.backgroundOverlay);
  });
});
