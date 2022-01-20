import { SharedProps } from './SharedProps';

export type SparklineInteractiveHeaderProps = {
  /**
   * Default title, changing this prop has no effect once the default is rendered.
   */
  defaultTitle: string;

  /**
   * Default label, changing this prop has no effect once the default is rendered.
   */
  defaultLabel?: string;

  /**
   * Default SubHead, changing this prop has no effect once the default is rendered.
   */
  defaultSubHead?: SparklineInteractiveSubHead;
} & SharedProps;

export type SparklineInteractiveHeaderVariant = 'foregroundMuted' | 'positive' | 'negative';

export type SparklineInteractiveSubHead = {
  percent: string;
  sign: '–' | '+' | '';
  variant: SparklineInteractiveHeaderVariant;
  priceChange?: string;
  accessoryText?: string;
};

export type SparklineInteractiveHeaderValues = {
  label?: string;
  title?: string;
  subHead?: SparklineInteractiveSubHead;
};

export type SparklineInteractiveHeaderRef = {
  update: (params: SparklineInteractiveHeaderValues) => void;
};

export type SparklineInteractiveSubHeadIconColor = SparklineInteractiveSubHead['variant'];
