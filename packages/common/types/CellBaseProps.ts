import { cellPriorities } from '../tokens/cell';

import { BorderRadius } from './BorderRadius';
import { FallbackRectWidthProps } from './FallbackBaseProps';
import { IconName } from './IconName';
import { PictogramProps } from './IllustrationProps';
import { PaletteForeground } from './Palette';
import { SharedProps } from './SharedProps';
import { OffsetProps, SpacingProps } from './SpacingProps';

export type CellSpacing = SpacingProps & OffsetProps;
export type CellSpacingConfig = Pick<CellBaseProps, 'innerSpacing' | 'outerSpacing'>;
export type CellPriority = (typeof cellPriorities)[number];

export type CellCommonProps = {
  borderRadius?: BorderRadius;
  /** enables compact spacing */
  compact?: boolean;
  /** Apply a fixed width to the detail (end). */
  detailWidth?: number | string;
  /** Is the cell disabled? Will apply opacity and disable interaction. */
  disabled?: boolean;
  /** Which piece of content has the highest priority in regards to text truncation, growing, and shrinking. */
  priority?: CellPriority | CellPriority[];
  /** Is the cell selected? Will apply a background and selected accessory. */
  selected?: boolean;
  /** The spacing to use on the parent wrapper of Cell */
  outerSpacing?: CellSpacing;
  /** The spacing to use on the inner content of Cell */
  innerSpacing?: CellSpacing;
} & SharedProps;

export type CellBaseProps = {
  accessory?: React.ReactElement<CellAccessoryProps>;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  children: React.ReactNode;
  detail?: React.ReactNode;
  intermediary?: React.ReactNode;
  media?: React.ReactElement;
  minHeight?: number;
  maxHeight?: number;
  shouldOverflow?: boolean;
} & CellCommonProps;

export type CellAccessoryType = 'arrow' | 'more' | 'selected';

export type CellAccessoryProps = {
  /** Type of accessory to display at the end. */
  type: CellAccessoryType;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  className?: string;
} & SpacingProps;

export type CellDetailVariant = Extract<
  PaletteForeground,
  'foregroundMuted' | 'negative' | 'positive' | 'warning'
>;

export type CellDetailProps = {
  /**
   * Label and/or extra detail. This prop is only intended to accept a string or Text component;
   * other use cases, while allowed, are not supported and may result in unexpected behavior.
   */
  detail?: React.ReactNode;
  /**
   * Subdetail providing more information. This prop is only intended to accept a string or Text component;
   * other use cases, while allowed, are not supported and may result in unexpected behavior.
   */
  subdetail?: React.ReactNode;
  /** Variant color to apply to the subdetail text. */
  variant?: CellDetailVariant;
};

export type CellMediaType = 'asset' | 'avatar' | 'image' | 'icon' | 'pictogram';

export type CellMediaSource = string | number;

export type CellMediaIconProps = {
  type: Extract<CellMediaType, 'icon'>;
  name: IconName;
  color?: Extract<PaletteForeground, 'primary' | 'foreground' | 'foregroundMuted'>;
} & SharedProps;

export type CellMediaPictogramProps<T> = {
  type: Extract<CellMediaType, 'pictogram'>;
  illustration: React.ReactElement<T>;
} & SharedProps;

export type CellMediaOtherProps = {
  type: Exclude<CellMediaType, 'icon' | 'pictogram'>;
  /**
   * @deprecated This prop will be removed in v6.0.0
   * If required, use `accessibilityLabel` and `accessibilityHint` instead to set accessible labels.
   * Refer to https://cds.cbhq.net/components/cell-media/ for updated accessibility guidance.
   */
  title?: string;
  source: CellMediaSource;
} & SharedProps;

export type CellMediaProps<T = PictogramProps> =
  | CellMediaIconProps
  | CellMediaPictogramProps<T>
  | CellMediaOtherProps;

export type ContentCellBaseProps = {
  /** Accessory to display at the end of the cell. */
  accessory?: CellAccessoryType;
  /** Description of content. Content will wrap accordingly. */
  description?: React.ReactNode;
  /** Media (icon, asset, image, etc) to display at the start of the cell. */
  media?: React.ReactElement;
  /** Meta information to display at the end of the title. */
  meta?: React.ReactNode;
  /** Subtitle of content. Max 1 line, otherwise will truncate. */
  subtitle?: React.ReactNode;
  /** Title of content. Max 1 line, otherwise will truncate. */
  title?: React.ReactNode;
} & CellCommonProps;

export type ContentCellFallbackProps = {
  /** Display description shimmer. */
  description?: boolean;
  /** Display media shimmer with a shape according to type. */
  media?: CellMediaType;
  /** Display meta shimmer. */
  meta?: boolean;
  /** Display subtitle shimmer. */
  subtitle?: boolean;
  /** Display title shimmer. */
  title?: boolean;
} & FallbackRectWidthProps;

export type ListCellBaseProps = {
  /** Accessory to display at the end of the cell. */
  accessory?: CellAccessoryType;
  /** Interactive action, like a CTA or form element. Cannot be used alongside `onPress`. */
  action?: React.ReactNode;
  /** Description of content. Max 1 line (with title) or 2 lines (without), otherwise will truncate. */
  description?: React.ReactNode;
  /** For internal use only. */
  intermediary?: React.ReactNode;
  /* Media (icon, asset, image, etc) to display at the start of the cell. */
  media?: React.ReactElement;
  /** Allow the description to span multiple lines. This *will* break fixed height requirements, so should not be used in a `FlatList`. */
  multiline?: boolean;
  /** Title of content. Max 1 line (with description) or 2 lines (without), otherwise will truncate. */
  title?: React.ReactNode;
} & CellCommonProps &
  CellDetailProps;

export type ListCellFallbackProps = {
  /** Display description shimmer. */
  description?: boolean;
  /** Display detail shimmer. */
  detail?: boolean;
  /** Display media shimmer with a shape according to type. */
  media?: CellMediaType;
  /** Display subdetail shimmer. */
  subdetail?: boolean;
  /** Display title shimmer. */
  title?: boolean;
} & FallbackRectWidthProps &
  Pick<CellCommonProps, 'compact' | 'innerSpacing' | 'outerSpacing'> &
  SharedProps;
