import { renderHook } from '@testing-library/react-hooks';

import { TableRowRef } from '../../types/tableRowTypes';
import { useTableRowListener } from '../useTableRowListener';

describe('useTableRowListener.test', () => {
  it('triggers listeners', () => {
    const mockTableRowRef = {
      current: {
        addEventListener: jest.fn(
          (event: string, handler: (keyboardEvent: KeyboardEvent) => void) => {
            handler({ key: 'Enter', code: 'None' } as KeyboardEvent);
          },
        ),
        removeEventListener: jest.fn(),
      },
    };
    const mockHandler = jest.fn();

    const { result, unmount } = renderHook(() =>
      useTableRowListener(mockTableRowRef as unknown as TableRowRef, mockHandler),
    );

    expect(result.current).toBeUndefined();
    expect(mockTableRowRef.current.addEventListener).toHaveBeenCalledTimes(1);
    expect(mockTableRowRef.current.addEventListener).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledTimes(1);

    unmount();

    expect(mockTableRowRef.current.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it('does not trigger handler if keydown is not detected', () => {
    const mockTableRowRef = {
      current: {
        addEventListener: jest.fn(
          (event: string, handler: (keyboardEvent: KeyboardEvent) => void) => {
            handler({ key: 'A', code: 'None' } as KeyboardEvent);
          },
        ),
        removeEventListener: jest.fn(),
      },
    };

    const mockHandler = jest.fn();

    const { result } = renderHook(() =>
      useTableRowListener(mockTableRowRef as unknown as TableRowRef, mockHandler),
    );

    expect(result.current).toBeUndefined();
    expect(mockHandler).toHaveBeenCalledTimes(0);
  });
});
