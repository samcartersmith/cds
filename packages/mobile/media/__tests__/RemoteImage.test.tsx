import { render, screen } from '@testing-library/react-native';
import { normalScaleMap, PaletteBorder } from '@cbhq/cds-common';
import { paletteBorders } from '@cbhq/cds-common/palette/constants';
import { paletteAliasToRgbaString } from '@cbhq/cds-common/palette/paletteAliasToRgbaString';
import { borderRadius } from '@cbhq/cds-common/tokens/borderRadius';

import { ThemeProvider } from '../../system';
import { RemoteImage } from '../RemoteImage';

const mockSvgFetch = async () =>
  Promise.resolve(
    new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="blue" /></svg>',
    ),
  );

describe('RemoteImage', () => {
  it('shouldApplyDarkModeEnhacements border styles takes precedence over custom borderColor and passes a11y', () => {
    const spectrum = 'dark';
    render(
      <ThemeProvider name="remoteimage-test-theme-provider" spectrum={spectrum}>
        <RemoteImage
          shouldApplyDarkModeEnhacements
          borderColor="primary"
          source="https://images.coinbase.com/avatar?s=56"
          testID="remoteimage"
        />
      </ThemeProvider>,
    );
    const image = screen.queryByTestId('remoteimage');
    expect(image).toBeTruthy();

    expect(image).toBeAccessible();

    expect(image).toHaveStyle({
      borderWidth: 1,
      borderColor: paletteAliasToRgbaString('lineHeavy', spectrum),
    });
  });
  it('darkModeEnhancementsApplied border styles takes precedence over custom borderColor and passes a11y', () => {
    const spectrum = 'dark';
    render(
      <ThemeProvider name="remoteimage-test-theme-provider" spectrum={spectrum}>
        <RemoteImage
          darkModeEnhancementsApplied
          borderColor="primary"
          source="https://images.coinbase.com/avatar?s=56"
          testID="remoteimage"
        />
      </ThemeProvider>,
    );
    const image = screen.queryByTestId('remoteimage');
    expect(image).toBeTruthy();

    expect(image).toBeAccessible();

    expect(image).toHaveStyle({
      borderWidth: 1,
      borderColor: paletteAliasToRgbaString('lineHeavy', spectrum),
    });
  });

  it('has a default shape of square and passes a11y', () => {
    render(<RemoteImage source="https://images.coinbase.com/avatar?s=56" testID="remoteimage" />);

    const image = screen.queryByTestId('remoteimage');

    expect(image).toBeAccessible();

    expect(image).toHaveStyle({
      borderRadius: borderRadius.roundedSmall,
    });
  });

  it('if width/height/size is not set, it will default to size = m. Passes a11y', () => {
    render(<RemoteImage source="https://images.coinbase.com/avatar?s=56" testID="remoteimage" />);
    const avatarSizeM = normalScaleMap.m;

    const image = screen.queryByTestId('remoteimage');

    expect(image).toBeAccessible();

    expect(image).toHaveStyle({
      width: avatarSizeM,
      height: avatarSizeM,
    });
  });

  paletteBorders.forEach((color) => {
    const castedColor = color as PaletteBorder;
    const rgbaString = paletteAliasToRgbaString(castedColor, 'light');

    it(`renders correct border color of ${color} - ${rgbaString} and passes a11y`, () => {
      render(
        <RemoteImage
          borderColor={castedColor}
          source="https://images.coinbase.com/avatar?s=56"
          testID="remoteimage"
        />,
      );
      const image = screen.queryByTestId('remoteimage');
      expect(image).toBeTruthy();

      expect(image).toBeAccessible();

      expect(image).toHaveStyle({
        borderWidth: 2,
        borderColor: rgbaString,
      });
    });
  });

  it('sets accessibility attributes and labels for svgs', async () => {
    const spy = jest.spyOn(global, 'fetch').mockImplementation(mockSvgFetch);

    render(
      <RemoteImage
        accessibilityHint="A hint"
        accessibilityLabel="A label"
        source="https://example.com/example.svg"
      />,
    );

    expect(await screen.findByRole('image')).toHaveProp('accessible', true);
    expect(await screen.findByLabelText('A label')).toBeTruthy();
    expect(await screen.findByHintText('A hint')).toBeTruthy();

    spy.mockRestore();
  });

  it('sets accessibility attributes and labels for hexagon shaped images', () => {
    render(
      <RemoteImage
        accessibilityHint="A hint"
        accessibilityLabel="A label"
        shape="hexagon"
        source="https://images.coinbase.com/avatar?s=56"
      />,
    );

    expect(screen.getByRole('image')).toHaveProp('accessible', true);
    expect(screen.getByLabelText('A label')).toBeTruthy();
    expect(screen.getByHintText('A hint')).toBeTruthy();
  });

  it('sets accessibility attributes and labels for images', () => {
    render(
      <RemoteImage
        accessibilityHint="A hint"
        accessibilityLabel="A label"
        source="https://images.coinbase.com/avatar?s=56"
      />,
    );

    expect(screen.getByRole('image')).toHaveProp('accessibilityElementsHidden', false);
    expect(screen.getByRole('image')).toHaveProp('importantForAccessibility', 'auto');
    expect(screen.getByLabelText('A label')).toBeTruthy();
    expect(screen.getByHintText('A hint')).toBeTruthy();
  });

  it('sets accessibility attributes and labels for the fallback', () => {
    render(
      <RemoteImage
        fallbackAccessibilityHint="A fallback hint"
        fallbackAccessibilityLabel="A fallback label"
      />,
    );

    expect(screen.getByRole('image')).toHaveProp('accessible', true);
    expect(screen.getByLabelText('A fallback label')).toBeTruthy();
    expect(screen.getByHintText('A fallback hint')).toBeTruthy();
  });
});
