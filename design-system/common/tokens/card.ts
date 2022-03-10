import { convertDimensionToSize } from '../utils/convertDimensionToSize';

export const cardSizes = {
  small: {
    width: 136,
    height: 144,
  },
  medium: {
    width: 312,
    height: 192,
  },
  large: {
    width: undefined,
    height: undefined,
  },
} as const;

export const defaultMediaDimension = '96x96';
export const defaultMediaSize = convertDimensionToSize(defaultMediaDimension);
export const defaultSpacingBottom = 2;
