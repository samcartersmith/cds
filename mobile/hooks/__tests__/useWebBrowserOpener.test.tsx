import { renderHook } from '@testing-library/react-hooks';

import * as openWebBrowser from '../../utils/openWebBrowser';
import { useWebBrowserOpener } from '../useWebBrowserOpener';

const URL = 'https://www.coinbase.com';

const DEFAULT_OPEN_WEB_BROWSER_OPTIONS = {
  spectrum: 'light',
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
      readerMode: true,
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
      readerMode: false,
    } as const;

    result.current(URL, options);

    expect(openWebBrowserSpy).toBeCalledWith(URL, {
      ...DEFAULT_OPEN_WEB_BROWSER_OPTIONS,
      ...options,
    });
  });

  /**
   * If I do not pass any options to the hook, I should expect
   * the hook to use the default spectrum value.
   */
  it('if user passes no options, they should use the default option values', () => {
    const { result } = renderHook(() => useWebBrowserOpener());
    const openWebBrowserSpy = jest.spyOn(openWebBrowser, 'openWebBrowser').mockImplementation();

    result.current(URL);

    expect(openWebBrowserSpy).toBeCalledWith(URL, DEFAULT_OPEN_WEB_BROWSER_OPTIONS);
  });
  it('test all the InAppBrowser configuration, making sure that all of them can be used', () => {
    const { result } = renderHook(() => useWebBrowserOpener());
    const openWebBrowserSpy = jest.spyOn(openWebBrowser, 'openWebBrowser').mockImplementation();
    const options = {
      // cds custom properties
      preventRedirectionIntoApp: true,
      forceOpenOutsideApp: true,
      // iOS Properties
      dismissButtonStyle: 'cancel',
      readerMode: true,
      animated: false,
      modalPresentationStyle: 'fullScreen',
      modalTransitionStyle: 'coverVertical',
      modalEnabled: true,
      enableBarCollapsing: false,
      // Android Properties
      showTitle: true,
      navigationBarColor: 'black',
      navigationBarDividerColor: 'white',
      enableUrlBarHiding: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: false,
      // Specify full animation resource identifier(package:anim/name)
      // or only resource name(in case of animation bundled with app).
      animations: {
        startEnter: 'slide_in_right',
        startExit: 'slide_out_left',
        endEnter: 'slide_in_left',
        endExit: 'slide_out_right',
      },
      headers: {
        'my-custom-header': 'my custom header value',
      },
    } as const;

    result.current(URL, options);

    expect(openWebBrowserSpy).toBeCalledWith(URL, {
      ...DEFAULT_OPEN_WEB_BROWSER_OPTIONS,
      ...options,
    });
  });
});
