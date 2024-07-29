import { TextInputBaseProps } from './TextInputBaseProps';

export type SearchInputBaseProps = {
  /**
   * Callback is fired when a user hits enter on the keyboard. Can obtain the query
   * through str parameter
   */
  onSearch?: (str: string) => void;
  /**
   * hide the start icon
   * @default false
   */
  hideStartIcon?: boolean;
  /**
   * Set the start icon. You can only
   * set it to search | backArrow icon. If
   * you set this, the icon would not toggle
   * between search and backArrow depending on
   * the focus state
   * @default search
   */
  startIcon?: 'search' | 'backArrow';
  /**
   * hide the end icon
   * @default undefined
   */
  hideEndIcon?: boolean;
  /**
   * Set the end node
   * @default undefined
   */
  end?: React.ReactNode;
} & Omit<
  TextInputBaseProps,
  | 'helperText'
  | 'suffix'
  | 'start'
  | 'end'
  | 'align'
  | 'label'
  | 'variant'
  | 'borderRadius'
  | 'height'
>;
