import { getDefaultSizeObjectForIllustration } from '../utils/getDefaultSizeObjectForIllustration';

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

export const cardVariantMediaDefaults = {
  announcement: 'spotSquare',
  feed: 'spotRectangle',
  feature: 'spotSquare',
} as const;

export const announcementCardMinHeight = getDefaultSizeObjectForIllustration(
  cardVariantMediaDefaults.announcement,
).height;
