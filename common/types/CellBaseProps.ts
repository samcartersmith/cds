import { IconName } from './IconName';
import { PaletteForeground } from './Palette';
import { SharedProps } from './SharedProps';
import { SpacingProps } from './SpacingProps';

export interface CellCommonProps extends SharedProps {
  /* Media (icon, asset, image, etc) to display at the start of the cell. */
  media?: React.ReactElement<CellMediaProps>;
  /** Is the cell disabled? Will apply opacity and disable interaction. */
  disabled?: boolean;
  /** Is the cell selected? Will apply a background and selected accessory. */
  selected?: boolean;
  /** Callback fired when the cell is pressed. */
  onPress?: () => void;
}

export interface CellProps extends CellCommonProps {
  accessory?: React.ReactElement<CellAccessoryProps>;
  alignItems?: 'center' | 'flex-start';
  children: React.ReactNode;
  detail?: React.ReactNode;
  maxContentWidth?: number | string;
  maxDetailWidth?: number | string;
  minContentWidth?: number | string;
  minDetailWidth?: number | string;
  minHeight?: number;
}

export type CellAccessoryType = 'arrow' | 'more' | 'selected';

export interface CellAccessoryProps extends SpacingProps {
  /** Type of accessory to display at the end. */
  type: CellAccessoryType;
}

export interface CellDetailProps {
  /** Label and or extra detail. */
  detail?: NonNullable<React.ReactNode>;
  /** Subdetail providing more information. */
  subdetail?: NonNullable<React.ReactNode>;
  /** Variant color to apply to the subdetail text. */
  variant?: Extract<PaletteForeground, 'foregroundMuted' | 'negative' | 'positive'>;
}

export type CellMediaType = 'asset' | 'avatar' | 'image' | 'icon';

export type CellMediaSource = string;

export interface CellMediaIconProps extends SharedProps {
  type: Extract<CellMediaType, 'icon'>;
  name: IconName;
}

export interface CellMediaOtherProps extends SharedProps {
  type: Exclude<CellMediaType, 'icon'>;
  title: string;
  source: CellMediaSource;
}

export type CellMediaProps = CellMediaIconProps | CellMediaOtherProps;

export interface ContentCellProps extends CellCommonProps {
  /** Accessory to display at the end of the cell. */
  accessory?: CellAccessoryType;
  /** Description of content. Content will wrap accordingly. */
  description?: React.ReactNode;
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

export interface ListCellProps extends CellCommonProps, CellDetailProps {
  /** Accessory to display at the end of the cell. */
  accessory?: CellAccessoryType;
  /** Interactive action, like a CTA or form element. Cannot be used alongside `onPress`. */
  action?: NonNullable<React.ReactNode>;
  /** Description of content. Max 1-2 lines, otherwise will truncate. */
  description?: NonNullable<React.ReactNode>;
  /** Title of content. Max 1-2 lines, otherwise will truncate. */
  title?: NonNullable<React.ReactNode>;
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
