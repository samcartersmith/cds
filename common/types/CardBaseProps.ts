import type { BorderedStyles, FlexStyles, PinningDirection, StackBaseProps } from './BoxBaseProps';
import type { DimensionStyles } from './DimensionStyles';
import type { ElevationLevels } from './ElevationLevels';
import type { GroupBaseProps } from './GroupBaseProps';
import type { IllustrationVariant } from './IllustrationNames';
import type { PaletteBackground } from './Palette';
import type { SharedProps } from './SharedProps';
import type { OffsetProps, SpacingProps } from './SpacingProps';

export type CardVariant = 'announcement' | 'feed' | 'feature';
export type CardBoxProps = SharedProps &
  SpacingProps &
  FlexStyles &
  OffsetProps &
  DimensionStyles &
  StackBaseProps &
  BorderedStyles;

export type CardBaseProps = {
  /** Set the background color of the Card. Passing `true` will enable the default background, otherwise a custom palette alias can be passed. */
  background?: true | Exclude<PaletteBackground, 'divider' | 'stroke'>;
  /** Determines box shadow styles. Parent should have overflow set to visible to ensure styles are not clipped. */
  elevation?: ElevationLevels;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Size of the card. Small and medium have fixed widths and large grows with its children. */
  size?: 'small' | 'medium' | 'large';
} & DimensionStyles &
  OffsetProps &
  SharedProps &
  SpacingProps &
  FlexStyles &
  SharedProps;

export type CardHeaderBaseProps = {
  /** Absolute or Relative path to Avatar */
  avatarUrl?: string;
  /** Meta Data Text to be displayed in TextLegal */
  metaData?: string;
  /** Text to be displayed in TextCaption */
  description?: string;
  /** IconButton ReactNode */
  action?: React.ReactNode;
} & SharedProps;

export type CardFooterBaseProps = {
  /** CardFooter takes one or many actions as children */
  children: React.ReactNode;
} & SharedProps;

export type CardBodyBaseProps = {
  /** Text to be displayed in TextHeadline */
  title?: string;
  /** Text to be displayed in TextBody */
  description?: string;
  /** Remote Image or other Image React Node */
  media?: React.ReactNode;
  /** Vertical places media above text content, Horizontal places media to the side of text content */
  orientation?: CardBodyOrientationProps['orientation'];
  /**
   * Maximum number of lines shown. Text that exceeds will be truncated.
   * @default 3
   */
  numberOfLines?: number;
} & SharedProps;

export type CardBodyOrientationProps = {
  /** Vertical places media above text content, Horizontal places media to the side of text content */
  orientation?: 'vertical' | 'horizontal';
};

export type FeedCardBaseProps = {
  /** Absolute or Relative to Avatar */
  avatarUrl?: string;
  /** Meta Data Text to be displayed in TextLegal */
  headerMetaData?: string;
  /** Text to be displayed in TextCaption */
  headerDescription: string;
  /** IconButton ReactNode */
  headerActionNode: React.ReactNode;
  /** Text to be displayed in TextHeadline */
  bodyTitle?: string;
  /** Text to be displayed in TextBody */
  bodyDescription: string;
  /** Absolute or Relative to Image */
  bodyMediaUrl: string;
  /** Vertical places media above text content, Horizontal places media to the side of text content */
  bodyOrientation: CardBodyOrientationProps['orientation'];
  /** ReactNode that should be one or more actions */
  footerActions: React.ReactNode;
} & SharedProps;

export type CardGroupBaseProps<BoxProps> = GroupBaseProps<BoxProps>;

export type CardRemoteImageProps = {
  /** The url to the image asset */
  src: string;
  /** The Illustration component the RemoteImage should mimic sizing from. */
  size: IllustrationVariant;
} & SharedProps;
