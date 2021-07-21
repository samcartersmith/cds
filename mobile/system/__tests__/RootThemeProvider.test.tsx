import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { entries } from '@cbhq/cds-utils';
import { renderHook } from '@testing-library/react-hooks';
import { View } from 'react-native';

import { deviceScaleMap } from '../../hooks/useDeviceScaleToCdsScale';
import { RootThemeProvider } from '../RootThemeProvider';

const mockDeviceScale = (fontScale: number) => {
  jest.resetModules();
  jest.doMock('react-native/Libraries/Utilities/PixelRatio', () => ({
    getFontScale: jest.fn(() => fontScale),
  }));
};
describe('RootThemeProvider', () => {
  it('returns correct scale based on device font scale', () => {
    for (const [cdsScale, deviceFontScale] of entries(deviceScaleMap).filter(([scale]) =>
      ['large', 'xLarge', 'xxLarge', 'xxxLarge'].includes(scale),
    )) {
      mockDeviceScale(deviceFontScale);
      const { result } = renderHook(() => useRootScale(), {
        wrapper: props => (
          <RootThemeProvider>
            <View {...props} />
          </RootThemeProvider>
        ),
      });
      expect(result.current).toEqual(cdsScale);
    }
  });
});
