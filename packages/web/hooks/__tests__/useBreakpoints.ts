import '../../jest/__mocks__/matchMediaMinWidth.mock';

import { renderHook } from '@testing-library/react-hooks';

import { useBreakpoints } from '../useBreakpoints';

describe('useBreakpoints', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('detects when the window size is within the phone breakpoint range', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 400 });

    const { result } = renderHook(() => useBreakpoints());
    const { isPhone } = result.current;

    expect(isPhone).toBeTruthy();
  });
});
