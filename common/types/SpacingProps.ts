import type { SpacingScale } from './SpacingScale';

export interface OffsetProps {
  /** Apply negative outer spacing on all sides. */
  offset?: SpacingScale;
  /** Apply negative outer spacing on the bottom side. */
  offsetBottom?: SpacingScale;
  /** Apply negative outer spacing on the trailing side. */
  offsetEnd?: SpacingScale;
  /** Apply negative outer spacing on the leading and trailing sides. */
  offsetHorizontal?: SpacingScale;
  /** Apply negative outer spacing on the leading side. */
  offsetStart?: SpacingScale;
  /** Apply negative outer spacing on the top side. */
  offsetTop?: SpacingScale;
  /** Apply negative outer spacing on the top and bottom sides. */
  offsetVertical?: SpacingScale;
}

export interface SpacingProps {
  /** Apply inner spacing on all sides. */
  spacing?: SpacingScale;
  /** Apply inner spacing on the bottom side. */
  spacingBottom?: SpacingScale;
  /** Apply inner spacing on the trailing side. */
  spacingEnd?: SpacingScale;
  /** Apply inner spacing on the leading and trailing sides. */
  spacingHorizontal?: SpacingScale;
  /** Apply inner spacing on the leading side. */
  spacingStart?: SpacingScale;
  /** Apply inner spacing on the top side. */
  spacingTop?: SpacingScale;
  /** Apply inner spacing on the top and bottom sides. */
  spacingVertical?: SpacingScale;
}
