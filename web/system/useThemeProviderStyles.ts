import { useMemo } from 'react';

import { useScale, useSpectrum, SystemProvider } from '@cbhq/cds-common';
import { cx } from 'linaria';

import { usePaletteToCssVars } from '../hooks/usePaletteToCssVars';
import * as scaleCss from '../styles/scale';
import * as spectrumCss from '../styles/spectrum';

/**
 * Internally the `ThemeProvider` component includes a div element which is used to attach CSS variables that are needed for palette overrides.
 * If the div added by ThemeProvider is not desired, you can use this hook and attach the returned className and style prop to the element of your choice.
 * @returns object - { className: string for the CSS class containing the spectrum variable assignments, style: palette config as css variables i.e. `style={{ background: 'rgb(var(--blue60))' }}` }
 * @example
 *  <div {...useThemeProviderStyles()}>
 *    My app content
 *  </div>
 */
export const useThemeProviderStyles = () => {
  const scale = useScale();
  const spectrum = useSpectrum();
  const palette = usePaletteToCssVars();
  return useMemo(
    () =>
      ({
        className: cx(scaleCss[scale], spectrumCss[spectrum]),
        style: palette as React.CSSProperties,
      } as const),
    [palette, scale, spectrum],
  );
};

/**
 * Used with useThemeProviderStyles if you need to override spectrum, palette or scale
 * @example
 * <ContextOnlyThemeProvider spectrum="dark">
 *  <div {...useThemeProviderStyles()}>
 *    My app content
 *  </div>
 * </ContextOnlyThemeProvider>
 */
export const ContextOnlyThemeProvider = SystemProvider;
