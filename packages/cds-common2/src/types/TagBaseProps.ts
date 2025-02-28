import { ThemeVars } from '../core/theme';

import { BoxBaseProps } from './BoxBaseProps';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type TagIntent = 'informational' | 'promotional';
export type TagColorScheme = 'green' | 'purple' | 'blue' | 'yellow' | 'red' | 'gray';

type TagThemedProps = {
  /**
   * Specify the colorScheme of the Tag
   * @default blue
   */
  colorScheme: TagColorScheme;
  /** @danger Custom background color */
  background?: ThemeVars.SpectrumColor;
  /** @danger Custom text color */
  color?: ThemeVars.SpectrumColor;
};

type TagWildcardProps = {
  /**
   * Specify the colorScheme of the Tag
   * @default blue
   */
  colorScheme?: never;
  /** @danger Custom background color */
  background?: ThemeVars.SpectrumColor;
  /** @danger Custom text color */
  color?: ThemeVars.SpectrumColor;
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
