import { DotBaseProps, DotVariant } from './DotBaseProps';
import { PinPlacement } from './Placement';

export type DotCountVariants = Extract<DotVariant, 'negative'>;

export type DotCountPinPlacement = Extract<PinPlacement, 'top-end'>;

export type DotCountBaseProps = Omit<DotBaseProps, 'size' | 'variant' | 'pin'> & {
  /**
   * The number value to be shown in the dot. If count is <= 0, dot will not show up.
   *  */
  count: number;
  /**
   * If a badge count is greater than max, it will truncate the numbers so its max+
   * @default 99
   *  */
  max?: number;
  /**
   * Background color of dot
   * @default negative
   * */
  variant?: DotCountVariants;
  /** Position of dot relative to its parent */
  pin?: DotCountPinPlacement;
};
