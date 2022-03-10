import { renderHook, act } from '@testing-library/react-hooks';
import { useToastQueue } from '../useToastQueue';

jest.spyOn(global, 'setTimeout');
jest.spyOn(global, 'clearTimeout');
describe('useToastQueue', () => {
  it('adds toast', async () => {
    const { result } = renderHook(() => useToastQueue());
    jest.useFakeTimers();

    expect(result.current.activeToast).toBeUndefined();

    const duration = 1000;

    void act(() => {
      result.current.addToast(<div />, duration);
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), duration);
    expect(result.current.activeToast?.element).toBeTruthy();
  });

  it('remove active toast', async () => {
    const { result } = renderHook(() => useToastQueue());
    jest.useFakeTimers();

    void act(() => {
      result.current.addToast(<div />, 1000);
    });

    await act(async () => {
      await result.current.removeToast();
    });

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(result.current.activeToast).toBeUndefined();
  });

  it('clear toasts queue', async () => {
    const { result } = renderHook(() => useToastQueue());
    jest.useFakeTimers();

    void act(() => {
      result.current.addToast(<div />, 1000);
    });

    await act(async () => {
      await result.current.clearToastQueue();
    });

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(result.current.activeToast).toBeUndefined();
  });
});
