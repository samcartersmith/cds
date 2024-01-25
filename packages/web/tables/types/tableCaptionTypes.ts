import { ReactElement } from 'react';
import {
  PaletteBackground,
  PaletteForeground,
  ResponsiveCellSpacingProps,
  SharedProps,
  TextAlignProps,
} from '@cbhq/cds-common';

import { HTMLTextTags } from '../../typography';

import { TableCellProps } from './tableCellTypes';

export type TableCaptionProps = {
  /**
   * The children to render, either as a React element or a string.
   */
  children: ReactElement | string;
  /**
   * A semantic HTML element or a React component to be rendered.
   * Only applicable when `children` is a string.
   * @default 'span'
   */
  as?: HTMLTextTags;
  /**
   * Specify text alignment. Only applicable when `children` is a string.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
   * @default 'start'
   */
  align?: TextAlignProps['align'];
  /**
   * Set the text color to a CDS palette foreground color name.
   */
  color?: PaletteForeground;
  /**
   * Set the background color to a CDS palette background color name.
   */
  backgroundColor?: PaletteBackground;
  /**
   * The spacing to use on the parent wrapper of the caption.
   * Overrides table cell spacing defaults.
   */
  outerSpacing?: TableCellProps['outerSpacing'];
  /**
   * The spacing to use on the inner content of the caption.
   * Overrides table cell spacing defaults.
   */
  innerSpacing?: TableCellProps['innerSpacing'];
  /**
   * Specify props by device breakpoint.
   */
  responsiveConfig?: ResponsiveCellSpacingProps;
} & SharedProps &
  Omit<React.HTMLAttributes<HTMLTableCaptionElement>, 'dangerouslySetInnerHTML'>;
