import { ThemeVars } from '../core/theme';

import { FlexGrow, FlexShrink, FlexStyles } from './BoxBaseProps';
import { Display } from './Display';
import { ResponsivePropsDevices } from './Responsive';
import { MarginProps, PaddingProps } from './SpacingProps';
import { Visibility } from './Visibility';

type VisibilityProps = {
  visibility?: Visibility;
};

type DisplayProps = {
  display?: Display;
};

type StackProps = {
  /** Gap to insert between siblings. */
  gap?: ThemeVars.Space;
};

/**
 * @internal
 * Do not modify this without leads approval
 */
export type ResponsiveStyles = DisplayProps &
  FlexStyles &
  PaddingProps &
  MarginProps &
  StackProps &
  VisibilityProps &
  FlexGrow &
  FlexShrink;

export type ResponsiveProps = Partial<Record<ResponsivePropsDevices, ResponsiveStyles>>;
