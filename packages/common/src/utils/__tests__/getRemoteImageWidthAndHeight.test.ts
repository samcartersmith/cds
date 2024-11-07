import { normalScaleMap } from '../../hooks/useIconSize';
import { AvatarPixelSize } from '../../types';
import { getRemoteImageWidthAndHeight } from '../getRemoteImageWidthAndHeight';

describe('getRemoteImageWidthAndHeight', () => {
  it('if width/height/size is undefined, default to avatarSize={m}', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      avatarSize: normalScaleMap.m as AvatarPixelSize,
    });
    expect(width).toBe(normalScaleMap.m);
    expect(height).toBe(normalScaleMap.m);
  });

  it('if width/height is undefined, use size', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      avatarSize: normalScaleMap.l as AvatarPixelSize,
      size: 'l',
    });
    expect(width).toBe(normalScaleMap.l);
    expect(height).toBe(normalScaleMap.l);
  });

  it('if height is defined, but width and size is undefined', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      height: 30,
      avatarSize: normalScaleMap.l as AvatarPixelSize,
    });
    expect(width).toBeUndefined();
    expect(height).toBe(30);
  });

  it('if width is defined, but height and size is undefined', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      width: 30,
      avatarSize: normalScaleMap.l as AvatarPixelSize,
    });
    expect(height).toBeUndefined();
    expect(width).toBe(30);
  });

  it('if size is defined, but height and width is undefined', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      size: 'l',
      avatarSize: normalScaleMap.l as AvatarPixelSize,
    });
    expect(height).toBe(normalScaleMap.l);
    expect(width).toBe(normalScaleMap.l);
  });

  it('width and height defined', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      width: 40,
      height: 12,
      avatarSize: normalScaleMap.l as AvatarPixelSize,
    });
    expect(height).toBe(12);
    expect(width).toBe(40);
  });
});
