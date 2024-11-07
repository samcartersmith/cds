import { BoxBaseProps } from './BoxBaseProps';
import { PaletteValue } from './Palette';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';
import { SpectrumHue } from './Spectrum';

export type TagIntent = 'informational' | 'promotional';
export type ColorScheme = Extract<
  SpectrumHue,
  'green' | 'purple' | 'blue' | 'yellow' | 'red' | 'gray'
>;

type TagThemedProps = {
  /**
   * Specify the colorScheme of the Tag
   * @default blue
   */
  colorScheme: ColorScheme;
  /** @danger Custom background color */
  background?: never;
  /** @danger Custom text color */
  color?: never;
};

type TagWildcardProps = {
  /**
   * Specify the colorScheme of the Tag
   * @default blue
   */
  colorScheme?: never;
  /** @danger Custom background color */
  background?: PaletteValue;
  /** @danger Custom text color */
  color?: PaletteValue;
};

export type TagBaseProps = {
  /** Children to render within the Tag. */
  children: NonNullable<React.ReactNode>;
  /**
   * Specify the intent of the Tag
   * @default informational
   */
  intent?: TagIntent;
  /** Setting a custom max width for this tag will enable text truncation */
  maxWidth?: BoxBaseProps['maxWidth'];
} & (TagThemedProps | TagWildcardProps) &
  SharedProps &
  SharedAccessibilityProps;
