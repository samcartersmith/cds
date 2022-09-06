import { renderHook } from '@testing-library/react-hooks';

import { useFallbackShape } from '../useFallbackShape';

describe('useFallbackShape()', () => {
  it('doesnt randomize while testing', () => {
    const { result, rerender } = renderHook(() => {
      return useFallbackShape('rectangle', 100);
    });

    expect(result.current).toEqual({ borderRadius: 0, width: 100 });
    rerender();
    expect(result.current).toEqual({ borderRadius: 0, width: 100 });
  });

  it('doesnt randomize for percy', () => {
    process.env.NODE_ENV = 'production';
    process.env.STORYBOOK_SKIP_ANIMATION = 'yolo';

    const { result, rerender } = renderHook(() => {
      return useFallbackShape('rectangle', 100);
    });

    expect(result.current).toEqual({ borderRadius: 0, width: 100 });
    rerender();
    expect(result.current).toEqual({ borderRadius: 0, width: 100 });

    process.env.NODE_ENV = 'test';
    process.env.STORYBOOK_SKIP_ANIMATION = '';
  });

  it('randomize rectangle shape', () => {
    process.env.NODE_ENV = 'production';
    process.env.STORYBOOK_SKIP_ANIMATION = '';

    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);

    const { result } = renderHook(() => {
      return useFallbackShape('rectangle', 100);
    });

    expect(result.current).toEqual({ borderRadius: 0, width: 81 });

    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('returns circle shape', () => {
    const { result } = renderHook(() => {
      return useFallbackShape('circle', 100);
    });

    expect(result.current).toEqual({ borderRadius: 50, width: 100 });
  });

  it('returns squircle shape', () => {
    const { result } = renderHook(() => {
      return useFallbackShape('squircle', 100);
    });

    expect(result.current).toEqual({ borderRadius: 8, width: 100 });
  });
});
