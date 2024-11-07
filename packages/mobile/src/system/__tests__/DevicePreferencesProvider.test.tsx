import { act } from 'react';
import { PixelRatio, PlatformOSType } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';
import { Spectrum, useScale, useSpectrum } from '@cbhq/cds-common';
import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { useRootScalePreference } from '@cbhq/cds-common/scale/useRootScalePreference';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { useRootSpectrumPreference } from '@cbhq/cds-common/spectrum/useRootSpectrumPreference';
import { useRootSpectrumPreferenceUpdater } from '@cbhq/cds-common/spectrum/useRootSpectrumPreferenceUpdater';
import { entries } from '@cbhq/cds-utils';

import { deviceScaleMap } from '../../hooks/useDeviceScaleToCdsScale';
import { DevicePreferencesProvider } from '../DevicePreferencesProvider';

const mockDeviceScale = (fontScale: number) => {
  jest.resetModules();
  jest.spyOn(PixelRatio, 'getFontScale').mockImplementation(() => fontScale);
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
    function WrapperTwo(props: React.PropsWithChildren<unknown>) {
      return (
        <DevicePreferencesProvider>
          <div {...props} />
        </DevicePreferencesProvider>
      );
    }

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
          wrapper: WrapperTwo,
        },
      );
      expect(result.current.rootSpectrumPreference).toBe('system');
      expect(result.current.rootSpectrum).toBe('light');
      expect(result.current.rootScalePreference).toBe('system');
      expect(result.current.rootScale).toEqual(cdsScale);
      expect(result.current.spectrum).toBe('light');
      expect(result.current.scale).toEqual(cdsScale);
    }
  });

  test('passed in props take priority over device', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <DevicePreferencesProvider scale="xSmall" spectrum="dark">
          <div {...props} />
        </DevicePreferencesProvider>
      );
    }

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
        wrapper: Wrapper,
      },
    );

    expect(result.current.rootSpectrum).toBe('dark');
    expect(result.current.rootScale).toBe('xSmall');
    expect(result.current.rootSpectrumPreference).toBe('dark');
    expect(result.current.rootScalePreference).toBe('xSmall');
    expect(result.current.spectrum).toBe('dark');
    expect(result.current.scale).toBe('xSmall');
  });

  test('returns the correct spectrum based on device', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <DevicePreferencesProvider>
          <div {...props} />
        </DevicePreferencesProvider>
      );
    }

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
            wrapper: Wrapper,
          },
        );

        expect(result.current.rootSpectrumPreference).toBe('system');
        expect(result.current.rootScalePreference).toBe('system');
        expect(result.current.rootSpectrum).toEqual(spectrum);
        expect(result.current.rootScale).toBe('large');
        expect(result.current.spectrum).toEqual(spectrum);
        expect(result.current.scale).toBe('large');
      }
    }
  });

  test('system to scale and spectrum updates', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <DevicePreferencesProvider>
          <div {...props} />
        </DevicePreferencesProvider>
      );
    }

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
        wrapper: Wrapper,
      },
    );

    expect(result.current.rootSpectrumPreference).toBe('system');
    expect(result.current.rootScalePreference).toBe('system');
    expect(result.current.rootSpectrum).toBe('dark');
    expect(result.current.rootScale).toBe('xxxLarge');
    expect(result.current.spectrum).toBe('dark');
    expect(result.current.scale).toBe('xxxLarge');

    // update root scale and spectrum
    void act(() => {
      result.current.rootScaleUpdater('large');
      result.current.rootSpectrumUpdater('light');
    });

    expect(result.current.rootSpectrumPreference).toBe('light');
    expect(result.current.rootScalePreference).toBe('large');
    expect(result.current.rootSpectrum).toBe('light');
    expect(result.current.rootScale).toBe('large');
    expect(result.current.spectrum).toBe('light');
    expect(result.current.scale).toBe('large');
  });

  test('scale and spectrum to system updates', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <DevicePreferencesProvider scale="medium" spectrum="light">
          <div {...props} />
        </DevicePreferencesProvider>
      );
    }

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
        wrapper: Wrapper,
      },
    );

    expect(result.current.rootSpectrumPreference).toBe('light');
    expect(result.current.rootScalePreference).toBe('medium');
    expect(result.current.rootSpectrum).toBe('light');
    expect(result.current.rootScale).toBe('medium');
    expect(result.current.spectrum).toBe('light');
    expect(result.current.scale).toBe('medium');

    // update root scale and spectrum
    void act(() => {
      result.current.rootScaleUpdater('system');
      result.current.rootSpectrumUpdater('system');
    });

    expect(result.current.rootSpectrumPreference).toBe('system');
    expect(result.current.rootScalePreference).toBe('system');
    expect(result.current.rootSpectrum).toBe('dark');
    expect(result.current.rootScale).toBe('xxxLarge');
    expect(result.current.spectrum).toBe('dark');
    expect(result.current.scale).toBe('xxxLarge');
  });
});
