import { renderHook } from '@testing-library/react-hooks';
import { Spectrum } from '@cbhq/cds-common';

import { DarkModeProvider } from '../../system';
import { useAccessibleForegroundGradient } from '../useAccessibleForegroundGradient';

const mockUseAccessibleForegroundGradient = (color: string, mode?: Spectrum | undefined) => {
  const modeParams =
    mode === 'dark'
      ? {
          wrapper: DarkModeProvider,
        }
      : {};
  const { result } = renderHook(
    () => useAccessibleForegroundGradient({ color, usage: 'graphic' }),
    modeParams,
  );
  return result.current;
};

describe('useAccessibleForegroundGradient', () => {
  it('returns the color passed in if meets accessibility requirements', () => {
    const output = mockUseAccessibleForegroundGradient('#000000');
    // We can't make the second color any darker so these two colors are the same.
    expect(output).toEqual([
      { color: '#000000', offset: '0%' },
      { color: '#000000', offset: '100%' },
    ]);
  });

  it('returns the correct spectrum color if trying to render a dark color on dark background', () => {
    const output = mockUseAccessibleForegroundGradient('#000000', 'dark');
    // In dark mode we disable gradient so these two colors are the same.
    expect(output).toEqual([
      { color: 'rgba(255,255,255,1)', offset: '0%' },
      { color: 'rgba(255,255,255,1)', offset: '100%' },
    ]);
  });

  it('returns the closest spectrum color if it does not meet accessibility requirements', () => {
    const output = mockUseAccessibleForegroundGradient('#fff000');
    expect(output).toEqual([
      { color: 'rgba(188,141,27,1)', offset: '0%' },
      { color: 'rgba(159,106,9,1)', offset: '100%' },
    ]);
  });

  it('returns gray100 for non accessible gray colors', () => {
    const output = mockUseAccessibleForegroundGradient('#dddddd');
    // gray100 is the highest hue step we can increment to so these two colors are the same.
    expect(output).toEqual([
      { color: 'rgba(10,11,13,1)', offset: '0%' },
      { color: 'rgba(10,11,13,1)', offset: '100%' },
    ]);
  });

  it('returns value if the color meets accessibility requirements', () => {
    const output = mockUseAccessibleForegroundGradient('#EC7030');
    expect(output).toEqual([
      { color: '#EC7030', offset: '0%' },
      { color: '#a54e22', offset: '100%' },
    ]);
  });
});
