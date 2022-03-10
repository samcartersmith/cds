import { useCallback, useMemo } from 'react';
import type { PaletteValue, PaletteValueToRgbaStringFn } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { paletteValueToTuple } from '@cbhq/cds-common/palette/paletteValueToTuple';
import { toCssVar } from '@cbhq/cds-utils';

import { getComputedStyleForClassName } from '../utils/getComputedStyleForClassName';

import { useSpectrumClassName } from './useSpectrumClassName';

/** Returns a function to retrieve the rgba string for a palette value. */
function usePaletteValueToRgbaStringConverter() {
  const spectrumClassName = useSpectrumClassName();
  /** Fallback value if we are unable to access spectrum color */
  const fallbackColor = useSpectrumConditional({ light: '255,255,255', dark: '0,0,0' });
  return useCallback(
    (paletteValue: PaletteValue) => {
      const [spectrumAlias, opacity] = paletteValueToTuple(paletteValue);
      const spectrumAliasCssVar = toCssVar(spectrumAlias);
      /**
       * The spectrumClassName is a CSS class with all of the spectrum css variables assigned to rgb string values. i.e. --gray0: 255,255,255.
       * We can access the rgb string of a spectrum alias like gray0 by looking up the computed style for an element with a spectrum className.
       */
      const cdsRgbString = getComputedStyleForClassName(
        spectrumClassName,
        spectrumAliasCssVar,
        fallbackColor,
      );
      return `rgba(${cdsRgbString},${opacity})`;
    },
    [fallbackColor, spectrumClassName],
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
