import type { Property } from 'csstype';
import type { ColorScheme, ThemeVars } from '@cbhq/cds-common2/core/theme';

export type ThemeConfig = {
  lightSpectrum?: { [key in ThemeVars.SpectrumColor]: string };
  darkSpectrum?: { [key in ThemeVars.SpectrumColor]: string };
  lightColor?: { [key in ThemeVars.Color]: Property.Color };
  darkColor?: { [key in ThemeVars.Color]: Property.Color };
  space: { [key in ThemeVars.Space]: number };
  iconSize: { [key in ThemeVars.IconSize]: number };
  avatarSize: { [key in ThemeVars.AvatarSize]: number };
  borderWidth: { [key in ThemeVars.BorderWidth]: number };
  borderRadius: { [key in ThemeVars.BorderRadius]: number };
  fontFamily: { [key in ThemeVars.FontFamily]: Property.FontFamily };
  fontFamilyMono?: { [key in ThemeVars.FontFamily]: Property.FontFamily };
  fontSize: { [key in ThemeVars.FontSize]: Property.FontSize };
  fontWeight: { [key in ThemeVars.FontWeight]: Property.FontWeight };
  lineHeight: { [key in ThemeVars.LineHeight]: Property.LineHeight };
  textTransform: { [key in ThemeVars.TextTransform]: Property.TextTransform };
  shadow: { [key in ThemeVars.Shadow]: Property.BoxShadow };
  controlSize: { [key in ThemeVars.ControlSize]: number };
};

export type Theme = ThemeConfig & {
  activeColorScheme: ColorScheme;
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
  fontFamilyMono: 'fontFamilyMono',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  lineHeight: 'lineHeight',
  textTransform: 'textTransform',
  shadow: 'shadow',
  controlSize: 'controlSize',
} as const satisfies Record<
  Exclude<
    keyof Theme,
    'activeColorScheme' | 'lightSpectrum' | 'darkSpectrum' | 'lightColor' | 'darkColor'
  >,
  string
>;

/** Used to generate intellisense via ThemeCSSVars below. */
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
  textTransform: {
    [key in ThemeVars.TextTransform as `--${typeof styleVarPrefixes.textTransform}-${key}`]: Property.TextTransform;
  };
  shadow: {
    [key in ThemeVars.Shadow as `--${typeof styleVarPrefixes.shadow}-${key}`]: Property.BoxShadow;
  };
  controlSize: {
    [key in ThemeVars.ControlSize as `--${typeof styleVarPrefixes.controlSize}-${key}`]: Property.Width;
  };
};

type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends (
  x: infer I,
) => void
  ? I
  : never;

/** A flat object of the CSS variable names of all themeable vars, based on the Theme type. */
export type ThemeCSSVars = UnionToIntersection<ThemeObjectCssVars[keyof ThemeObjectCssVars]>;
