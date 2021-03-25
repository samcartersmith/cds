import { renderHook, act } from '@testing-library/react-hooks';

import { useDimensions, Options, observerErr, borderBoxWarn } from '../useDimensions';

describe('useDimensions', () => {
  const target = { current: document.createElement('div') };
  const renderHelper = ({ ref = target, ...rest }: Options<HTMLDivElement> = {}) =>
    renderHook(() => useDimensions({ ref, ...rest }));

  interface Event {
    borderBoxSize?: { blockSize: number; inlineSize: number };
    contentBoxSize?: { blockSize: number; inlineSize: number };
    contentRect?: { width: number; height?: number };
  }

  let callback: (_event: Event[]) => void;
  const observe = jest.fn();
  const disconnect = jest.fn();
  const mockResizeObserver = jest.fn(cb => ({
    observe: () => {
      callback = cb;
      observe();
    },
    unobserve: () => {},
    disconnect,
  }));

  /*
    When using the delete operator in strictNullChecks, the operand must now be any, unknown, never, or be optional
    (in that it contains undefined in the type). Otherwise, use of the delete operator is an error.
  */
  const deleteResizeObserver = () => {
    // @ts-expect-error See comment above
    delete global.ResizeObserver;
  };

  const deleteResizeObserverEntry = () => {
    // @ts-expect-error See comment above
    delete global.ResizeObserverEntry;
  };

  const triggerObserverCb = (event: Event) => {
    callback([event]);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    global.ResizeObserver = mockResizeObserver;
    global.ResizeObserverEntry = jest.fn();
  });

  it("should not start observe if the target isn't set", () => {
    renderHelper({ ref: null });
    expect(observe).not.toHaveBeenCalled();
  });

  it('should return workable unobserve method', () => {
    const { result } = renderHelper();
    result.current.unobserve();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it('should return workable observe method', () => {
    const { result } = renderHelper();
    result.current.unobserve();
    result.current.observe(null);
    expect(observe).toHaveBeenCalledTimes(2);
  });

  it('should return workable ref', () => {
    const { result } = renderHelper({ ref: null });
    expect(result.current.ref).toStrictEqual({ current: null });

    result.current.ref = target;
    expect(result.current.ref).toStrictEqual(target);
  });

  it('should return width and height correctly', () => {
    const { result } = renderHelper();
    expect(result.current.width).toBe(0);
    expect(result.current.height).toBe(0);

    const contentBoxSize = { blockSize: 100, inlineSize: 100 };
    act(() => triggerObserverCb({ contentBoxSize }));
    expect(result.current.width).toBe(contentBoxSize.blockSize);
    expect(result.current.height).toBe(contentBoxSize.inlineSize);

    const contentRect = { width: 100, height: 100 };
    act(() => triggerObserverCb({ contentRect }));
    expect(result.current.width).toBe(contentRect.width);
    expect(result.current.height).toBe(contentRect.height);
  });

  it('should use border-box size', () => {
    console.warn = jest.fn();
    let { result } = renderHelper({ useBorderBoxSize: true });
    const contentBoxSize = { blockSize: 100, inlineSize: 100 };
    act(() => {
      triggerObserverCb({ contentBoxSize });
      triggerObserverCb({ contentBoxSize });
    });
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(borderBoxWarn);
    expect(result.current.width).toBe(contentBoxSize.blockSize);
    expect(result.current.height).toBe(contentBoxSize.inlineSize);

    console.warn = jest.fn();
    result = renderHelper({ useBorderBoxSize: true }).result;
    const borderBoxSize = { blockSize: 110, inlineSize: 110 };
    act(() => triggerObserverCb({ contentBoxSize, borderBoxSize }));
    expect(console.warn).not.toHaveBeenCalledWith(borderBoxWarn);
    expect(result.current.width).toBe(borderBoxSize.blockSize);
    expect(result.current.height).toBe(borderBoxSize.inlineSize);
  });

  it('should return currentBreakpoint correctly', () => {
    let { result } = renderHelper();
    expect(result.current.currentBreakpoint).toBe('');

    result = renderHelper({ breakpoints: { T1: 100 } }).result;
    act(() => triggerObserverCb({ contentRect: { width: 0 } }));
    expect(result.current.currentBreakpoint).toBe('');
    act(() => triggerObserverCb({ contentRect: { width: 99 } }));
    expect(result.current.currentBreakpoint).toBe('');

    result = renderHelper({ breakpoints: { T0: 0, T1: 100 } }).result;
    act(() => triggerObserverCb({ contentRect: { width: 0 } }));
    expect(result.current.currentBreakpoint).toBe('T0');
    act(() => triggerObserverCb({ contentRect: { width: 99 } }));
    expect(result.current.currentBreakpoint).toBe('T0');

    act(() => triggerObserverCb({ contentRect: { width: 100 } }));
    expect(result.current.currentBreakpoint).toBe('T1');
    act(() => triggerObserverCb({ contentRect: { width: 199 } }));
    expect(result.current.currentBreakpoint).toBe('T1');
  });

  it('should return entry correctly', () => {
    const { result } = renderHelper();
    expect(result.current.entry).toBeUndefined();

    const entry = { contentRect: { width: 100, height: 100 } };
    act(() => triggerObserverCb(entry));
    expect(result.current.entry).toStrictEqual(entry);
  });

  it('should stop observe when un-mount', () => {
    const { unmount } = renderHelper();
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it('should trigger onResize without breakpoints', () => {
    const onResize = jest.fn(event => {
      event.unobserve();
      event.observe();
    });
    renderHelper({ onResize });
    const contentRect = { width: 100, height: 100 };
    act(() => triggerObserverCb({ contentRect }));
    expect(onResize).toHaveBeenCalledWith({
      currentBreakpoint: '',
      width: contentRect.width,
      height: contentRect.height,
      entry: { contentRect },
      observe: expect.any(Function),
      unobserve: expect.any(Function),
    });
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledTimes(2);
  });

  it('should trigger onResize with breakpoints', () => {
    const onResize = jest.fn(event => {
      event.unobserve();
      event.observe();
    });
    renderHelper({ breakpoints: { T0: 0, T1: 100 }, onResize });
    const contentRect = { width: 50, height: 100 };
    act(() => {
      triggerObserverCb({ contentRect });
      triggerObserverCb({ contentRect });
    });
    expect(onResize).toHaveBeenCalledTimes(1);
    expect(onResize).toHaveBeenCalledWith({
      currentBreakpoint: 'T0',
      width: contentRect.width,
      height: contentRect.height,
      entry: { contentRect },
      observe: expect.any(Function),
      unobserve: expect.any(Function),
    });
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledTimes(2);
  });

  it('should update state on breakpoint changed', () => {
    const { result } = renderHelper({
      breakpoints: { T0: 100, T1: 200 },
      updateOnBreakpointChange: true,
    });
    act(() => triggerObserverCb({ contentRect: { width: 50 } }));
    expect(result.current.width).toBe(0);
    act(() => triggerObserverCb({ contentRect: { width: 100 } }));
    expect(result.current.width).toBe(100);
  });

  it('should update state conditionally', () => {
    const { result } = renderHelper({
      shouldUpdate: ({ width }) => width > 300,
    });
    act(() => triggerObserverCb({ contentRect: { width: 100 } }));
    expect(result.current.width).toBe(0);
    act(() => triggerObserverCb({ contentRect: { width: 400 } }));
    expect(result.current.width).toBe(400);
    act(() => triggerObserverCb({ contentRect: { width: 100 } }));
    expect(result.current.width).toBe(400);
  });

  it('should update state with conflict options', () => {
    let { result } = renderHelper({
      updateOnBreakpointChange: true,
    });
    act(() => triggerObserverCb({ contentRect: { width: 50 } }));
    expect(result.current.width).toBe(50);

    result = renderHelper({
      breakpoints: { T0: 100, T1: 200 },
      updateOnBreakpointChange: true,
      shouldUpdate: ({ width }) => width > 300,
    }).result;
    act(() => triggerObserverCb({ contentRect: { width: 100 } }));
    expect(result.current.width).toBe(0);
    act(() => triggerObserverCb({ contentRect: { width: 400 } }));
    expect(result.current.width).toBe(400);
  });

  it('should throw resize observer error', () => {
    console.error = jest.fn();

    renderHelper();
    expect(console.error).not.toHaveBeenCalled();
    deleteResizeObserver();
    renderHelper({ polyfill: mockResizeObserver });
    expect(console.error).not.toHaveBeenCalled();

    renderHelper();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(observerErr);

    global.ResizeObserver = mockResizeObserver;
    deleteResizeObserverEntry();
    renderHelper();
    expect(console.error).toHaveBeenCalledTimes(2);
  });

  it('should use polyfill', () => {
    deleteResizeObserver();
    deleteResizeObserverEntry();
    renderHelper({ polyfill: mockResizeObserver });
    expect(observe).toHaveBeenCalledTimes(1);
  });
});
