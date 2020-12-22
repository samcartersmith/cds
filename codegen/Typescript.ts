import { scales } from '@cb/design-system/codegen/configs/scaleConfig';

import { Palette } from './Palette';
import { Spectrum } from './Spectrum/Spectrum';

const makeUnion = <T extends string>(group: T[]) => group.map(item => `"${item}"`).join('|');

const templates = {
  'theme/scale/types.ts': {
    types: {
      Scale: scales,
    },
  },
  'theme/palette/types.ts': {
    imports: [
      `import { ReadonlyDeep } from 'type-fest';`,
      '',
      `import { SpectrumAlias, SpectrumAliasWithOpacity } from '../spectrum/types';`,
      `import { defaultPalette } from "./defaultPalette"`,
    ],
    types: {
      PaletteAlias: 'keyof typeof defaultPalette',
      PaletteForeground: `Extract<PaletteAlias, ${makeUnion(Palette.paletteForegrounds)}>`,
      PaletteBackground: `Extract<PaletteAlias, ${makeUnion(Palette.paletteBackgrounds)}>`,
      PaletteConfig: `ReadonlyDeep<Record<PaletteAlias, SpectrumAlias | SpectrumAliasWithOpacity>>`,
    },
  },
  'theme/spectrum/types.ts': {
    types: {
      Spectrum: Spectrum.modes,
      SpectrumHue: Spectrum.hueNames,
      SpectrumHueStep: Spectrum.hueSteps,
      SpectrumAlias: '`${SpectrumHue}${SpectrumHueStep}`',
      SpectrumAliasWithOpacity: '[SpectrumAlias, number]',
    },
  },
};

export const TypeScript = Object.entries(templates).reduce((prev, [dest, data]) => {
  return [
    ...prev,
    {
      dest,
      data,
    },
  ];
}, [] as { dest: string; data: Record<string, unknown> }[]);
