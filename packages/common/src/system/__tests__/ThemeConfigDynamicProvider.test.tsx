import { renderHook } from '@testing-library/react-hooks';
import { ThemeConfigDynamicProvider } from '../ThemeConfigDynamicProvider';
import { themeBase } from '../../themes/themeBase';
import { PartialThemeConfig } from '../../types';
import { useThemeConfig } from '../useThemeConfig';

const palette = { primary: ['orange60', 0.4] } as const;
const rgbaStrings = { primary: 'some_rgba_string' };
const hexValues = { primary: 'some_hex' };
const light = { name: 'mock-light', palette, rgbaStrings, hexValues, interactableTokens: {} };
const dark = { name: 'mock-dark', palette, rgbaStrings, hexValues, interactableTokens: {} };
const mockConfig = { name: 'mock', light, dark };

function renderUseThemeConfig(config: PartialThemeConfig) {
  return renderHook(() => useThemeConfig(), {
    wrapper: ({ children }) => (
      <ThemeConfigDynamicProvider value={config}>{children}</ThemeConfigDynamicProvider>
    ),
  });
}

describe('ThemeConfigDynamicProvider', () => {
  it('updates ThemeConfig context with correct values', () => {
    const { result } = renderUseThemeConfig(mockConfig);
    expect(result.current.activeConfig.palette).toEqual({
      ...themeBase.light.palette,
      ...palette,
    });
    expect(result.current.config.light.hexValues.primary).toEqual(hexValues.primary);
    expect(result.current.config.light.rgbaStrings.primary).toEqual(rgbaStrings.primary);
  });
});
