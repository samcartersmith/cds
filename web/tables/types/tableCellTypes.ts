import { ReactNode, ReactElement, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { FlexAxisValue, FlexSpaceCommon, PaletteForeground } from '@cbhq/cds-common';

export type TableCellTag = 'td' | 'th' | 'div';

type TableCellBaseProps = {
  /**
   * Element (icon, asset, image, etc) to display at the start of the cell
   * @default undefined
   */
  start?: ReactElement;
  /**
   * Element (icon, asset, image, etc) to display at the end of the cell
   * @default undefined
   */
  end?: ReactElement;
  /**
   * Linaria flavored className.
   * @default undefined
   */
  className?: string;
  /**
   * CDS Palette foreground color name
   * @default undefined
   */
  color?: PaletteForeground;
  /**
   * This prop us useful for right-aligning the last column
   * @default 'flex-start'
   */
  justifyContent?: FlexAxisValue | FlexSpaceCommon | 'space-evenly';
  /**
   * This prop us useful for top-aligning cells
   * @default 'center'
   */
  alignItems?: 'flex-start' | 'center';
  /**
   * The colSpan attribute defines the number of columns a cell should span
   * @default 1
   */
  colSpan?: number;
  /**
   * Useful for preventing columns from jumping around with pagination
   * @default 1
   */
  minWidth?: string | number;
  /**
   * Callback to fire when pressed
   * @default noop
   */
  onPress?: React.MouseEventHandler;
  /**
   * Direction provides content flow control.
   * Use vertical to inherit a VStask, horizontal for an HStack
   * @default vertical
   */
  direction?: 'vertical' | 'horizontal';
} & (TdHTMLAttributes<HTMLTableCellElement> | ThHTMLAttributes<HTMLTableCellElement>);

type TableCellPropsWithInputs = {
  /** Children to render within the cell. */
  children?: never;
  /**
   * If a title is provided, the default type style
   * will be inferred from context. If the cell is rendered
   * in a TableHead, it will render as a TextHeadline. But when
   * rendered in a TableBody the text will render as TextBody.
   * @default undefined
   */
  title: string;
  titleColor?: PaletteForeground;
  /**
   * A subtitle will appear below the title.
   * Type is set with TextLabel2
   * @default undefined
   */
  subtitle?: string;
  subtitleColor?: PaletteForeground;
} & TableCellBaseProps;
type TableCellPropsWithChildren = {
  /**
   * If children are provided, title, subtitle and description MUST be unset
   * @default undefined
   */
  children: NonNullable<ReactNode | ReactNode[]>;
  title?: never;
  titleColor?: never;
  subtitle?: never;
  subtitleColor?: never;
} & TableCellBaseProps;

export type TableCellProps = TableCellPropsWithInputs | TableCellPropsWithChildren;
