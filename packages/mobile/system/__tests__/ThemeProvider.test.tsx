/* eslint-disable react/jsx-no-constructed-context-values */

import { renderHook } from '@testing-library/react-hooks';
import { defaultPalette, frontierSpectrumPalette } from '@cbhq/cds-common';
import {
  defaultFeatureFlags,
  FeatureFlagContext,
} from '@cbhq/cds-common/system/FeatureFlagContext';

import { Box } from '../../layout/Box';
import { createThemeConfig } from '../createThemeConfig';
import { ThemeProvider } from '../ThemeProvider';
import { useThemeConfig } from '../useThemeConfig';

describe('ThemeProvider', () => {
  afterEach(() => {
    createThemeConfig.cache.clear();
  });

  it('uses defaultPalette if there is no custom palette', () => {
    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ThemeProvider,
    });
    expect(result.current.config.light.palette).toEqual(defaultPalette);
    expect(result.current.config.dark.palette).toEqual(defaultPalette);
  });

  it('uses name=default if there is no custom palette', () => {
    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ThemeProvider,
    });
    expect(result.current.config.name).toBe('default');
  });

  it('has activeConfig = config.light by default', () => {
    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ThemeProvider,
    });
    expect(result.current.activeConfig).toEqual(result.current.config.light);
  });

  it('has activeConfig = config.dark if spectrum=dark', () => {
    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <ThemeProvider name="example" spectrum="dark">
          {children}
        </ThemeProvider>
      ),
    });
    expect(result.current.activeConfig).toEqual(result.current.config.dark);
  });

  it('merges + prefixes all custom palettes with default', () => {
    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <ThemeProvider name="brand" palette={{ primary: 'orange50' }}>
          {children}
        </ThemeProvider>
      ),
    });
    expect(result.current.config.name).toBe('default-brand');
    expect(result.current.activeConfig.palette).toEqual({
      ...defaultPalette,
      primary: 'orange50',
    });
    expect(Array.from(createThemeConfig.cache.keys())).toEqual([
      'default',
      'default-brand',
      'default-brand-elevation1',
      'default-brand-elevation2',
    ]);
  });

  it('adds elevation1Children and elevation2Children configs if spectrum=dark', () => {
    renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <ThemeProvider name="example" spectrum="dark">
          {children}
        </ThemeProvider>
      ),
    });
    expect(Array.from(createThemeConfig.cache.keys())).toEqual([
      'default',
      'default-elevation1',
      'default-elevation1-elevation1Children',
      'default-elevation2',
      'default-elevation2-elevation2Children',
    ]);
  });

  it('does not add elevation1Children and elevation2Children configs if spectrum=light', () => {
    renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <ThemeProvider name="example" spectrum="light">
          {children}
        </ThemeProvider>
      ),
    });
    expect(Array.from(createThemeConfig.cache.keys())).toEqual([
      'default',
      'default-elevation1',
      'default-elevation2',
    ]);
  });

  it('merges frontier overrides in children where frontierColor=true', () => {
    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <ThemeProvider name="example1">
          <ThemeProvider name="example2" spectrum="light">
            <ThemeProvider name="example3" spectrum="dark">
              <ThemeProvider name="example4" spectrum="light">
                <FeatureFlagContext.Provider
                  value={{ ...defaultFeatureFlags, frontierColor: true }}
                >
                  <ThemeProvider name="example5" spectrum="dark">
                    <ThemeProvider name="example6" spectrum="light">
                      {children}
                    </ThemeProvider>
                  </ThemeProvider>
                </FeatureFlagContext.Provider>
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>
        </ThemeProvider>
      ),
    });
    expect(Array.from(createThemeConfig.cache.keys())).toEqual([
      'default',
      'default-elevation1',
      'default-elevation2',
      'default-elevation1-elevation1Children',
      'default-elevation2-elevation2Children',
      'default-example5-frontier',
      'default-example5-frontier-elevation1',
      'default-example5-frontier-elevation1-elevation1Children',
      'default-example5-frontier-elevation2',
      'default-example5-frontier-elevation2-elevation2Children',
      'default-example5-frontier-example6-frontier',
      'default-example5-frontier-example6-frontier-elevation1',
      'default-example5-frontier-example6-frontier-elevation2',
    ]);

    expect(result.current.activeConfig.palette).toEqual({
      ...defaultPalette,
      ...frontierSpectrumPalette.light,
    });
  });

  it('merges frontier overrides in children where frontierColor=true + custom palette', () => {
    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <ThemeProvider name="example1">
          <ThemeProvider name="example2" spectrum="light">
            <ThemeProvider name="example3" spectrum="dark">
              <ThemeProvider name="example4" spectrum="light">
                <FeatureFlagContext.Provider
                  value={{ ...defaultFeatureFlags, frontierColor: true }}
                >
                  <ThemeProvider name="example5" spectrum="dark" palette={{ primary: 'indigo40' }}>
                    {children}
                  </ThemeProvider>
                </FeatureFlagContext.Provider>
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>
        </ThemeProvider>
      ),
    });
    expect(Array.from(createThemeConfig.cache.keys())).toEqual([
      'default',
      'default-elevation1',
      'default-elevation2',
      'default-elevation1-elevation1Children',
      'default-elevation2-elevation2Children',
      'default-example5-frontier',
      'default-example5-frontier-elevation1',
      'default-example5-frontier-elevation1-elevation1Children',
      'default-example5-frontier-elevation2',
      'default-example5-frontier-elevation2-elevation2Children',
    ]);

    expect(result.current.activeConfig.palette).toEqual({
      ...defaultPalette,
      ...frontierSpectrumPalette.dark,
      primary: 'indigo40',
    });
  });

  it('works with nested spectrums', () => {
    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <ThemeProvider name="example1" spectrum="dark">
          <ThemeProvider name="example2" spectrum="light">
            <ThemeProvider name="example3" spectrum="dark">
              <ThemeProvider name="example4" spectrum="light">
                <ThemeProvider name="example5" spectrum="dark">
                  {children}
                </ThemeProvider>
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>
        </ThemeProvider>
      ),
    });

    expect(result.current.activeConfig.rgbaStrings.background).toBe('rgba(10,11,13,1)');
    expect(result.current.activeConfig.rgbaStrings.foreground).toBe('rgba(255,255,255,1)');
  });

  it('works with nested spectrums and elevation=1', () => {
    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <ThemeProvider name="example1" spectrum="dark">
          <ThemeProvider name="example2" spectrum="light">
            <ThemeProvider name="example3" spectrum="dark">
              <ThemeProvider name="example4" spectrum="light">
                <ThemeProvider name="example5" spectrum="dark">
                  <Box elevation={1}>{children}</Box>
                </ThemeProvider>
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>
        </ThemeProvider>
      ),
    });

    expect(result.current.activeConfig.rgbaStrings.background).toBe('rgba(20,21,25,1)');
    expect(result.current.activeConfig.rgbaStrings.foreground).toBe('rgba(255,255,255,1)');
  });

  it('works with nested spectrums and elevation=2', () => {
    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <ThemeProvider name="example1" spectrum="dark">
          <ThemeProvider name="example2" spectrum="light">
            <ThemeProvider name="example3" spectrum="dark">
              <ThemeProvider name="example4" spectrum="light">
                <ThemeProvider name="example5" spectrum="dark">
                  <Box elevation={2}>{children}</Box>
                </ThemeProvider>
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>
        </ThemeProvider>
      ),
    });

    expect(result.current.activeConfig.rgbaStrings.background).toBe('rgba(30,32,37,1)');
    expect(result.current.activeConfig.rgbaStrings.foreground).toBe('rgba(255,255,255,1)');
  });

  it('works with nested spectrums and elevation=2 in frontier', () => {
    const Wrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
      return (
        <FeatureFlagContext.Provider value={{ ...defaultFeatureFlags, frontierColor: true }}>
          <ThemeProvider name="example1" spectrum="light">
            <ThemeProvider name="example2" spectrum="dark">
              <Box elevation={2}>{children}</Box>
            </ThemeProvider>
          </ThemeProvider>
        </FeatureFlagContext.Provider>
      );
    };
    const {
      result: { current: parentTheme },
    } = renderHook(() => useThemeConfig(), {
      wrapper: Wrapper,
    });

    const {
      result: { current: childrenTheme },
    } = renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <Wrapper>
          <Box background>{children}</Box>
        </Wrapper>
      ),
    });

    expect(parentTheme.activeConfig.rgbaStrings.background).toBe('rgba(30,32,37,1)');
    expect(parentTheme.activeConfig.rgbaStrings.secondary).toBe('rgba(50,53,61,1)');

    // Children of elevated surface should have same background and secondary colors.
    expect(childrenTheme.activeConfig.rgbaStrings.background).toEqual(
      parentTheme.activeConfig.rgbaStrings.background,
    );
    expect(childrenTheme.activeConfig.rgbaStrings.secondary).toEqual(
      parentTheme.activeConfig.rgbaStrings.secondary,
    );
  });

  it('merges custom palette with default palette', () => {
    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <ThemeProvider name="custom-green" spectrum="dark" palette={{ background: 'green50' }}>
          {children}
        </ThemeProvider>
      ),
    });

    expect(Array.from(createThemeConfig.cache.keys())).toEqual([
      'default',
      'default-custom-green',
      'default-custom-green-elevation1',
      'default-custom-green-elevation1-elevation1Children',
      'default-custom-green-elevation2',
      'default-custom-green-elevation2-elevation2Children',
    ]);

    expect(result.current.activeConfig.palette).toEqual({
      ...defaultPalette,
      background: 'green50',
    });
  });

  it('handles deep merge of custom palettes in order', () => {
    const palette1 = { background: 'orange50' } as const;
    const palette2 = { primary: 'yellow50' } as const;
    const palette3 = { secondary: 'blue50' } as const;
    const palette4 = { positive: 'gray50' } as const;

    const { result } = renderHook(() => useThemeConfig(), {
      wrapper: ({ children }) => (
        <ThemeProvider name="palette1" spectrum="dark" palette={palette1}>
          <ThemeProvider name="palette2" spectrum="light" palette={palette2}>
            <ThemeProvider name="palette3" spectrum="dark" palette={palette3}>
              <ThemeProvider name="palette4" spectrum="light" palette={palette4}>
                {children}
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>
        </ThemeProvider>
      ),
    });

    expect(Array.from(createThemeConfig.cache.keys())).toEqual([
      'default',
      'default-palette1',
      'default-palette1-elevation1',
      'default-palette1-elevation1-elevation1Children',
      'default-palette1-elevation2',
      'default-palette1-elevation2-elevation2Children',
      'default-palette1-palette2',
      'default-palette1-palette2-elevation1',
      'default-palette1-palette2-elevation2',
      'default-palette1-palette2-palette3',
      'default-palette1-palette2-palette3-elevation1',
      'default-palette1-palette2-palette3-elevation1-elevation1Children',
      'default-palette1-palette2-palette3-elevation2',
      'default-palette1-palette2-palette3-elevation2-elevation2Children',
      'default-palette1-palette2-palette3-palette4',
      'default-palette1-palette2-palette3-palette4-elevation1',
      'default-palette1-palette2-palette3-palette4-elevation2',
    ]);

    expect(result.current.activeConfig.palette).toEqual({
      ...defaultPalette,
      ...palette1,
      ...palette2,
      ...palette3,
      ...palette4,
    });
  });
});
