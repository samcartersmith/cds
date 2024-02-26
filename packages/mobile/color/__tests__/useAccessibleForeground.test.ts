import { renderHook } from '@testing-library/react-hooks';
import { Spectrum } from '@cbhq/cds-common';

import { DarkModeProvider } from '../../system';
import { useAccessibleForeground } from '../useAccessibleForeground';

const checkAllUsages = (color: string, mode?: Spectrum | undefined) => {
  const modeParams =
    mode === 'dark'
      ? {
          wrapper: DarkModeProvider,
        }
      : {};
  const { result: normalText } = renderHook(
    () => useAccessibleForeground({ color, usage: 'normalText' }),
    modeParams,
  );
  const { result: largeText } = renderHook(
    () => useAccessibleForeground({ color, usage: 'largeText' }),
    modeParams,
  );
  const { result: graphic } = renderHook(
    () => useAccessibleForeground({ color, usage: 'graphic' }),
    modeParams,
  );
  return {
    normalText: normalText.current,
    largeText: largeText.current,
    graphic: graphic.current,
  };
};

describe('useAccessibleForeground', () => {
  it('returns the color passed in if meets accessibility requirements', () => {
    const { normalText, largeText, graphic } = checkAllUsages('#000000');
    expect(normalText).toBe('#000000');
    expect(largeText).toBe('#000000');
    expect(graphic).toBe('#000000');
  });

  it('returns the correct spectrum color if trying to render a dark color on dark background', () => {
    const { normalText, largeText, graphic } = checkAllUsages('rgb(59, 52, 34)', 'dark');
    expect(normalText).toBe('rgb(255,255,255)');
    expect(largeText).toBe('rgb(255,255,255)');
    expect(graphic).toBe('rgb(255,255,255)');
  });

  it('returns the closest spectrum color if it does not meet accessibility requirements', () => {
    const { normalText, largeText, graphic } = checkAllUsages('#fff000');
    expect(normalText).toBe('rgba(154,96,0,1)');
    expect(largeText).toBe('rgba(154,96,0,1)');
    expect(graphic).toBe('rgba(188,131,0,1)');
  });

  it('returns the correct color spectrum color if trying to render a light gray color on a light background', () => {
    const { normalText, largeText, graphic } = checkAllUsages('#dddddd');
    expect(normalText).toBe('rgb(0,0,0)');
    expect(largeText).toBe('rgb(0,0,0)');
    expect(graphic).toBe('rgb(0,0,0)');
  });

  it('returns the correct color spectrum color if trying to render a dark gray color on a dark background', () => {
    const { normalText, largeText, graphic } = checkAllUsages('#222222', 'dark');
    expect(normalText).toBe('rgb(255,255,255)');
    expect(largeText).toBe('rgb(255,255,255)');
    expect(graphic).toBe('rgb(255,255,255)');
  });

  it('returns passed in foreground value for graphic if it meets accessibility requirements', () => {
    const { normalText, largeText, graphic } = checkAllUsages('#EC7030');
    expect(normalText).toBe('rgba(207,71,14,1)'); // doesn't meet color contrast so returns closest palette alias
    expect(largeText).toBe('#EC7030');
    expect(graphic).toBe('#EC7030');
  });
});
