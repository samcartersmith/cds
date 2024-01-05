import { avatarDensePixelSizes, avatarPixelSizes, avatarSizes } from './configs/avatarConfig';
import { RootScalePreference, scales } from './configs/scaleConfig';
import { spacingScale } from './configs/spacingConfig';
import { typographyConfig } from './configs/typographyConfig';
import { RootSpectrumPreference, Spectrum } from './Spectrum/Spectrum';

const templates = {
  'packages/common/types/Scale.ts': {
    types: {
      Scale: scales,
      ScaleDensity: ['dense', 'normal'],
      RootScalePreference,
    },
  },
  'packages/common/types/Spectrum.ts': {
    types: {
      Spectrum: Spectrum.modes,
      SpectrumHue: Spectrum.hueNames,
      SpectrumHueStep: Spectrum.hueSteps,
      // eslint-disable-next-line no-template-curly-in-string
      SpectrumAlias: '`${SpectrumHue}${SpectrumHueStep}`',
      SpectrumAliasWithOpacity: 'readonly [SpectrumAlias, number]',
      RootSpectrumPreference,
    },
  },
  'packages/common/types/Typography.ts': {
    types: {
      Typography: Object.keys(typographyConfig),
    },
  },
  'packages/common/types/SpacingScale.ts': {
    types: {
      SpacingScale: spacingScale,
    },
  },
  'packages/common/types/AvatarSize.ts': {
    types: {
      AvatarSize: avatarSizes,
      AvatarPixelSize: avatarPixelSizes,
      AvatarDensePixelSize: avatarDensePixelSizes,
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
