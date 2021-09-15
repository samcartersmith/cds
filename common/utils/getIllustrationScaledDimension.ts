import { illustrationSizes } from '../tokens/illustrations';
import { IllustrationVariant } from '../types/IllustrationNames';

export const getIllustrationScaledDimension = (
  dimension: string,
  illustrationType: IllustrationVariant,
  scaleMultiplier?: number,
) => {
  const { width, height } = illustrationSizes[illustrationType][dimension as never];
  const scaledWidth = scaleMultiplier ? scaleMultiplier * width : width;
  const scaledHeight = scaleMultiplier ? scaleMultiplier * height : height;

  return {
    width: scaledWidth,
    height: scaledHeight,
  };
};
