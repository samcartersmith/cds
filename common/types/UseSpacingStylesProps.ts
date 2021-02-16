import type { SpacingScale } from './SpacingScale';

export interface UseSpacingStylesProps {
  all?: SpacingScale;
  top?: SpacingScale;
  bottom?: SpacingScale;
  start?: SpacingScale;
  end?: SpacingScale;
  horizontal?: SpacingScale;
  vertical?: SpacingScale;
  isInverted?: boolean;
}
