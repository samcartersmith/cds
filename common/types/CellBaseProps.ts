import { IconName } from './IconName';
import { IllustrationPictogramNames } from './Illustration';
import { PaletteForeground } from './Palette';
import { SharedProps } from './SharedProps';
import { SpacingProps, OffsetProps } from './SpacingProps';

export interface CellCommonProps extends SharedProps, Pick<OffsetProps, 'offsetHorizontal'> {
  /** Apply a fixed width to the detail (end). */
  detailWidth?: number | string;
  /** Is the cell disabled? Will apply opacity and disable interaction. */
  disabled?: boolean;
  /** Which piece of content has the highest priority in regards to text truncation, growing, and shrinking. */
  priority?: 'start' | 'middle' | 'end';
  /** Reduce horizontal spacing for tighter layout requirements. */
  reduceHorizontalSpacing?: boolean;
  /** Is the cell selected? Will apply a background and selected accessory. */
  selected?: boolean;
}

export interface CellBaseProps extends CellCommonProps, SpacingProps {
  accessory?: React.ReactElement<CellAccessoryProps>;
  alignItems?: 'center' | 'flex-start';
  children: React.ReactNode;
  detail?: React.ReactNode;
  intermediary?: React.ReactNode;
  media?: React.ReactElement;
  minHeight?: number;
}

export type CellAccessoryType = 'arrow' | 'more' | 'selected';

export interface CellAccessoryProps extends SpacingProps {
  /** Type of accessory to display at the end. */
  type: CellAccessoryType;
}

export type CellDetailVariant = Extract<
  PaletteForeground,
  'foregroundMuted' | 'negative' | 'positive'
>;

export interface CellDetailProps {
  /** Label and or extra detail. */
  detail?: React.ReactNode;
  /** Subdetail providing more information. */
  subdetail?: React.ReactNode;
  /** Variant color to apply to the subdetail text. */
  variant?: CellDetailVariant;
}

export type CellMediaType = 'asset' | 'avatar' | 'image' | 'icon' | 'pictogram';

export type CellMediaSource = string | number;

export interface CellMediaIconProps extends SharedProps {
  type: Extract<CellMediaType, 'icon'>;
  name: IconName;
}

export interface CellMediaPictogramProps extends SharedProps {
  type: Extract<CellMediaType, 'pictogram'>;
  illustration: React.ReactElement<{
    name: IllustrationPictogramNames;
    height?: number;
    width?: number;
  }>;
}

export interface CellMediaOtherProps extends SharedProps {
  type: Exclude<CellMediaType, 'icon' | 'pictogram'>;
  title?: string;
  source: CellMediaSource;
}

export type CellMediaProps = CellMediaIconProps | CellMediaPictogramProps | CellMediaOtherProps;

export interface ContentCellBaseProps extends CellCommonProps {
  /** Accessory to display at the end of the cell. */
  accessory?: CellAccessoryType;
  /** Description of content. Content will wrap accordingly. */
  description?: React.ReactNode;
  /* Media (icon, asset, image, etc) to display at the start of the cell. */
  media?: React.ReactElement;
  /** Meta information to display at the end of the title. */
  meta?: React.ReactNode;
  /** Subtitle of content. Max 1 line, otherwise will truncate. */
  subtitle?: React.ReactNode;
  /** Title of content. Max 1 line, otherwise will truncate. */
  title?: React.ReactNode;
}

export interface ContentCellFallbackProps {
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
}

export interface ListCellBaseProps extends CellCommonProps, CellDetailProps {
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
}

export interface ListCellFallbackProps {
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
}
