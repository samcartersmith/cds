import {
  ReactNode,
  ReactElement,
  TdHTMLAttributes,
  ThHTMLAttributes,
  MouseEventHandler,
} from 'react';
import { FlexAxisValue, FlexSpaceCommon, PaletteForeground, SharedProps } from '@cbhq/cds-common';
import { TextProps } from '../../typography';

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
   * The color for all text components rendered inside the TableCell.
   * Use titleColor and subtitleColor if you need to be more specific
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
   * Callback to fire when pressed
   * @default noop
   */
  onPress?: MouseEventHandler;
  /**
   * Should the title/subtitle text truncate
   * @default false
   */
  overflow?: TextProps['overflow'];
  /**
   * Direction provides content flow control.
   * Use vertical to inherit a VStask, horizontal for an HStack
   * @default vertical
   */
  direction?: 'vertical' | 'horizontal';
} & (TdHTMLAttributes<HTMLTableCellElement> | ThHTMLAttributes<HTMLTableCellElement>) &
  SharedProps;

type TableCellPropsWithInputs = {
  /** Children to render within the cell. */
  children?: never;
  /**
   * If a title is provided, the default type style
   * will be inferred from context. If the cell is rendered
   * in a TableHeader, it will render as a TextHeadline. But when
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
