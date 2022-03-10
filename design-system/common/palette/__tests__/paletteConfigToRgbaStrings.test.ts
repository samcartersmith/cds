import { spectrumConfigs } from '../../spectrum/spectrumConfigs';
import { paletteConfigToRgbaStrings } from '../paletteConfigToRgbaStrings';
import { defaultPalette } from '../constants';

describe('paletteConfigToRgbaStrings', () => {
  it('returns correct values', () => {
    expect(paletteConfigToRgbaStrings(defaultPalette, 'dark').primary).toEqual(
      `rgba(${spectrumConfigs.base.dark.blue60.join(',')},1)`,
    );
  });
});
