import { act, renderHook } from '@testing-library/react-hooks';
import { Spectrum, useScale, useSpectrum } from '@cbhq/cds-common';
import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { useRootScalePreference } from '@cbhq/cds-common/scale/useRootScalePreference';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { useRootSpectrumPreference } from '@cbhq/cds-common/spectrum/useRootSpectrumPreference';
import { useRootSpectrumPreferenceUpdater } from '@cbhq/cds-common/spectrum/useRootSpectrumPreferenceUpdater';
import { DevicePreferencesBaseProviderProps } from '@cbhq/cds-common/system/DevicePreferencesBaseProvider';

import { DevicePreferencesProvider } from '../DevicePreferencesProvider';

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
const addEventListener = jest.fn();
const removeEventListener = jest.fn();

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener,
      removeEventListener,
      dispatchEvent: jest.fn(),
    })),
  });
}

describe('DevicePreferencesProvider', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    addEventListener.mockReset();
    removeEventListener.mockReset();
  });

  it('returns the correct spectrum based on device media query', () => {
    function Wrapper(props: DevicePreferencesBaseProviderProps) {
      return (
        <DevicePreferencesProvider>
          {/*
          // @ts-expect-error - this is a stand-in element for other providers& components */}
          <div {...props} />
        </DevicePreferencesProvider>
      );
    }

    for (const match of [true, false]) {
      mockMatchMedia(match);

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

      const spectrum: Spectrum = match ? 'dark' : 'light';
      expect(result.current.rootSpectrumPreference).toBe('system');
      expect(result.current.rootScalePreference).toBe('system');
      expect(result.current.rootSpectrum).toEqual(spectrum);
      expect(result.current.rootScale).toBe('large');
      expect(result.current.spectrum).toEqual(spectrum);
      expect(result.current.scale).toBe('large');
    }
  });

  test('passed in props take priority over device', () => {
    mockMatchMedia(false); // light mode

    function Wrapper(props: DevicePreferencesBaseProviderProps) {
      return (
        <DevicePreferencesProvider spectrum="dark" scale="xSmall">
          {/*
          // @ts-expect-error - this is a stand-in element for other providers& components */}
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

    expect(result.current.rootSpectrumPreference).toBe('dark');
    expect(result.current.rootScalePreference).toBe('xSmall');
    expect(result.current.rootSpectrum).toBe('dark');
    expect(result.current.rootScale).toBe('xSmall');
    expect(result.current.spectrum).toBe('dark');
    expect(result.current.scale).toBe('xSmall');
  });

  test('unmount unsubscribes media listener', () => {
    mockMatchMedia(false);

    function Wrapper(props: DevicePreferencesBaseProviderProps) {
      return (
        <DevicePreferencesProvider>
          {/*
          // @ts-expect-error - this is a stand-in element for other providers& components */}
          <div {...props} />
        </DevicePreferencesProvider>
      );
    }

    const { result, unmount, rerender } = renderHook(
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

    rerender();
    rerender();

    expect(result.current.rootSpectrumPreference).toBe('system');
    expect(result.current.rootScalePreference).toBe('system');
    expect(result.current.rootSpectrum).toBe('light');
    expect(result.current.rootScale).toBe('large');
    expect(result.current.spectrum).toBe('light');
    expect(result.current.scale).toBe('large');

    expect(addEventListener).toHaveBeenCalled();
    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).not.toHaveBeenCalled();

    unmount();

    expect(removeEventListener).toHaveBeenCalled();
  });

  test('system to scale and spectrum updates', () => {
    mockMatchMedia(true);

    function Wrapper(props: DevicePreferencesBaseProviderProps) {
      return (
        <DevicePreferencesProvider>
          {/*
          // @ts-expect-error - this is a stand-in element for other providers& components */}
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

    expect(result.current.rootSpectrumPreference).toBe('system');
    expect(result.current.rootScalePreference).toBe('system');
    expect(result.current.rootSpectrum).toBe('dark');
    expect(result.current.rootScale).toBe('large');
    expect(result.current.spectrum).toBe('dark');
    expect(result.current.scale).toBe('large');

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
    mockMatchMedia(true);

    function Wrapper(props: DevicePreferencesBaseProviderProps) {
      return (
        <DevicePreferencesProvider scale="medium" spectrum="light">
          {/*
          // @ts-expect-error - this is a stand-in element for other providers& components */}
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
    expect(result.current.rootScale).toBe('large');
    expect(result.current.spectrum).toBe('dark');
    expect(result.current.scale).toBe('large');
  });
});
