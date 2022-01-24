import { Spectrum } from '@cbhq/cds-common';
import { renderHook } from '@testing-library/react-hooks';

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
    const { normalText, largeText, graphic } = checkAllUsages('#000000', 'dark');
    expect(normalText).toBe('rgba(255,255,255,1)');
    expect(largeText).toBe('rgba(255,255,255,1)');
    expect(graphic).toBe('rgba(255,255,255,1)');
  });

  it('returns the closest spectrum color if it does not meet accessibility requirements', () => {
    const { normalText, largeText, graphic } = checkAllUsages('#fff000');
    expect(normalText).toBe('rgba(159,106,9,1)');
    expect(largeText).toBe('rgba(159,106,9,1)');
    expect(graphic).toBe('rgba(188,141,27,1)');
  });

  it('returns gray100 for non accessible gray colors', () => {
    const { normalText, largeText, graphic } = checkAllUsages('#dddddd');
    expect(normalText).toBe('rgba(10,11,13,1)');
    expect(largeText).toBe('rgba(10,11,13,1)');
    expect(graphic).toBe('rgba(10,11,13,1)');
  });

  it('returns value for graphic if it meets accessibility requirements', () => {
    const { normalText, largeText, graphic } = checkAllUsages('#EC7030');
    expect(normalText).toBe('rgba(207,71,14,1)');
    expect(largeText).toBe('rgba(207,71,14,1)');
    expect(graphic).toBe('#EC7030');
  });
});
