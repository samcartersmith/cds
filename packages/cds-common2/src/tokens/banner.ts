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
    background: 'background',
    iconColor: 'iconPrimary',
    textColor: 'textForeground',
    primaryActionColor: 'textPrimary',
    secondaryActionColor: 'textForeground',
    iconButtonColor: 'iconForegroundMuted',
    borderColor: 'line',
  },
  promotional: {
    background: 'backgroundPrimaryWash',
    iconColor: 'iconPrimary',
    textColor: 'textForeground',
    primaryActionColor: 'textPrimary',
    secondaryActionColor: 'textForeground',
    iconButtonColor: 'textForegroundMuted',
    borderColor: undefined,
  },
  danger: {
    background: 'backgroundNegative',
    iconColor: 'iconForegroundInverse',
    textColor: 'textForegroundInverse',
    primaryActionColor: 'textForegroundInverse',
    secondaryActionColor: 'textForegroundInverse',
    iconButtonColor: 'iconForegroundInverse',
    borderColor: 'backgroundNegative',
  },
  warning: {
    background: 'background',
    iconColor: 'iconNegative',
    textColor: 'textForeground',
    primaryActionColor: 'textForeground',
    secondaryActionColor: 'textForeground',
    iconButtonColor: 'iconForegroundMuted',
    borderColor: undefined,
  },
  error: {
    background: undefined,
    iconColor: 'iconNegative',
    textColor: 'textForeground',
    primaryActionColor: 'textPrimary',
    secondaryActionColor: 'textForeground',
    iconButtonColor: 'iconForeground',
    borderColor: undefined,
  },
};
