import type { TextStyle, ViewStyle } from 'react-native';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';

export type ColorScheme = 'light' | 'dark';
export type ColorSchemePreference = ColorScheme | 'system';

type Shadow = {
  shadowColor?: ViewStyle['shadowColor'];
  shadowOpacity?: ViewStyle['shadowOpacity'];
  shadowOffset?: ViewStyle['shadowOffset'];
  shadowRadius?: ViewStyle['shadowRadius'];
};

export type ThemeConfig = {
  lightSpectrum?: { [key in ThemeVars.SpectrumColor]: string };
  darkSpectrum?: { [key in ThemeVars.SpectrumColor]: string };
  light?: { [key in ThemeVars.Color]: string };
  dark?: { [key in ThemeVars.Color]: string };
  space: { [key in ThemeVars.Space]: number };
  iconSize: { [key in ThemeVars.IconSize]: number };
  avatarSize: { [key in ThemeVars.AvatarSize]: number };
  borderWidth: { [key in ThemeVars.BorderWidth]: number };
  borderRadius: { [key in ThemeVars.BorderRadius]: number };
  fontFamily: { [key in ThemeVars.FontFamily]: string };
  fontSize: { [key in ThemeVars.FontSize]: number };
  fontWeight: { [key in ThemeVars.FontWeight]: TextStyle['fontWeight'] };
  lineHeight: { [key in ThemeVars.LineHeight]: number };
  shadow: { [key in ThemeVars.Shadow]: Shadow };
  zIndex: { [key in ThemeVars.ZIndex]: ViewStyle['zIndex'] };
  control: { [key in ThemeVars.ControlSize]: number };
};

export type Theme = ThemeConfig & {
  colorScheme: ColorScheme;
  spectrum: { [key in ThemeVars.SpectrumColor]: string };
  color: { [key in ThemeVars.Color]: string };
};
