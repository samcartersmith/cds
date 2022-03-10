import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { entries } from '@cbhq/cds-utils';
import { act, renderHook } from '@testing-library/react-hooks';
import { PlatformOSType, View } from 'react-native';

import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { Spectrum, useScale, useSpectrum } from '@cbhq/cds-common';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import { useRootSpectrumPreferenceUpdater } from '@cbhq/cds-common/spectrum/useRootSpectrumPreferenceUpdater';
import { useRootSpectrumPreference } from '@cbhq/cds-common/spectrum/useRootSpectrumPreference';
import { useRootScalePreference } from '@cbhq/cds-common/scale/useRootScalePreference';
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

      const { result } = renderHook(
        () => {
          return {
            rootSpectrum: useRootSpectrum(),
            rootSpectrumPreference: useRootSpectrumPreference(),
            rootScale: useRootScale(),
            rootScalePreference: useRootScalePreference(),
            spectrum: useSpectrum(),
            scale: useScale(),
            rootScaleUpdater: useRootScalePreferenceUpdater(),
            rootSpectrumUpdater: useRootSpectrumPreferenceUpdater(),
          };
        },
        {
          wrapper: (props) => (
            <DevicePreferencesProvider>
              <View {...props} />
            </DevicePreferencesProvider>
          ),
        },
      );
      expect(result.current.rootSpectrumPreference).toEqual('system');
      expect(result.current.rootSpectrum).toEqual('light');
      expect(result.current.rootScalePreference).toEqual('system');
      expect(result.current.rootScale).toEqual(cdsScale);
      expect(result.current.spectrum).toEqual('light');
      expect(result.current.scale).toEqual(cdsScale);
    }
  });

  test('passed in props take priority over device', () => {
    const { result } = renderHook(
      () => {
        return {
          rootSpectrum: useRootSpectrum(),
          rootSpectrumPreference: useRootSpectrumPreference(),
          rootScale: useRootScale(),
          rootScalePreference: useRootScalePreference(),
          spectrum: useSpectrum(),
          scale: useScale(),
          rootScaleUpdater: useRootScalePreferenceUpdater(),
          rootSpectrumUpdater: useRootSpectrumPreferenceUpdater(),
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

    expect(result.current.rootSpectrum).toEqual('dark');
    expect(result.current.rootScale).toEqual('xSmall');
    expect(result.current.rootSpectrumPreference).toEqual('dark');
    expect(result.current.rootScalePreference).toEqual('xSmall');
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
        mockDeviceScale(deviceScaleMap.large);

        const { result } = renderHook(
          () => {
            return {
              rootSpectrum: useRootSpectrum(),
              rootSpectrumPreference: useRootSpectrumPreference(),
              rootScale: useRootScale(),
              rootScalePreference: useRootScalePreference(),
              spectrum: useSpectrum(),
              scale: useScale(),
              rootScaleUpdater: useRootScalePreferenceUpdater(),
              rootSpectrumUpdater: useRootSpectrumPreferenceUpdater(),
            };
          },
          {
            wrapper: (props) => (
              <DevicePreferencesProvider>
                <div {...props} />
              </DevicePreferencesProvider>
            ),
          },
        );

        expect(result.current.rootSpectrumPreference).toEqual('system');
        expect(result.current.rootScalePreference).toEqual('system');
        expect(result.current.rootSpectrum).toEqual(spectrum);
        expect(result.current.rootScale).toEqual('large');
        expect(result.current.spectrum).toEqual(spectrum);
        expect(result.current.scale).toEqual('large');
      }
    }
  });

  test('system to scale and spectrum updates', () => {
    mockPlatform('ios');
    mockUseColorSchema('dark');
    mockDeviceScale(deviceScaleMap.xxxLarge);

    const { result } = renderHook(
      () => {
        return {
          rootSpectrum: useRootSpectrum(),
          rootSpectrumPreference: useRootSpectrumPreference(),
          rootScale: useRootScale(),
          rootScalePreference: useRootScalePreference(),
          spectrum: useSpectrum(),
          scale: useScale(),
          rootScaleUpdater: useRootScalePreferenceUpdater(),
          rootSpectrumUpdater: useRootSpectrumPreferenceUpdater(),
        };
      },
      {
        wrapper: (props) => (
          <DevicePreferencesProvider>
            <div {...props} />
          </DevicePreferencesProvider>
        ),
      },
    );

    expect(result.current.rootSpectrumPreference).toEqual('system');
    expect(result.current.rootScalePreference).toEqual('system');
    expect(result.current.rootSpectrum).toEqual('dark');
    expect(result.current.rootScale).toEqual('xxxLarge');
    expect(result.current.spectrum).toEqual('dark');
    expect(result.current.scale).toEqual('xxxLarge');

    // update root scale and spectrum
    void act(() => {
      result.current.rootScaleUpdater('large');
      result.current.rootSpectrumUpdater('light');
    });

    expect(result.current.rootSpectrumPreference).toEqual('light');
    expect(result.current.rootScalePreference).toEqual('large');
    expect(result.current.rootSpectrum).toEqual('light');
    expect(result.current.rootScale).toEqual('large');
    expect(result.current.spectrum).toEqual('light');
    expect(result.current.scale).toEqual('large');
  });

  test('scale and spectrum to system updates', () => {
    mockPlatform('ios');
    mockUseColorSchema('dark');
    mockDeviceScale(deviceScaleMap.xxxLarge);

    const { result } = renderHook(
      () => {
        return {
          rootSpectrum: useRootSpectrum(),
          rootSpectrumPreference: useRootSpectrumPreference(),
          rootScale: useRootScale(),
          rootScalePreference: useRootScalePreference(),
          spectrum: useSpectrum(),
          scale: useScale(),
          rootScaleUpdater: useRootScalePreferenceUpdater(),
          rootSpectrumUpdater: useRootSpectrumPreferenceUpdater(),
        };
      },
      {
        wrapper: (props) => (
          <DevicePreferencesProvider scale="medium" spectrum="light">
            <div {...props} />
          </DevicePreferencesProvider>
        ),
      },
    );

    expect(result.current.rootSpectrumPreference).toEqual('light');
    expect(result.current.rootScalePreference).toEqual('medium');
    expect(result.current.rootSpectrum).toEqual('light');
    expect(result.current.rootScale).toEqual('medium');
    expect(result.current.spectrum).toEqual('light');
    expect(result.current.scale).toEqual('medium');

    // update root scale and spectrum
    void act(() => {
      result.current.rootScaleUpdater('system');
      result.current.rootSpectrumUpdater('system');
    });

    expect(result.current.rootSpectrumPreference).toEqual('system');
    expect(result.current.rootScalePreference).toEqual('system');
    expect(result.current.rootSpectrum).toEqual('dark');
    expect(result.current.rootScale).toEqual('xxxLarge');
    expect(result.current.spectrum).toEqual('dark');
    expect(result.current.scale).toEqual('xxxLarge');
  });
});
