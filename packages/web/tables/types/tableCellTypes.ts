import {
  MouseEventHandler,
  ReactElement,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import {
  CellBaseProps,
  FlexAxisValue,
  FlexSpaceCommon,
  PaletteForeground,
  SharedProps,
} from '@cbhq/cds-common';

import { CellProps, CellSharedProps } from '../../cells/Cell';
import { TextProps } from '../../typography';

export type TableCellTag = 'td' | 'th' | 'div';

type TableCellSharedProps = (TdHTMLAttributes<HTMLTableCellElement> &
  ThHTMLAttributes<HTMLTableCellElement>) &
  SharedProps;
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
  color?: PaletteForeground | 'currentColor';
  /**
   * This prop us useful for right-aligning the last column
   * @default 'flex-start'
   */
  justifyContent?: FlexAxisValue | FlexSpaceCommon | 'space-evenly';
  /**
   * This prop us useful for aligning the last item to the right, or top-aligning cells
   * @default 'center'
   */
  alignItems?: CellBaseProps['alignItems'];
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
  /**
   * @danger HTML width attribute to help with column layout.This attr
   * is deprecated, and should _only_ be used to unblock migration efforts
   * @default undefined
   */
  dangerouslySetHtmlWidth?: TableCellSharedProps['width'];
  /**
   * As a convenience, the width prop will set the css width and maxWidth props
   * @default undefined
   */
  width?: TableCellSharedProps['width'];
  /**
   * The spacing to use on the parent wrapper of Cell
   */
  outerSpacing?: CellProps['innerSpacing'];
  /**
   * The spacing to use on the inner content of Cell
   * @default { spacingHorizontal: 0 }
   */
  innerSpacing?: CellProps['innerSpacing'];
  /** Specify spacing styles by device breakpoint */
  responsiveConfig?: CellSharedProps['responsiveConfig'];
} & TableCellSharedProps;

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
  titleColor?: PaletteForeground | 'currentColor';
  /**
   * A subtitle will appear below the title.
   * Type is set with TextLabel2
   * @default undefined
   */
  subtitle?: string;
  subtitleColor?: PaletteForeground | 'currentColor';
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
