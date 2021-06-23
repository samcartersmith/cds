import { iconPixelSizes } from '../configs/iconConfig';

export type SvgData = { paths: string[]; viewBox: string };
type SvgPathMap = Record<string, SvgData>;
type GlyphMap = Record<string, string>;
export type SizeMap = Record<string, SvgPathMap | GlyphMap>;

export const createIconSet = () => {
  const nameSet = new Set<string>();
  const sizeMap = iconPixelSizes.reduce((acc, size) => {
    acc[size] = {};
    return acc;
  }, {} as SizeMap);

  return { nameSet, sizeMap };
};
