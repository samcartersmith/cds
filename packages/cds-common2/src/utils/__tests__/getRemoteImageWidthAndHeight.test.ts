import { avatarSizeMap } from '../../types';
import { getRemoteImageWidthAndHeight } from '../getRemoteImageWidthAndHeight';

describe('getRemoteImageWidthAndHeight', () => {
  it('if width/height/size is undefined, default to avatarSize={m}', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      avatarSize: avatarSizeMap.m,
    });
    expect(width).toBe(avatarSizeMap.m);
    expect(height).toBe(avatarSizeMap.m);
  });

  it('if width/height is undefined, use size', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      avatarSize: avatarSizeMap.l,
      size: 'l',
    });
    expect(width).toBe(avatarSizeMap.l);
    expect(height).toBe(avatarSizeMap.l);
  });

  it('if height is defined, but width and size is undefined', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      height: 30,
      avatarSize: avatarSizeMap.l,
    });
    expect(width).toBeUndefined();
    expect(height).toBe(30);
  });

  it('if width is defined, but height and size is undefined', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      width: 30,
      avatarSize: avatarSizeMap.l,
    });
    expect(height).toBeUndefined();
    expect(width).toBe(30);
  });

  it('if size is defined, but height and width is undefined', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      size: 'l',
      avatarSize: avatarSizeMap.l,
    });
    expect(height).toBe(avatarSizeMap.l);
    expect(width).toBe(avatarSizeMap.l);
  });

  it('width and height defined', () => {
    const { width, height } = getRemoteImageWidthAndHeight({
      width: 40,
      height: 12,
      avatarSize: avatarSizeMap.l,
    });
    expect(height).toBe(12);
    expect(width).toBe(40);
  });
});
