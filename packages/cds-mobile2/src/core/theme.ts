import type { TextStyle, ViewStyle } from 'react-native';
import type { ColorScheme, ThemeVars } from '@cbhq/cds-common2/core/theme';

type Shadow = {
  shadowColor?: ViewStyle['shadowColor'];
  shadowOpacity?: ViewStyle['shadowOpacity'];
  shadowOffset?: ViewStyle['shadowOffset'];
  shadowRadius?: ViewStyle['shadowRadius'];
};

export type ThemeConfig = {
  lightSpectrum?: { [key in ThemeVars.SpectrumColor]: string };
  darkSpectrum?: { [key in ThemeVars.SpectrumColor]: string };
  lightColor?: { [key in ThemeVars.Color]: string };
  darkColor?: { [key in ThemeVars.Color]: string };
  space: { [key in ThemeVars.Space]: number };
  iconSize: { [key in ThemeVars.IconSize]: number };
  avatarSize: { [key in ThemeVars.AvatarSize]: number };
  borderWidth: { [key in ThemeVars.BorderWidth]: number };
  borderRadius: { [key in ThemeVars.BorderRadius]: number };
  fontFamily: { [key in ThemeVars.FontFamily]: string };
  fontFamilyMono?: { [key in ThemeVars.FontFamily]: string };
  fontSize: { [key in ThemeVars.FontSize]: number };
  fontWeight: { [key in ThemeVars.FontWeight]: TextStyle['fontWeight'] };
  lineHeight: { [key in ThemeVars.LineHeight]: number };
  textTransform: { [key in ThemeVars.TextTransform]: TextStyle['textTransform'] };
  shadow: { [key in ThemeVars.Shadow]: Shadow };
  controlSize: { [key in ThemeVars.ControlSize]: number };
};

export type Theme = ThemeConfig & {
  activeColorScheme: ColorScheme;
  spectrum: { [key in ThemeVars.SpectrumColor]: string };
  color: { [key in ThemeVars.Color]: string };
};
