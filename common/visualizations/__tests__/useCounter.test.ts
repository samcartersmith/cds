import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from '../useCounter';

describe('useCounter tests', () => {
  it('can count up', async () => {
    const { result } = renderHook(() => {
      return useCounter(0, 75, 50);
    });

    expect(result.current).toEqual(0);

    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          expect(result.current).toEqual(75);
          resolve(undefined);
        }, 55);
      });
    });
  });

  it('can count down', async () => {
    const { result } = renderHook(() => {
      return useCounter(75, 0, 50);
    });

    expect(result.current).toEqual(75);

    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          expect(result.current).toEqual(0);
          resolve(undefined);
        }, 55);
      });
    });
  });
});
