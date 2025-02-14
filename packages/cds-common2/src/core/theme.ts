/**
 * The core CDS Theme variable types.
 */

export type ColorScheme = 'dark' | 'light';
export type ColorSchemePreference = ColorScheme | 'system';

export namespace ThemeVars {
  export type SpectrumHue =
    | 'blue'
    | 'green'
    | 'orange'
    | 'yellow'
    | 'gray'
    | 'indigo'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal';

  export type SpectrumHueStep = 0 | 5 | 10 | 15 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

  export type SpectrumColor = `${SpectrumHue}${SpectrumHueStep}`;

  export type Color =
    | 'currentColor'
    // Foreground
    | 'fg'
    | 'fgMuted'
    | 'fgInverse'
    | 'fgPrimary'
    | 'fgWarning'
    | 'fgPositive'
    | 'fgNegative'
    // Background
    | 'bg'
    | 'bgAlternate'
    | 'bgInverse'
    | 'bgOverlay'
    | 'bgElevation1'
    | 'bgElevation2'
    | 'bgPrimary'
    | 'bgPrimaryWash'
    | 'bgSecondary'
    | 'bgSecondaryWash'
    | 'bgNegative'
    | 'bgNegativeWash'
    | 'bgPositive'
    | 'bgPositiveWash'
    | 'bgWarning'
    | 'bgWarningWash'
    | 'bgLine'
    | 'bgLineHeavy'
    | 'bgLineInverse'
    | 'bgLinePrimary'
    | 'bgLinePrimarySubtle'
    // Accent
    | 'accentSubtleRed'
    | 'accentBoldRed'
    | 'accentSubtleGreen'
    | 'accentBoldGreen'
    | 'accentSubtleBlue'
    | 'accentBoldBlue'
    | 'accentSubtlePurple'
    | 'accentBoldPurple'
    | 'accentSubtleYellow'
    | 'accentBoldYellow'
    | 'accentSubtleGray'
    | 'accentBoldGray'
    // Transparent
    | 'transparent'
    | 'transparentHover'
    | 'transparentPressed'
    | 'transparentDisabled';

  export type IllustrationColor =
    | 'primary'
    | 'black'
    | 'white'
    | 'gray'
    | 'gray2'
    | 'gray3'
    | 'positive'
    | 'negative'
    | 'accent1'
    | 'accent2'
    | 'accent3'
    | 'accent4'
    | 'invert'
    | 'invert2';

  export type Space = 0 | 0.25 | 0.5 | 0.75 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  export type IconSize = 'xs' | 's' | 'm' | 'l';

  export type AvatarSize = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

  export type BorderWidth = 0 | 100 | 200 | 300 | 400 | 500;

  export type BorderRadius = 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;

  type Font =
    | 'display1'
    | 'display2'
    | 'display3'
    | 'title1'
    | 'title2'
    | 'title3'
    | 'title4'
    | 'headline'
    | 'body'
    | 'label1'
    | 'label2'
    | 'caption'
    | 'legal';

  export type FontFamily = Font;
  export type FontSize = Font;
  export type FontWeight = Font;
  export type LineHeight = Font;
  export type TextTransform = Font;

  export type Shadow = 'elevation1' | 'elevation2';

  export type ControlSize =
    | 'checkboxSize'
    | 'radioSize'
    | 'switchWidth'
    | 'switchHeight'
    | 'switchThumbSize'
    | 'tileSize';
}
