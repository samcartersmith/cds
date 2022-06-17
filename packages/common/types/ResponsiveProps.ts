import { FlexStyles, StackBaseProps } from './BoxBaseProps';
import { CellSpacingConfig } from './CellBaseProps';
import { Display } from './Display';
import { ResponsivePropsDevices } from './Responsive';
import { OffsetProps, SpacingProps } from './SpacingProps';
import { Visibility } from './Visibility';

type VisibilityProps = {
  visibility?: Visibility;
};

type DisplayProps = {
  display?: Display;
};

/**
 * @internal
 * Do not modify this without leads approval
 */
export type ResponsiveStyles = DisplayProps &
  FlexStyles &
  SpacingProps &
  OffsetProps &
  StackBaseProps &
  VisibilityProps;

export type ResponsiveProps = Partial<Record<ResponsivePropsDevices, ResponsiveStyles>>;

export type ResponsiveCellSpacingProps = Partial<Record<ResponsivePropsDevices, CellSpacingConfig>>;
