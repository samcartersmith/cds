import { SharedProps } from './SharedProps';

export type ChartHeaderProps = {
  /**
   * Default title, changing this prop has no effect once the default is rendered.
   */
  defaultTitle: string;

  /**
   * Default label, changing this prop has no effect once the default is rendered.
   */
  defaultLabel: string;

  /**
   * Default SubHead, changing this prop has no effect once the default is rendered.
   */
  defaultSubHead?: ChartSubHead;
} & SharedProps;

export type ChartHeaderVariant = 'foregroundMuted' | 'positive' | 'negative';

export type ChartSubHead = {
  percent: string;
  sign: '–' | '+' | '';
  variant: ChartHeaderVariant;
  priceChange?: string;
  accessoryText?: string;
};

export type ChartHeaderValues = {
  label?: string;
  title?: string;
  subHead?: ChartSubHead;
};

export type ChartHeaderRef = {
  update: (params: ChartHeaderValues) => void;
};

export type SubHeadIconColor = ChartSubHead['variant'];
