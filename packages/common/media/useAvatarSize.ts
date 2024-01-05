import { useScaleConditional } from '../scale/useScaleConditional';
import type { AvatarDensePixelSize, AvatarPixelSize, AvatarSize } from '../types/AvatarSize';

type AvatarDenseScaleMap = Record<AvatarSize, AvatarDensePixelSize>;
type AvatarScaleMap = Record<AvatarSize, AvatarPixelSize>;

export const denseScaleMap: AvatarDenseScaleMap = { xxxl: 48, xxl: 44, xl: 36, l: 24, m: 16 };
export const normalScaleMap: AvatarScaleMap = { xxxl: 56, xxl: 48, xl: 40, l: 32, m: 24 };

export function getNormalAvatarPixelSize(size: AvatarSize) {
  return normalScaleMap[size];
}

export function getDenseAvatarPixelSize(size: AvatarSize) {
  return denseScaleMap[size];
}

export const useAvatarSize = (size: AvatarSize) => {
  const scaleMap = useScaleConditional({ dense: denseScaleMap, normal: normalScaleMap });
  return scaleMap[size];
};
