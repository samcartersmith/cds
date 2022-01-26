import { renderHook } from '@testing-library/react-hooks';
import { AnyObject } from '@cbhq/cds-utils';

import { DarkModeProvider, LightModeProvider } from '../../system/ThemeProvider';
import { useElevationBorderColor } from '../useElevationBorderColor';

type SelectParams = { ios: AnyObject; android: AnyObject };
const mockPlatform = (platform: keyof SelectParams) => {
  jest.resetModules();
  jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
    select: (platforms: SelectParams) => platforms[platform],
  }));
};

describe('useElevationBorderColor', () => {
  /** Light mode on iOS */
  it('light mode - iOS - returns primary value passed in', () => {
    mockPlatform('ios');
    const { result } = renderHook(() => useElevationBorderColor('primary'));
    expect(result.current).toBe('rgba(0,82,255,1)');
  });

  it('light mode - iOS - returns transarent value passed in', () => {
    mockPlatform('ios');
    const { result } = renderHook(() => useElevationBorderColor('transparent'));
    expect(result.current).toBe('transparent');
  });

  it('light mode - iOS - defaults to palette line color and no color is provided', () => {
    mockPlatform('ios');
    const { result } = renderHook(() => useElevationBorderColor());
    expect(result.current).toBe('rgba(91,97,110,0.2)');
  });

  /** Light mode on Android */
  it('light mode - Android - returns no border color if primary', () => {
    mockPlatform('android');
    const { result } = renderHook(() => useElevationBorderColor('primary'), {
      wrapper: LightModeProvider,
    });
    expect(result.current).toBe('transparent');
  });

  it('light mode - Android - returns no border color if transparent', () => {
    mockPlatform('android');
    const { result } = renderHook(() => useElevationBorderColor('transparent'), {
      wrapper: LightModeProvider,
    });
    expect(result.current).toBe('transparent');
  });

  it('light mode - Android - returns no border color if undefined', () => {
    mockPlatform('android');
    const { result } = renderHook(() => useElevationBorderColor(), { wrapper: LightModeProvider });
    expect(result.current).toBe('transparent');
  });

  /** Dark mode on iOS */
  it('dark mode - iOS - returns primary value passed in', () => {
    mockPlatform('ios');
    const { result } = renderHook(() => useElevationBorderColor('primary'), {
      wrapper: DarkModeProvider,
    });
    expect(result.current).toBe('rgba(55,115,245,1)');
  });

  it('dark mode - iOS - returns transarent value passed in', () => {
    mockPlatform('ios');
    const { result } = renderHook(() => useElevationBorderColor('transparent'), {
      wrapper: DarkModeProvider,
    });
    expect(result.current).toBe('transparent');
  });

  it('dark mode - iOS - defaults to palette line color and no color is provided', () => {
    mockPlatform('ios');
    const { result } = renderHook(() => useElevationBorderColor(), { wrapper: DarkModeProvider });
    expect(result.current).toBe('rgba(138,145,158,0.2)');
  });

  /** Dark mode on Android */
  it('dark mode - Android - returns color passed in', () => {
    mockPlatform('android');
    const { result } = renderHook(() => useElevationBorderColor('primary'), {
      wrapper: DarkModeProvider,
    });
    expect(result.current).toBe('rgba(55,115,245,1)');
  });

  it('dark mode - Android - returns transparent if transparent passed in', () => {
    mockPlatform('android');
    const { result } = renderHook(() => useElevationBorderColor('transparent'), {
      wrapper: DarkModeProvider,
    });
    expect(result.current).toBe('transparent');
  });

  it('dark mode - Android - defaults to palette line color and no color is provided', () => {
    mockPlatform('android');
    const { result } = renderHook(() => useElevationBorderColor(), { wrapper: DarkModeProvider });
    expect(result.current).toBe('rgba(138,145,158,0.2)');
  });
});
