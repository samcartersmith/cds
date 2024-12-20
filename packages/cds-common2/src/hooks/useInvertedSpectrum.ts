import { useSpectrum } from '../spectrum/useSpectrum';

/**
 * Custom hook that returns the inverted spectrum value based on the current spectrum.
 * If the current spectrum is 'light', it returns 'dark'. Otherwise, it returns 'light'.
 *
 * @returns The inverted spectrum value.
 */
export const useInvertedSpectrum = () => {
  const spectrum = useSpectrum();

  return spectrum === 'light' ? 'dark' : 'light';
};
