import { renderHook } from '@testing-library/react-hooks';

import { useSpectrum } from '../../spectrum/useSpectrum';
import { useInvertedSpectrum } from '../useInvertedSpectrum';

jest.mock('../../spectrum/useSpectrum');

describe('useInvertedSpectrum', () => {
  it('should return "dark" when the current spectrum is "light"', () => {
    (useSpectrum as jest.Mock).mockReturnValue('light');

    const { result } = renderHook(() => useInvertedSpectrum());

    expect(result.current).toBe('dark');
  });

  it('should return "light" when the current spectrum is not "light"', () => {
    (useSpectrum as jest.Mock).mockReturnValue('dark');

    const { result } = renderHook(() => useInvertedSpectrum());

    expect(result.current).toBe('light');
  });
});
