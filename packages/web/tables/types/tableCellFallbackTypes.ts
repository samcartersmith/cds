import { CellMediaType, SharedProps } from '@cbhq/cds-common';

import { TableCellProps } from './tableCellTypes';

export type TableCellFallbackProps = {
  /** Display title shimmer. */
  title?: boolean;
  /** Display subtitle shimmer. */
  subtitle?: boolean;
  /** Display start shimmer with a shape according to type. */
  start?: CellMediaType;
  /** Display end shimmer with a shape according to type. */
  end?: CellMediaType;
} & SharedProps &
  Pick<TableCellProps, 'width' | 'outerSpacing' | 'innerSpacing' | 'responsiveConfig' | 'as'>;
