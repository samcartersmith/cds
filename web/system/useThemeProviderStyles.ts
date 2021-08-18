import { useMemo } from 'react';
import { cx } from 'linaria';

import { useScale, SystemProvider } from '@cbhq/cds-common';
import { useBeta } from '@cbhq/cds-common/beta/useBeta';

import { usePaletteToCssVars } from '../color/usePaletteToCssVars';
import { useSpectrumClassName } from '../color/useSpectrumClassName';
import * as scaleCss from '../styles/scale';
import * as scaleCssBeta from '../styles/scaleBeta';

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
  const palette = usePaletteToCssVars();
  const spectrumClassName = useSpectrumClassName();

  const { fontMigration } = useBeta();
  const activeScaleCss = fontMigration ? scaleCssBeta[scale] : scaleCss[scale];
  return useMemo(
    () =>
      ({
        className: cx(activeScaleCss, spectrumClassName),
        style: palette as React.CSSProperties,
      } as const),
    [palette, activeScaleCss, spectrumClassName],
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
