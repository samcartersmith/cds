import { renderHook } from '@testing-library/react-hooks';
import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { Spectrum } from '@cbhq/cds-common';
import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
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

      const { result } = renderHook(() => useRootSpectrum(), {
        wrapper: (props) => (
          <DevicePreferencesProvider>
            <div {...props} />
          </DevicePreferencesProvider>
        ),
      });

      const spectrum: Spectrum = match ? 'dark' : 'light';
      expect(result.current).toEqual(spectrum);
    }
  });

  test('passed in props take priority over device', () => {
    mockMatchMedia(false); // light mode

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

  test('unmount unsubscribes media listener', () => {
    mockMatchMedia(false);

    const { result, unmount, rerender } = renderHook(() => useRootSpectrum(), {
      wrapper: (props) => (
        <DevicePreferencesProvider>
          <div {...props} />
        </DevicePreferencesProvider>
      ),
    });

    rerender();
    rerender();

    expect(result.current).toEqual('light');

    expect(addEventListener).toHaveBeenCalled();
    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).not.toHaveBeenCalled();

    unmount();

    expect(removeEventListener).toHaveBeenCalled();
  });
});
