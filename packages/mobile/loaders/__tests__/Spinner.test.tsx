import { render } from '@testing-library/react-native';
import { defaultPalette } from '@cbhq/cds-common';

import { ThemeProvider } from '../../system';
import { paletteConfigToRgbaStrings } from '../../utils/palette';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('renders CDS primary color in light mode', () => {
    const { getByTestId } = render(<Spinner testID="mock-spinner" />);
    const mockPalette = paletteConfigToRgbaStrings(defaultPalette, 'light');

    expect(getByTestId('mock-spinner').props.color).toBe(mockPalette.primary);
  });

  it('renders CDS backgroundOverlay in dark mode', () => {
    const { getByTestId } = render(
      <ThemeProvider name="spinner-test" spectrum="dark">
        <Spinner testID="mock-spinner" />
      </ThemeProvider>,
    );
    const mockPalette = paletteConfigToRgbaStrings(defaultPalette, 'dark');

    expect(getByTestId('mock-spinner').props.color).toBe(mockPalette.backgroundOverlay);
  });
});
