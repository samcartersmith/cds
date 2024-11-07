import { spectrumConfigs } from '../../spectrum/spectrumConfigs';
import { defaultPalette } from '../constants';
import { paletteConfigToRgbaStrings } from '../paletteConfigToRgbaStrings';

describe('paletteConfigToRgbaStrings', () => {
  it('returns correct values', () => {
    expect(paletteConfigToRgbaStrings(defaultPalette, 'dark').primary).toBe(
      `rgba(${spectrumConfigs.base.dark.blue60.join(',')},1)`,
    );
  });
});
