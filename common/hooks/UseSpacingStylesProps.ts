import type { SpacingScale } from '../types';

export type UseSpacingStylesProps = Partial<
  Readonly<{
    all: SpacingScale;
    bottom: SpacingScale;
    end: SpacingScale;
    horizontal: SpacingScale;
    start: SpacingScale;
    top: SpacingScale;
    vertical: SpacingScale;
    isInverted: boolean;
  }>
>;
