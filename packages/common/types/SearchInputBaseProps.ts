import { TextInputBaseProps } from './TextInputBaseProps';

export type SearchInputBaseProps = Omit<
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
