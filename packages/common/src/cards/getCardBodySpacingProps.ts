import { SpacingProps } from '../types';

export const getCardBodySpacingProps = ({
  spacingStart,
  spacingEnd,
  spacingTop,
  spacingBottom,
  spacing,
  spacingHorizontal,
  spacingVertical,
  compact,
}: {
  compact?: boolean;
} & SpacingProps) => {
  if (compact)
    return {
      spacingBottom: spacingBottom ?? spacingVertical ?? spacing ?? 1,
      spacingTop: spacingTop ?? spacingVertical ?? spacing ?? 2,
      spacingStart: spacingStart ?? spacingHorizontal ?? spacing ?? 2,
      spacingEnd: spacingEnd ?? spacingHorizontal ?? spacing ?? 2,
    };
  return {
    spacingBottom: spacingBottom ?? spacingVertical ?? spacing ?? 3,
    spacingTop: spacingTop ?? spacingVertical ?? spacing ?? 3,
    spacingStart: spacingStart ?? spacingHorizontal ?? spacing ?? 3,
    spacingEnd: spacingEnd ?? spacingHorizontal ?? spacing ?? 3,
  };
};
