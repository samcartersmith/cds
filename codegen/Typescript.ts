import { scales } from './configs/scaleConfig';
import { spacingScaleWithZero } from './configs/spacingConfig';
import { typographyConfig } from './configs/typographyConfig';
import { Spectrum } from './Spectrum/Spectrum';

const templates = {
  'common/types/Scale.ts': {
    types: {
      Scale: scales,
    },
  },
  'common/types/Spectrum.ts': {
    types: {
      Spectrum: Spectrum.modes,
      SpectrumHue: Spectrum.hueNames,
      SpectrumHueStep: Spectrum.hueSteps,
      SpectrumAlias: '`${SpectrumHue}${SpectrumHueStep}`',
      SpectrumAliasWithOpacity: '[SpectrumAlias, number]',
    },
  },
  'common/types/Typography.ts': {
    types: {
      Typography: Object.keys(typographyConfig),
    },
  },
  'common/types/SpacingScale.ts': {
    types: {
      SpacingScale: spacingScaleWithZero,
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
