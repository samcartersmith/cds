import { renderHook } from '@testing-library/react-hooks';

import { SystemProvider } from '../../SystemProvider';
import { useSpectrumConditional } from '../useSpectrumConditional';

describe('useSpectrumConditional', () => {
  it('returns the correct value', () => {
    const { result, rerender } = renderHook(
      () => {
        return useSpectrumConditional({
          light: 'value for light spectrum',
          dark: 'value for dark spectrum',
        });
      },
      { wrapper: SystemProvider }
    );

    expect(result.current).toBe('value for light spectrum');
    rerender({ spectrum: 'dark' });
    expect(result.current).toBe('value for dark spectrum');
  });
});
