import { renderHook } from '@testing-library/react-hooks';
import { useOverlay } from '../useOverlay';

describe('useOverlay', () => {
  it('returns hide and show', () => {
    const { result } = renderHook(() => useOverlay());

    expect(result.current.show).toBeTruthy();
    expect(result.current.hide).toBeTruthy();
  });

  it('returns generated id from show', () => {
    const { result } = renderHook(() => useOverlay('modal_'));

    expect(result.current.show(<div>dummy element</div>).split('_')[0]).toBe('modal');
  });

  it('returns custom id from show', () => {
    const { result } = renderHook(() => useOverlay());

    expect(result.current.show(<div>dummy element</div>, 'customId')).toBe('customId');
  });
});
