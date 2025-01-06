import { PaddingProps } from '../types';

export const getCardBodySpacingProps = ({
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  compact,
}: {
  compact?: boolean;
} & PaddingProps) => {
  if (compact)
    return {
      paddingBottom: paddingBottom ?? paddingY ?? padding ?? 1,
      paddingTop: paddingTop ?? paddingY ?? padding ?? 2,
      paddingLeft: paddingLeft ?? paddingX ?? padding ?? 2,
      paddingRight: paddingRight ?? paddingX ?? padding ?? 2,
    };
  return {
    paddingBottom: paddingBottom ?? paddingY ?? padding ?? 3,
    paddingTop: paddingTop ?? paddingY ?? padding ?? 3,
    paddingLeft: paddingLeft ?? paddingX ?? padding ?? 3,
    paddingRight: paddingRight ?? paddingX ?? padding ?? 3,
  };
};
