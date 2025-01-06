import { renderHook } from '@testing-library/react-hooks';

import { large } from '../../styles/scale';
import { useTypographyStyles } from '../useTypographyStyles';

describe('useTypographyStyles', () => {
  it('returns the correct value for body in large scale', () => {
    const { result } = renderHook(() => useTypographyStyles('body'));
    expect(result.current).toEqual(large.typography.body);
  });
  it('returns the correct value for display2', () => {
    const { result } = renderHook(() => useTypographyStyles('display2'));
    expect(result.current).toEqual(large.typography.display2);
  });
  it('returns the correct mono font-family if mono arg is true', () => {
    const { result } = renderHook(() => useTypographyStyles('display2', true));
    expect(result.current.fontFamily).toContain('CoinbaseMono');
  });
});
