/* eslint-disable @typescript-eslint/no-floating-promises */
import { renderHook, act } from '@testing-library/react-hooks';
import { useTimer } from '../useTimer';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
jest.spyOn(global, 'clearTimeout');

describe('useTimer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns functions', () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.clear).toBeTruthy();
    expect(result.current.start).toBeTruthy();
    expect(result.current.pause).toBeTruthy();
    expect(result.current.resume).toBeTruthy();
  });

  it('starts timer', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 1000;

    act(() => result.current.start(callback, duration));

    jest.advanceTimersByTime(duration);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), duration);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('pauses timer and returns remaining time', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 500;
    const timeout = 200;
    const expectedRemainingTime = duration - timeout;

    act(() => result.current.start(callback, duration));

    setTimeout(() => {
      expect(result.current.pause()).toBe(expectedRemainingTime);
      expect(clearTimeout).toHaveBeenCalledTimes(1);
    }, timeout);
  });

  it('resumes timer', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 500;
    let remainingTime: number;

    act(() => result.current.start(callback, duration));

    setTimeout(() => {
      act(() => {
        remainingTime = result.current.pause();
        result.current.resume();
      });

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), remainingTime);
      expect(callback).toHaveBeenCalledTimes(1);
    }, 200);
  });

  it('clears timer', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 500;

    act(() => {
      result.current.start(callback, duration);
    });

    setTimeout(() => {
      result.current.clear();
      expect(clearTimeout).toHaveBeenCalledTimes(1);
    }, 200);
  });
});
