import { Shape } from './Shape';

export type FallbackRectWidthProps = {
  /** Disables randomization of rectangle fallback width. */
  disableRandomRectWidth?: boolean;
  /**
   * Creates a variant that contains rectangle fallbacks of deterministic width.
   * Variants map to a predetermined set of width values, which are cycled through repeatedly when the set is exhausted.
   */
  rectWidthVariant?: number;
};

export type FallbackBaseProps = {
  height: number | string;
  /**
   * @default rectangle
   */
  shape?: Shape;
  width: number | string;
  /** Disables randomization of rectangle shape width. */
  disableRandomRectWidth?: boolean;
  /**
   * When shape is a rectangle, creates a variant with deterministic width.
   * Variants map to a predetermined set of width values, which are cycled through repeatedly when the set is exhausted.
   */
  rectWidthVariant?: number;
};
