import { renderHook } from '@testing-library/react-hooks';

// import { usePaletteConfig } from '../usePaletteConfig';
import { useThemeConfig } from '../../system/useThemeConfig';
import { themeBase } from '../../themes/themeBase';
import { PartialPaletteConfig } from '../../types';
import { PaletteConfigDynamicProvider } from '../PaletteConfigDynamicProvider';

// TODO: Uncomment once usePaletteConfig is migrated to return useThemeConfig()
// function renderUsePalette(config: PartialPaletteConfig) {
//   return renderHook(() => usePaletteConfig(), {
//     wrapper: ({ children }) => (
//       <PaletteConfigDynamicProvider value={config}>{children}</PaletteConfigDynamicProvider>
//     ),
//   });
// }

function renderUseThemeConfig(config: PartialPaletteConfig) {
  return renderHook(() => useThemeConfig(), {
    wrapper: ({ children }) => (
      <PaletteConfigDynamicProvider value={config}>{children}</PaletteConfigDynamicProvider>
    ),
  });
}

describe('PaletteConfigDynamicProvider', () => {
  // TODO: Uncomment once usePaletteConfig is migrated to return useThemeConfig()
  // eslint-disable-next-line jest/no-commented-out-tests
  // it('merges default themeBase with custom palette pass in', () => {
  //   const { result } = renderUsePalette({ primary: 'orange60' });
  //   expect(result.current).toEqual({
  //     ...themeBase.light.palette,
  //     primary: 'orange60',
  //   });
  // });

  it('updates ThemeConfig context with correct values', () => {
    const { result } = renderUseThemeConfig({ primary: 'orange60' });
    expect(result.current.activeConfig.palette).toEqual({
      ...themeBase.light.palette,
      primary: 'orange60',
    });
    expect(result.current.config.light).toBeDefined();
    expect(result.current.config.dark).toBeDefined();
    expect(result.current.activeConfig).toBeDefined();
  });
});
