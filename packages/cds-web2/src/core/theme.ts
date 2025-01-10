import type { Property } from 'csstype';
import type { ThemeVars } from '@cbhq/cds-common2/new/vars';

export type ThemeConfig = {
  lightSpectrum?: { [key in ThemeVars.SpectrumColor]: string };
  darkSpectrum?: { [key in ThemeVars.SpectrumColor]: string };
  light?: { [key in ThemeVars.Color]: Property.Color };
  dark?: { [key in ThemeVars.Color]: Property.Color };
  space: { [key in ThemeVars.Space]: number };
  iconSize: { [key in ThemeVars.IconSize]: number };
  avatarSize: { [key in ThemeVars.AvatarSize]: number };
  borderWidth: { [key in ThemeVars.BorderWidth]: number };
  borderRadius: { [key in ThemeVars.BorderRadius]: number };
  fontFamily: { [key in ThemeVars.FontFamily]: Property.FontFamily };
  fontSize: { [key in ThemeVars.FontSize]: Property.FontSize };
  fontWeight: { [key in ThemeVars.FontWeight]: Property.FontWeight };
  lineHeight: { [key in ThemeVars.LineHeight]: Property.LineHeight };
  shadow: { [key in ThemeVars.Shadow]: Property.BoxShadow };
  zIndex: { [key in ThemeVars.ZIndex]: Property.ZIndex };
  control: { [key in ThemeVars.ControlSize]: number };
};

export type Theme = ThemeConfig & {
  colorScheme: ColorScheme;
  spectrum: { [key in ThemeVars.SpectrumColor]: string };
  color: { [key in ThemeVars.Color]: Property.Color };
};

/** Maps our StyleVars to their CSS variable prefixes. For example, the names of CSS vars generated from `iconSize` vars will be prefixed with `--iconSize-`. */
export const styleVarPrefixes = {
  spectrum: '',
  color: 'color',
  space: 'space',
  iconSize: 'iconSize',
  avatarSize: 'avatarSize',
  borderWidth: 'borderWidth',
  borderRadius: 'borderRadius',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  lineHeight: 'lineHeight',
  shadow: 'shadow',
  zIndex: 'zIndex',
  control: 'control',
} as const satisfies Record<
  Exclude<keyof Theme, 'colorScheme' | 'lightSpectrum' | 'darkSpectrum' | 'light' | 'dark'>,
  string
>;

type ThemeObjectCssVars = {
  spectrum: {
    [key in ThemeVars.SpectrumColor as `--${key}`]: string;
  };
  color: {
    [key in ThemeVars.Color as `--${typeof styleVarPrefixes.color}-${key}`]: Property.Color;
  };
  space: {
    [key in ThemeVars.Space as `--${typeof styleVarPrefixes.space}-${key}`]: Property.Padding;
  };
  iconSize: {
    [key in ThemeVars.IconSize as `--${typeof styleVarPrefixes.iconSize}-${key}`]: Property.Width;
  };
  avatarSize: {
    [key in ThemeVars.AvatarSize as `--${typeof styleVarPrefixes.avatarSize}-${key}`]: Property.Width;
  };
  borderWidth: {
    [key in ThemeVars.BorderWidth as `--${typeof styleVarPrefixes.borderWidth}-${key}`]: Property.BorderWidth;
  };
  borderRadius: {
    [key in ThemeVars.BorderRadius as `--${typeof styleVarPrefixes.borderRadius}-${key}`]: Property.BorderRadius;
  };
  fontFamily: {
    [key in ThemeVars.FontFamily as `--${typeof styleVarPrefixes.fontFamily}-${key}`]: Property.FontFamily;
  };
  fontSize: {
    [key in ThemeVars.FontSize as `--${typeof styleVarPrefixes.fontSize}-${key}`]: Property.FontSize;
  };
  fontWeight: {
    [key in ThemeVars.FontWeight as `--${typeof styleVarPrefixes.fontWeight}-${key}`]: Property.FontWeight;
  };
  lineHeight: {
    [key in ThemeVars.LineHeight as `--${typeof styleVarPrefixes.lineHeight}-${key}`]: Property.LineHeight;
  };
  shadow: {
    [key in ThemeVars.Shadow as `--${typeof styleVarPrefixes.shadow}-${key}`]: Property.BoxShadow;
  };
  zIndex: {
    [key in ThemeVars.ZIndex as `--${typeof styleVarPrefixes.zIndex}-${key}`]: Property.ZIndex;
  };
  control: {
    [key in ThemeVars.ControlSize as `--${typeof styleVarPrefixes.control}-${key}`]: Property.Width;
  };
};

type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends (
  x: infer I,
) => void
  ? I
  : never;

/** A flat object of the CSS variable names of all themeable vars, based on the Theme type. */
export type ThemeCSSVars = UnionToIntersection<ThemeObjectCssVars[keyof ThemeObjectCssVars]>;

export type ColorScheme = 'light' | 'dark';
export type ColorSchemePreference = ColorScheme | 'system';
