import { renderHook } from '@testing-library/react-hooks';

import { useButtonIconSize } from '../useButtonIconSize';

function createHook({ compact }: { compact?: boolean }) {
  return renderHook(() => {
    return useButtonIconSize(compact);
  }).result.current;
}

describe('useButtonIconSize', () => {
  it('returns correct size for compact: false', () => {
    const value = createHook({ compact: false });
    expect(value).toBe('m');
  });

  it('returns correct size for compact: true', () => {
    const value = createHook({ compact: true });
    expect(value).toBe('s');
  });
});
