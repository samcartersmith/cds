import { FlexStyles } from './BoxBaseProps';
import { SpacingScale } from './SpacingScale';

export type SpacerBaseProps = Pick<FlexStyles, 'flexGrow' | 'flexShrink' | 'flexBasis'> & {
  /** Space in the horizontal direction */
  horizontal?: SpacingScale;
  /** Space in the vertical direction */
  vertical?: SpacingScale;
  /** Max space in the horizontal direction */
  maxHorizontal?: SpacingScale;
  /** Max space in the vertical direction */
  maxVertical?: SpacingScale;
  /** Min space in the horizontal direction */
  minHorizontal?: SpacingScale;
  /** Min space in the vertical direction */
  minVertical?: SpacingScale;
};
