/* eslint-disable @typescript-eslint/no-floating-promises */
import { act, renderHook } from '@testing-library/react-hooks';

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

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(duration);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), duration);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('pauses timer and returns remaining time', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 1000;
    const timeout = 500;
    const expectedRemainingTime = duration - timeout;
    let remainingTime;

    act(() => {
      result.current.start(callback, duration);
      jest.advanceTimersByTime(timeout);
      remainingTime = result.current.pause();
    });

    expect(remainingTime).toBe(expectedRemainingTime);
    expect(clearTimeout).toHaveBeenCalledTimes(2);
  });

  it('resumes timer', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 500;
    let remainingTime;

    act(() => {
      result.current.start(callback, duration);
      jest.advanceTimersByTime(200);
      remainingTime = result.current.pause();
      result.current.resume();
    });

    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), remainingTime);
  });

  it('clears timer', () => {
    const { result } = renderHook(() => useTimer());
    const callback = jest.fn();
    const duration = 500;

    act(() => {
      result.current.start(callback, duration);
      result.current.clear();
    });

    expect(clearTimeout).toHaveBeenCalledTimes(2);
  });
});
