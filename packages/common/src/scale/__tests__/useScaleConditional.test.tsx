import { renderHook } from '@testing-library/react-hooks';

import { SystemProvider } from '../../SystemProvider';
import { useScaleConditional } from '../useScaleConditional';

describe('useScaleConditional', () => {
  it('returns the correct value', () => {
    const { result, rerender } = renderHook(
      () => {
        return useScaleConditional({
          dense: 'dense',
          normal: 'normal',
        });
      },
      { wrapper: SystemProvider },
    );

    expect(result.current).toBe('normal');
    rerender({ scale: 'xSmall' });
    expect(result.current).toBe('dense');
  });
});
