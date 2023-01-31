import { renderHook } from '@testing-library/react-hooks';

import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';
import { SystemProvider, SystemProviderProps } from '../../SystemProvider';
import { defaultPalette, frontierSpectrumPalette } from '../constants';
import { usePaletteConfig } from '../usePaletteConfig';

type TestAppProviderProps = {
  palette?: SystemProviderProps['palette'];
  spectrum?: SystemProviderProps['spectrum'];
  frontierColor?: boolean;
};
const TestAppProvider: React.FC<React.PropsWithChildren<TestAppProviderProps>> = ({
  children,
  frontierColor,
  palette,
  spectrum,
}) => {
  return (
    <FeatureFlagProvider frontierColor={frontierColor}>
      <SystemProvider palette={palette} spectrum={spectrum}>
        {children}
      </SystemProvider>
    </FeatureFlagProvider>
  );
};

describe('usePaletteConfig', () => {
  it('returns defaultPalette if frontierColor is false', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: TestAppProvider,
      initialProps: { frontierColor: false },
    });
    expect(result.current).toEqual(defaultPalette);
  });

  it('returns correct frontierPalette if frontierColor is true in light mode', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: TestAppProvider,
      initialProps: { frontierColor: true },
    });
    expect(result.current).toMatchObject(frontierSpectrumPalette.light);
  });

  it('returns correct frontierPalette if frontierColor is true in dark mode', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: TestAppProvider,
      initialProps: { frontierColor: true, spectrum: 'dark' },
    });
    expect(result.current).toMatchObject(frontierSpectrumPalette.dark);
  });

  it('merges frontierPalette into custom palette if provided', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: TestAppProvider,
      initialProps: { frontierColor: true, palette: { primary: 'purple20' } },
    });
    expect(result.current).toMatchObject({
      ...defaultPalette,
      primary: 'purple20',
      ...frontierSpectrumPalette.light,
    });
  });
});
