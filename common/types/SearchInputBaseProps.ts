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
