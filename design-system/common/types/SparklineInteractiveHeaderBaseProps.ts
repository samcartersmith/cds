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
  /**
   * Free form percentage change
   */
  percent: string;

  /**
   * Sign to denote the change in price
   */
  sign: '–' | '+' | '';

  /**
   * The variant to use for the price and percentage change
   */
  variant: SparklineInteractiveHeaderVariant;

  /**
   * Show the dollar amount of price change
   */
  priceChange?: string;

  /**
   * The accessoryText to show after the price and / or percentage change. An example is "All time"
   */
  accessoryText?: string;
};

export type SparklineInteractiveHeaderValues = {
  /**
   * Describes what the Header represents e.g. Bitcoin Price
   */
  label?: string;

  /**
   * Main content of header, this is usually the price
   */
  title?: string;

  /**
   * Provides additional information about the title, such as a price change
   */
  subHead?: SparklineInteractiveSubHead;
};

export type SparklineInteractiveHeaderRef = {
  update: (params: SparklineInteractiveHeaderValues) => void;
};

export type SparklineInteractiveSubHeadIconColor = SparklineInteractiveSubHead['variant'];
