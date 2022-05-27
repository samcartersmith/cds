import type { DotSize } from '../types';
import type { AvatarSize } from '../types/AvatarSize';

import { borderRadius, borderWidth } from './border';

export const avatarIconSizeMap: Record<AvatarSize, DotSize> = {
  xxxl: 's',
  xxl: 's',
  xl: 's',
  l: 'xs',
  m: 'xs',
} as const;

export const avatarDotSizeMap: Record<AvatarSize, DotSize> = {
  xxxl: 'm',
  xxl: 'm',
  xl: 'm',
  l: 's',
  m: 'xs',
} as const;

export const dotOuterContainerStyles = {
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  borderWidth: borderWidth.button,
} as const;

export const dotCountContent = {
  minWidth: borderRadius.tooltip * 2,
  height: borderRadius.tooltip * 2,
  borderRadius: borderRadius.pill,
} as const;

export const dotCountPadding = {
  paddingTop: 3,
  paddingBottom: 3,
  paddingLeft: 6,
  paddingRight: 6,
} as const;

// This works for the purposes of TabNavigation, but it's not stable
// TODO Update this with more stable values
export const dotSizeTokens = { s: 24, m: 36, l: 42 } as const;
export const getDotSize = (count?: number) => {
  if (!count || count < 10) return dotSizeTokens.s;
  if (count >= 10) return dotSizeTokens.m;
  if (count >= 100) return dotSizeTokens.l;

  return dotSizeTokens.s;
};
