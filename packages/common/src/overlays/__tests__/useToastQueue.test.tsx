import { act, renderHook } from '@testing-library/react-hooks';

import { useToastQueue } from '../useToastQueue';

function countSetTimeoutCalls() {
  return (setTimeout as jest.MockedFunction<typeof setTimeout>).mock.calls.filter(
    ([fn, t]) => t !== 0 || !String(fn).includes('_flushCallback'),
  );
}

jest.useFakeTimers('legacy');
jest.spyOn(global, 'setTimeout');
jest.spyOn(global, 'clearTimeout');
describe('useToastQueue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('adds toast', async () => {
    const { result } = renderHook(() => useToastQueue());

    expect(result.current.activeToast).toBeUndefined();

    const duration = 1000;

    await act(() => {
      result.current.addToast(<div />, duration);
    });

    expect(countSetTimeoutCalls()).toHaveLength(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), duration);
    expect(result.current.activeToast?.element).toBeTruthy();
  });

  it('remove active toast', async () => {
    const { result } = renderHook(() => useToastQueue());

    await act(() => {
      result.current.addToast(<div />, 1000);
    });

    await act(async () => {
      await result.current.removeToast();
    });

    expect(countSetTimeoutCalls()).toHaveLength(1);
    expect(result.current.activeToast).toBeUndefined();
  });

  it('clear toasts queue', async () => {
    const { result } = renderHook(() => useToastQueue());

    await act(() => {
      result.current.addToast(<div />, 1000);
    });

    await act(() => {
      result.current.clearToastQueue();
    });

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(result.current.activeToast).toBeUndefined();
  });
});
