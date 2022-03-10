import { act, renderHook } from '@testing-library/react-hooks';
import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { Spectrum, useScale, useSpectrum } from '@cbhq/cds-common';
import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import { useRootSpectrumPreferenceUpdater } from '@cbhq/cds-common/spectrum/useRootSpectrumPreferenceUpdater';
import { useRootSpectrumPreference } from '@cbhq/cds-common/spectrum/useRootSpectrumPreference';
import { useRootScalePreference } from '@cbhq/cds-common/scale/useRootScalePreference';
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
          wrapper: (props) => (
            <DevicePreferencesProvider>
              <div {...props} />
            </DevicePreferencesProvider>
          ),
        },
      );

      const spectrum: Spectrum = match ? 'dark' : 'light';
      expect(result.current.rootSpectrumPreference).toEqual('system');
      expect(result.current.rootScalePreference).toEqual('system');
      expect(result.current.rootSpectrum).toEqual(spectrum);
      expect(result.current.rootScale).toEqual('large');
      expect(result.current.spectrum).toEqual(spectrum);
      expect(result.current.scale).toEqual('large');
    }
  });

  test('passed in props take priority over device', () => {
    mockMatchMedia(false); // light mode

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

    expect(result.current.rootSpectrumPreference).toEqual('dark');
    expect(result.current.rootScalePreference).toEqual('xSmall');
    expect(result.current.rootSpectrum).toEqual('dark');
    expect(result.current.rootScale).toEqual('xSmall');
    expect(result.current.spectrum).toEqual('dark');
    expect(result.current.scale).toEqual('xSmall');
  });

  test('unmount unsubscribes media listener', () => {
    mockMatchMedia(false);

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
        wrapper: (props) => (
          <DevicePreferencesProvider>
            <div {...props} />
          </DevicePreferencesProvider>
        ),
      },
    );

    rerender();
    rerender();

    expect(result.current.rootSpectrumPreference).toEqual('system');
    expect(result.current.rootScalePreference).toEqual('system');
    expect(result.current.rootSpectrum).toEqual('light');
    expect(result.current.rootScale).toEqual('large');
    expect(result.current.spectrum).toEqual('light');
    expect(result.current.scale).toEqual('large');

    expect(addEventListener).toHaveBeenCalled();
    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).not.toHaveBeenCalled();

    unmount();

    expect(removeEventListener).toHaveBeenCalled();
  });

  test('system to scale and spectrum updates', () => {
    mockMatchMedia(true);

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
    expect(result.current.rootScale).toEqual('large');
    expect(result.current.spectrum).toEqual('dark');
    expect(result.current.scale).toEqual('large');

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
    mockMatchMedia(true);

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
    expect(result.current.rootScale).toEqual('large');
    expect(result.current.spectrum).toEqual('dark');
    expect(result.current.scale).toEqual('large');
  });
});
