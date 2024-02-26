import { renderHook } from '@testing-library/react-hooks';

import { SystemProvider, SystemProviderProps } from '../../SystemProvider';
import { darkDefaultPalette, defaultPalette } from '../constants';
import { usePaletteConfig } from '../usePaletteConfig';

type TestAppProviderProps = {
  palette?: SystemProviderProps['palette'];
  spectrum?: SystemProviderProps['spectrum'];
};
const TestAppProvider: React.FC<React.PropsWithChildren<TestAppProviderProps>> = ({
  children,
  palette,
  spectrum,
}) => {
  return (
    <SystemProvider palette={palette} spectrum={spectrum}>
      {children}
    </SystemProvider>
  );
};

describe('usePaletteConfig', () => {
  it('returns defaultPalette when spectrum is light', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: TestAppProvider,
    });
    expect(result.current).toEqual(defaultPalette);
  });
  it('returns darkDefaultPalette when spectrum is dark', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: TestAppProvider,
      initialProps: {
        spectrum: 'dark',
      },
    });
    expect(result.current).toEqual(darkDefaultPalette);
  });
});
