 
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
    process.env.STORYBOOK_SKIP_ANIMATION = undefined;
  });
});
