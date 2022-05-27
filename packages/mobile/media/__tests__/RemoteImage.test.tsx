import { render } from '@testing-library/react-native';
import { normalScaleMap, PaletteBorder } from '@cbhq/cds-common';
import { paletteBorders } from '@cbhq/cds-common/palette/constants';
import { paletteAliasToRgbaString } from '@cbhq/cds-common/palette/paletteAliasToRgbaString';

import { ThemeProvider } from '../../system';
import { RemoteImage } from '../RemoteImage';

describe('RemoteImage', () => {
  it('shouldApplyDarkModeEnhacements border styles takes precedence over custom borderColor', () => {
    const spectrum = 'dark';
    const { queryByTestId } = render(
      <ThemeProvider name="remoteimage-test-theme-provider" spectrum={spectrum}>
        <RemoteImage
          shouldApplyDarkModeEnhacements
          borderColor="primary"
          source="https://images.coinbase.com/avatar?s=56"
          testID="remoteimage"
        />
      </ThemeProvider>,
    );
    const image = queryByTestId('remoteimage');
    expect(image).toBeTruthy();

    expect(image).toHaveStyle({
      borderWidth: 1,
      borderColor: paletteAliasToRgbaString('lineHeavy', spectrum, false),
    });
  });

  it('has a default shape of square', () => {
    const { queryByTestId } = render(
      <RemoteImage source="https://images.coinbase.com/avatar?s=56" testID="remoteimage" />,
    );

    const image = queryByTestId('remoteimage');
    expect(image).toHaveStyle({
      borderRadius: 0,
    });
  });

  it('if width/height/size is not set, it will default to size = m', () => {
    const { queryByTestId } = render(
      <RemoteImage source="https://images.coinbase.com/avatar?s=56" testID="remoteimage" />,
    );
    const avatarSizeM = normalScaleMap.m;

    const image = queryByTestId('remoteimage');
    expect(image).toHaveStyle({
      width: avatarSizeM,
      height: avatarSizeM,
    });
  });

  paletteBorders.forEach((color) => {
    const castedColor = color as PaletteBorder;
    const rgbaString = paletteAliasToRgbaString(castedColor, 'light', false);

    it(`renders correct border color of ${color} - ${rgbaString}`, () => {
      const { queryByTestId } = render(
        <RemoteImage
          borderColor={castedColor}
          source="https://images.coinbase.com/avatar?s=56"
          testID="remoteimage"
        />,
      );
      const image = queryByTestId('remoteimage');
      expect(image).toBeTruthy();

      expect(image).toHaveStyle({
        borderWidth: 2,
        borderColor: rgbaString,
      });
    });
  });
});
