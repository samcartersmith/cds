import { renderHook } from '@testing-library/react-hooks';

import * as openWebBrowser from '../../utils/openWebBrowser';
import { useWebBrowserOpener } from '../useWebBrowserOpener';

const URL = 'https://www.coinbase.com';

const DEFAULT_OPEN_WEB_BROWSER_OPTIONS = {
  spectrum: 'light',
  preventRedirectionIntoApp: false,
  forceOpenOutsideApp: false,
};

describe('useWebBrowserOpener', () => {
  it('optional openWebBrowser options work as expected', () => {
    const { result } = renderHook(() => useWebBrowserOpener());
    const openWebBrowserSpy = jest.spyOn(openWebBrowser, 'openWebBrowser').mockImplementation();

    result.current(URL);

    expect(openWebBrowserSpy).toBeCalledWith(URL, DEFAULT_OPEN_WEB_BROWSER_OPTIONS);
  });

  it('pass user specified options to openWebBrowser', () => {
    const { result } = renderHook(() => useWebBrowserOpener());
    const openWebBrowserSpy = jest.spyOn(openWebBrowser, 'openWebBrowser').mockImplementation();
    const options = {
      spectrum: 'dark',
      preventRedirectionIntoApp: true,
      forceOpenOutsideApp: true,
    } as const;

    result.current(URL, options);

    expect(openWebBrowserSpy).toBeCalledWith(URL, options);
  });

  it('test that spectrum is optional', () => {
    const { result } = renderHook(() => useWebBrowserOpener());
    const openWebBrowserSpy = jest.spyOn(openWebBrowser, 'openWebBrowser').mockImplementation();
    const options = {
      preventRedirectionIntoApp: false,
      forceOpenOutsideApp: false,
    } as const;

    result.current(URL, options);

    expect(openWebBrowserSpy).toBeCalledWith(URL, {
      spectrum: 'light',
      preventRedirectionIntoApp: false,
      forceOpenOutsideApp: false,
    });
  });

  it('test that preventRedirectionIntoApp is optional', () => {
    const { result } = renderHook(() => useWebBrowserOpener());
    const openWebBrowserSpy = jest.spyOn(openWebBrowser, 'openWebBrowser').mockImplementation();
    const options = {
      forceOpenOutsideApp: false,
    } as const;

    result.current(URL, options);

    expect(openWebBrowserSpy).toBeCalledWith(URL, {
      spectrum: 'light',
      preventRedirectionIntoApp: false,
      forceOpenOutsideApp: false,
    });
  });

  /**
   * If I do not pass any options to the hook, I should expect
   * the hook to use the default spectrum value.
   */
  it('if user passes no options, they should use the default option values', () => {
    const { result } = renderHook(() => useWebBrowserOpener());
    const openWebBrowserSpy = jest.spyOn(openWebBrowser, 'openWebBrowser').mockImplementation();

    result.current(URL, {});

    expect(openWebBrowserSpy).toBeCalledWith(URL, DEFAULT_OPEN_WEB_BROWSER_OPTIONS);
  });
});
