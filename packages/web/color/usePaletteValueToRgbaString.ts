import { useCallback, useMemo } from 'react';
import { PaletteValue, PaletteValueToRgbaStringFn, useSpectrum } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { paletteValueToRgbaString } from '@cbhq/cds-common/palette/paletteValueToRgbaString';

/** Returns a function to retrieve the rgba string for a palette value. */
function usePaletteValueToRgbaStringConverter() {
  const spectrum = useSpectrum();
  /** Fallback value if we are unable to access spectrum color */
  const fallbackColor = useSpectrumConditional({ light: '255,255,255', dark: '0,0,0' });
  return useCallback(
    (paletteValue: PaletteValue) => {
      const rgbaString = paletteValueToRgbaString(paletteValue, spectrum);
      return paletteValue ? rgbaString : fallbackColor;
    },
    [fallbackColor, spectrum],
  );
}

/**
 * Get rgba string for a palette value.
 * Returns an rgba string or function to get an rgba string.
 */
function usePaletteValueToRgbaString(value: PaletteValue): string;
function usePaletteValueToRgbaString(value?: undefined): PaletteValueToRgbaStringFn;
function usePaletteValueToRgbaString(value?: PaletteValue) {
  const convert = usePaletteValueToRgbaStringConverter();
  return useMemo(() => {
    if (value) {
      return convert(value);
    }
    return convert;
  }, [convert, value]);
}

export { usePaletteValueToRgbaString };
