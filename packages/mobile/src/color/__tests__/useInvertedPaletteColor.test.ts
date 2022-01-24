import { PaletteAlias, Spectrum } from '@cbhq/cds-common';
import { renderHook } from '@testing-library/react-hooks';

import { DarkModeProvider } from '../../system';
import { useInvertedPaletteColor } from '../useInvertedPaletteColor';

const mockUseInvertedPaletteColor = (alias: PaletteAlias, mode?: Spectrum | undefined) => {
  const modeParams =
    mode === 'dark'
      ? {
          wrapper: DarkModeProvider,
        }
      : {};
  const { result } = renderHook(() => useInvertedPaletteColor(alias), modeParams);
  return result.current;
};

describe('useInvertedPaletteColor', () => {
  it('returns the inverted background color if in light mode', () => {
    const rgbaString = mockUseInvertedPaletteColor('background');
    expect(rgbaString).toBe('rgba(10,11,13,1)');
  });

  it('returns the inverted background color if in dark mode', () => {
    const rgbaString = mockUseInvertedPaletteColor('background', 'dark');
    expect(rgbaString).toBe('rgba(255,255,255,1)');
  });
});
