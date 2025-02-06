import { ThemeVars } from '../core/theme';
import { BannerVariant } from '../types/BannerBaseProps';

type BannerVariantStyle = {
  background: ThemeVars.Color | undefined;
  iconColor: ThemeVars.Color;
  textColor: ThemeVars.Color;
  primaryActionColor: ThemeVars.Color;
  secondaryActionColor: ThemeVars.Color;
  iconButtonColor: ThemeVars.Color;
  borderColor: ThemeVars.Color | undefined;
};

export type BannerVariantConfig = Record<BannerVariant, BannerVariantStyle>;

export const variants: BannerVariantConfig = {
  informational: {
    background: 'bg',
    iconColor: 'fgPrimary',
    textColor: 'fg',
    primaryActionColor: 'fgPrimary',
    secondaryActionColor: 'fg',
    iconButtonColor: 'fgMuted',
    borderColor: 'bgLine',
  },
  promotional: {
    background: 'bgPrimaryWash',
    iconColor: 'fgPrimary',
    textColor: 'fg',
    primaryActionColor: 'fgPrimary',
    secondaryActionColor: 'fg',
    iconButtonColor: 'fgMuted',
    borderColor: undefined,
  },
  danger: {
    background: 'bgNegative',
    iconColor: 'fgInverse',
    textColor: 'fgInverse',
    primaryActionColor: 'fgInverse',
    secondaryActionColor: 'fgInverse',
    iconButtonColor: 'fgInverse',
    borderColor: 'bgNegative',
  },
  warning: {
    background: 'bg',
    iconColor: 'fgNegative',
    textColor: 'fg',
    primaryActionColor: 'fg',
    secondaryActionColor: 'fg',
    iconButtonColor: 'fgMuted',
    borderColor: undefined,
  },
  error: {
    background: undefined,
    iconColor: 'fgNegative',
    textColor: 'fg',
    primaryActionColor: 'fgPrimary',
    secondaryActionColor: 'fg',
    iconButtonColor: 'fg',
    borderColor: undefined,
  },
};
