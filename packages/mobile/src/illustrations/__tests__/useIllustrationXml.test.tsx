import { renderHook } from '@testing-library/react-hooks';
import { entries } from '@cbhq/cds-utils';

import { DarkModeProvider } from '../../system/ThemeProvider';
import { illustrationSpectrumMap } from '../illustrationSpectrumMap';
import { useIllustrationXml } from '../useIllustrationXml';

describe('useIllustrationXml', () => {
  it('light spectrum = returns correct svg xml for every illustration', () => {
    entries(illustrationSpectrumMap).forEach(([name, { light }]) => {
      const { result } = renderHook(() => useIllustrationXml(name));
      expect(result.current).toContain('svg');
      expect(result.current).toEqual(light());
    });
  });

  it('dark spectrum - returns correct svg xml for every illustration', () => {
    entries(illustrationSpectrumMap).forEach(([name, { light, dark }]) => {
      const { result } = renderHook(() => useIllustrationXml(name), {
        wrapper: DarkModeProvider,
      });
      expect(result.current).toContain('svg');
      expect(result.current).toEqual(dark ? dark() : light());
    });
  });

  // TODO: Check specific svg attributes are not present in xml string if they are not supported by react-native-svg
});
