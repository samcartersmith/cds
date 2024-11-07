import { renderHook } from '@testing-library/react-hooks';

import { useButtonBorderRadius } from '../useButtonBorderRadius';
import { useInteractableHeight } from '../useInteractableHeight';

describe('useButtonBorderRadius', () => {
  it('returns correct borderRadius for compact: false', () => {
    const { result } = renderHook(() => {
      return {
        height: useInteractableHeight(false),
        borderRadius: useButtonBorderRadius(false),
      };
    });
    expect(result.current.borderRadius).toEqual(result.current.height);
  });

  it('returns correct borderRadius for compact: true', () => {
    const { result } = renderHook(() => {
      return {
        height: useInteractableHeight(true),
        borderRadius: useButtonBorderRadius(true),
      };
    });
    expect(result.current.borderRadius).toEqual(result.current.height);
  });
});
