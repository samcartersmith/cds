import { ThemeVars } from '../new/vars';
import { BannerVariant } from '../types/AlphaBannerBaseProps';

export type BannerVariantStyle = {
  background: ThemeVars.Color | undefined;
  iconColor: ThemeVars.Color;
  textColor: ThemeVars.Color;
  primaryActionColor: ThemeVars.Color;
  secondaryActionColor: ThemeVars.Color;
  iconButtonColor: ThemeVars.Color;
  borderColor: ThemeVars.Color;
};

export type BannerVariantConfig = Record<BannerVariant, BannerVariantStyle>;

export const variants: BannerVariantConfig = {
  informational: {
    background: 'backgroundSecondary',
    iconColor: 'iconPrimary',
    textColor: 'textForeground',
    primaryActionColor: 'textPrimary',
    secondaryActionColor: 'textForeground',
    iconButtonColor: 'iconForeground',
    borderColor: 'backgroundPrimary',
  },
  promotional: {
    background: 'backgroundPrimaryWash',
    iconColor: 'iconPrimary',
    textColor: 'textForeground',
    primaryActionColor: 'textPrimary',
    secondaryActionColor: 'textForeground',
    iconButtonColor: 'iconForeground',
    borderColor: 'backgroundPrimary',
  },
  warning: {
    background: 'backgroundWarningWash',
    iconColor: 'iconWarning',
    textColor: 'textForeground',
    primaryActionColor: 'textPrimary',
    secondaryActionColor: 'textForeground',
    iconButtonColor: 'iconForeground',
    borderColor: 'backgroundWarning',
  },
  error: {
    background: 'backgroundNegativeWash',
    iconColor: 'iconNegative',
    textColor: 'textForeground',
    primaryActionColor: 'textPrimary',
    secondaryActionColor: 'textForeground',
    iconButtonColor: 'iconForeground',
    borderColor: 'backgroundNegative',
  },
};

export const bannerMinWidth = 320;
