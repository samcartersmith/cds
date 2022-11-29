import { renderHook } from '@testing-library/react-hooks';

import { useA11yId } from '../useA11yId';

describe('useA11yId', () => {
  it('Prefix exist, and shouldNotGenerate is not specified', () => {
    const { result } = renderHook(() =>
      useA11yId({
        prefix: 'cds-banner--',
      }),
    );

    expect(result.current).toMatch(/cds-banner--.*/);
  });

  it('Prefix exist, and shouldNotGenerate is false', () => {
    const { result } = renderHook(() =>
      useA11yId({
        prefix: 'cds-banner--',
        shouldNotGenerate: false,
      }),
    );

    expect(result.current).toMatch(/cds-banner--.*/);
  });

  it('Prefix exist, and shouldNotGenerate is true', () => {
    const { result } = renderHook(() =>
      useA11yId({
        prefix: 'cds-banner--',
        shouldNotGenerate: true,
      }),
    );

    expect(result.current).toBeUndefined();
  });

  it('Pass no options', () => {
    const { result } = renderHook(() => useA11yId());

    expect(result.current).toMatch(/a11y-id-.*/);
  });

  it('No prefix, but shouldNotGenerate is true', () => {
    const { result } = renderHook(() =>
      useA11yId({
        shouldNotGenerate: true,
      }),
    );

    expect(result.current).toBeUndefined();
  });
});
