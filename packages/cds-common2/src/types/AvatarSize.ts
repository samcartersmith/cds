export type AvatarSize = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

export type AvatarPixelSize = 16 | 24 | 32 | 40 | 48 | 56;

export const avatarSizeMap: Record<AvatarSize, AvatarPixelSize> = {
  xxxl: 56,
  xxl: 48,
  xl: 40,
  l: 32,
  m: 24,
  s: 16,
};
