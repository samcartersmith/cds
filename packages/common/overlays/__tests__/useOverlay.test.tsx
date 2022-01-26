import { renderHook } from '@testing-library/react-hooks';

import { useOverlay } from '../useOverlay';

describe('useOverlay', () => {
  it('returns hide and show', () => {
    const { result } = renderHook(() => useOverlay());

    expect(result.current.open).toBeTruthy();
    expect(result.current.close).toBeTruthy();
  });

  it('returns generated id from show', () => {
    const { result } = renderHook(() => useOverlay('modal_'));

    expect(result.current.open(<div>dummy element</div>).split('_')[0]).toBe('modal');
  });
});
