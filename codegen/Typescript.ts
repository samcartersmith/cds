import { scales } from './configs/scaleConfig';
import { typographyConfig } from './configs/typographyConfig';
import { Spectrum } from './Spectrum/Spectrum';

const templates = {
  'theme/scale/types.ts': {
    types: {
      Scale: scales,
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
  'core/Text/Typography.ts': {
    types: {
      Typography: Object.keys(typographyConfig),
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
