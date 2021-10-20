import { scales, RootScalePreference } from './configs/scaleConfig';
import { spacingScaleWithZero } from './configs/spacingConfig';
import { typographyConfig } from './configs/typographyConfig';
import { Spectrum, RootSpectrumPreference } from './Spectrum/Spectrum';
import { avatarPixelSizes, avatarSizes } from './configs/avatarConfig';

const templates = {
  'common/types/Scale.ts': {
    types: {
      Scale: scales,
      ScaleDensity: ['dense', 'normal'],
      RootScalePreference,
    },
  },
  'common/types/Spectrum.ts': {
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
  'common/types/AvatarSize.ts': {
    types: {
      AvatarSize: avatarSizes,
      AvatarPixelSize: avatarPixelSizes,
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
