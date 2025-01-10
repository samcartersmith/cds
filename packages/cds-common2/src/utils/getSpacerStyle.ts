import { ThemeVars } from '../core/theme';
import { SpacerBaseProps } from '../types/SpacerBaseProps';

export const getSpacerStyle = ({
  flexGrow,
  flexShrink,
  flexBasis,
  horizontal,
  vertical,
  maxHorizontal,
  maxVertical,
  minHorizontal,
  minVertical,
  spacingScaleValues,
}: SpacerBaseProps & {
  spacingScaleValues: Record<Exclude<ThemeVars.Space, 0>, string | number>;
}) => {
  const isFixedSize = horizontal !== undefined || vertical !== undefined;

  return {
    // fixed size spacer by default should not grow or shrink.
    flexGrow: isFixedSize ? flexGrow ?? 0 : flexGrow ?? 1,
    flexShrink: isFixedSize ? flexShrink ?? 0 : flexShrink ?? 1,
    flexBasis: isFixedSize ? flexBasis : flexBasis ?? 1,
    width: horizontal && spacingScaleValues[horizontal],
    height: vertical && spacingScaleValues[vertical],
    maxWidth: maxHorizontal && spacingScaleValues[maxHorizontal],
    maxHeight: maxVertical && spacingScaleValues[maxVertical],
    minWidth: minHorizontal && spacingScaleValues[minHorizontal],
    minHeight: minVertical && spacingScaleValues[minVertical],
  };
};
