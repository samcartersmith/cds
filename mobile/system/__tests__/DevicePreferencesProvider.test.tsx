import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { entries } from '@cbhq/cds-utils';
import { renderHook } from '@testing-library/react-hooks';
import { PlatformOSType, View } from 'react-native';

import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { Spectrum } from '@cbhq/cds-common';
import { deviceScaleMap } from '../../hooks/useDeviceScaleToCdsScale';
import { DevicePreferencesProvider } from '../DevicePreferencesProvider';

const mockDeviceScale = (fontScale: number) => {
  jest.resetModules();
  jest.doMock('react-native/Libraries/Utilities/PixelRatio', () => ({
    getFontScale: jest.fn(() => fontScale),
  }));
};

const mockPlatform = (os: PlatformOSType) => {
  jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
    OS: os, // or 'ios'
    select: jest.fn((config: { [key in PlatformOSType]: Spectrum }) => {
      for (const key of Object.keys(config)) {
        if (key === os) {
          return config[key];
        }
      }

      return null;
    }),
  }));
};

const mockUseColorSchema = (spectrum: Spectrum) => {
  jest.doMock('react-native/Libraries/Utilities/useColorScheme', () => ({
    default: jest.fn().mockReturnValue(spectrum),
  }));

  jest.doMock('react-native/Libraries/Utilities/Appearance', () => ({
    getColorScheme: jest.fn(() => spectrum),
  }));
};

describe('DevicePreferencesProvider', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    mockPlatform('ios');
    mockUseColorSchema('light');
  });

  it('returns correct scale based on device font scale', () => {
    for (const [cdsScale, deviceFontScale] of entries(deviceScaleMap).filter(([scale]) =>
      ['large', 'xLarge', 'xxLarge', 'xxxLarge'].includes(scale),
    )) {
      mockDeviceScale(deviceFontScale);
      const { result } = renderHook(() => useRootScale(), {
        wrapper: (props) => (
          <DevicePreferencesProvider>
            <View {...props} />
          </DevicePreferencesProvider>
        ),
      });
      expect(result.current).toEqual(cdsScale);
    }
  });

  test('passed in props take priority over device', () => {
    const { result } = renderHook(
      () => {
        return {
          spectrum: useRootSpectrum(),
          scale: useRootScale(),
        };
      },
      {
        wrapper: (props) => (
          <DevicePreferencesProvider spectrum="dark" scale="xSmall">
            <div {...props} />
          </DevicePreferencesProvider>
        ),
      },
    );

    expect(result.current.spectrum).toEqual('dark');
    expect(result.current.scale).toEqual('xSmall');
  });

  test('returns the correct spectrum based on device', () => {
    const spectrums: Spectrum[] = ['light', 'dark'];
    const oss: PlatformOSType[] = ['android', 'ios'];
    for (const spectrum of spectrums) {
      for (const os of oss) {
        jest.resetModules();
        jest.resetAllMocks();
        mockPlatform(os);
        mockUseColorSchema(spectrum);

        const { result } = renderHook(() => useRootSpectrum(), {
          wrapper: (props) => (
            <DevicePreferencesProvider>
              <div {...props} />
            </DevicePreferencesProvider>
          ),
        });

        expect(result.current).toEqual(spectrum);
      }
    }
  });
});
