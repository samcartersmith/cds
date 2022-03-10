import { Linking, Platform } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { defaultPalette as paletteConfig } from '@cbhq/cds-common';

import { CustomTabsHelper } from '../customTabsHelper';
import { openWebBrowser } from '../openWebBrowser';
import { paletteValueToHex } from '../palette';

describe('openWebBrowser', () => {
  it('opens web browser outside of app', async () => {
    const spy = jest.spyOn(Linking, 'openURL');
    await openWebBrowser('www.google.com', {
      spectrum: 'dark',
      forceOpenOutsideApp: true,
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('opens web browser within app', async () => {
    const spyIsAvailable = jest.spyOn(InAppBrowser, 'isAvailable').mockImplementation(async () => {
      return Promise.resolve(true);
    });
    const spyInAppBrowserOpen = jest.spyOn(InAppBrowser, 'open').mockImplementation();
    await openWebBrowser('www.google.com', {
      spectrum: 'dark',
      forceOpenOutsideApp: false,
    });
    expect(spyIsAvailable).toHaveBeenCalledTimes(1);
    expect(spyInAppBrowserOpen).toHaveBeenCalledTimes(1);
  });
  it('dark mode configuration is applied in browserConfig', async () => {
    const selectPlatform = jest.spyOn(Platform, 'select').mockImplementation();
    await openWebBrowser('www.google.com', {
      spectrum: 'dark',
      forceOpenOutsideApp: false,
    });
    expect(selectPlatform).toHaveBeenCalledWith({
      android: {
        showTitle: true,
        toolbarColor: paletteValueToHex(paletteConfig.positiveForeground, 'dark'),
        secondaryToolbarColor: paletteValueToHex(paletteConfig.lineHeavy, 'dark'),
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        spectrum: 'dark',
        forceOpenOutsideApp: false,
      },
      ios: {
        dismissButtonStyle: 'close',
        preferredBarTintColor: paletteValueToHex(paletteConfig.positiveForeground, 'dark'),
        preferredControlTintColor: paletteValueToHex(paletteConfig.primary, 'dark'),
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'crossDissolve',
        modalEnabled: true,
        enableBarCollapsing: false,
        spectrum: 'dark',
        forceOpenOutsideApp: false,
      },
    });
  });
  it('light mode configuration is applied in browserConfig', async () => {
    const selectPlatform = jest.spyOn(Platform, 'select').mockImplementation();
    const spectrum = 'light';

    await openWebBrowser('www.google.com', {
      spectrum,
      forceOpenOutsideApp: false,
    });
    expect(selectPlatform).toHaveBeenCalledWith({
      android: {
        showTitle: true,
        toolbarColor: paletteValueToHex(paletteConfig.positiveForeground, spectrum),
        secondaryToolbarColor: paletteValueToHex(paletteConfig.lineHeavy, spectrum),
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        spectrum,
        forceOpenOutsideApp: false,
      },
      ios: {
        dismissButtonStyle: 'close',
        preferredBarTintColor: paletteValueToHex(paletteConfig.positiveForeground, spectrum),
        preferredControlTintColor: paletteValueToHex(paletteConfig.primary, spectrum),
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'crossDissolve',
        modalEnabled: true,
        enableBarCollapsing: false,
        spectrum,
        forceOpenOutsideApp: false,
      },
    });
  });
  it('readerMode is configurable', async () => {
    const selectPlatform = jest.spyOn(Platform, 'select').mockImplementation();
    const spectrum = 'light';

    await openWebBrowser('www.google.com', {
      spectrum,
      readerMode: true,
      forceOpenOutsideApp: false,
    });
    expect(selectPlatform).toHaveBeenCalledWith({
      android: {
        showTitle: true,
        toolbarColor: paletteValueToHex(paletteConfig.positiveForeground, spectrum),
        secondaryToolbarColor: paletteValueToHex(paletteConfig.lineHeavy, spectrum),
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        readerMode: true,
        spectrum,
        forceOpenOutsideApp: false,
      },
      ios: {
        dismissButtonStyle: 'close',
        preferredBarTintColor: paletteValueToHex(paletteConfig.positiveForeground, spectrum),
        preferredControlTintColor: paletteValueToHex(paletteConfig.primary, spectrum),
        readerMode: true,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'crossDissolve',
        modalEnabled: true,
        enableBarCollapsing: false,
        spectrum,
        forceOpenOutsideApp: false,
      },
    });
  });
  it('preventRedirectionIntoApp flag is configurable', async () => {
    const spyPreventRedirection = jest
      .spyOn(CustomTabsHelper, 'preventRedirectionIntoApp')
      .mockImplementation();
    await openWebBrowser('www.google.com', {
      spectrum: 'dark',
      preventRedirectionIntoApp: true,
      forceOpenOutsideApp: true,
    });
    expect(spyPreventRedirection).toHaveBeenCalledTimes(1);
  });
  it('can add InAppBrowser configruations', async () => {
    const selectPlatform = jest.spyOn(Platform, 'select').mockImplementation();
    const spectrum = 'dark';

    await openWebBrowser('www.google.com', {
      // cds custom properties
      spectrum,
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
    });
    expect(selectPlatform).toHaveBeenCalledWith({
      android: {
        toolbarColor: paletteValueToHex(paletteConfig.positiveForeground, spectrum),
        secondaryToolbarColor: paletteValueToHex(paletteConfig.lineHeavy, spectrum),
        // cds custom properties
        spectrum,
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
      },
      ios: {
        preferredBarTintColor: paletteValueToHex(paletteConfig.positiveForeground, spectrum),
        preferredControlTintColor: paletteValueToHex(paletteConfig.primary, spectrum),
        // cds custom properties
        spectrum,
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
      },
    });
  });

  it('should trigger onInvalidURL callback', async () => {
    const onInvalidURL = jest.fn();

    await openWebBrowser('/earn/something', {
      spectrum: 'dark',
      preventRedirectionIntoApp: true,
      onInvalidURL,
    });

    expect(onInvalidURL).toHaveBeenCalledTimes(1);
  });
});
