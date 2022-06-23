import { CellBaseProps, ListCellBaseProps } from './CellBaseProps';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type SelectOptionBaseProps = {
  /** Unique identifier for each option */
  value: string;
} & Omit<CellBaseProps, 'children' | 'offsetHorizontal' | 'reduceHorizontalSpacing' | 'selected'> &
  Pick<ListCellBaseProps, 'title' | 'description' | 'multiline' | 'compact'> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;
