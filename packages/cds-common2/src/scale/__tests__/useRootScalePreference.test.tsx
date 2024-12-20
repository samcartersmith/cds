import { renderHook } from '@testing-library/react-hooks';

import { RootScalePreference } from '../../types';
import { RootScalePreferenceProvider } from '../RootScalePreferenceProvider';
import { useRootScalePreference } from '../useRootScalePreference';

function createWrapper({ scale }: { scale: RootScalePreference }) {
  const Wrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <RootScalePreferenceProvider value={scale}>{children}</RootScalePreferenceProvider>
  );
  return Wrapper;
}

describe('useRootScalePreference', () => {
  it('returns correct value', () => {
    for (const scale of [
      'xSmall',
      'small',
      'medium',
      'large',
      'xLarge',
      'xxLarge',
      'xxxLarge',
    ] as const) {
      const { result } = renderHook(() => useRootScalePreference(), {
        wrapper: createWrapper({ scale }),
      });
      expect(result.current).toBe(scale);
    }
  });

  it('returns system by default', () => {
    const { result } = renderHook(() => useRootScalePreference(), {
      wrapper: RootScalePreferenceProvider,
    });
    expect(result.current).toBe('system');
  });

  it('logs an error if accessed outside of RootScalePreferenceProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const { result } = renderHook(() => useRootScalePreference());
    expect(result.current).toBe('system');
    expect(spy).toHaveBeenCalledWith(
      'Cannot use `useRootScalePreference` outside of RootScalePreferenceProvider',
    );
    spy.mockRestore();
  });
});
