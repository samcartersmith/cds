import { defaultPalette as paletteConfig } from '@cbhq/cds-common';
import { Linking, Platform, Alert } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

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
    const spyIsAvailable = jest.spyOn(InAppBrowser, 'isAvailable').mockImplementation(() => {
      return Promise.resolve(true);
    });
    const spyInAppBrowserOpen = jest.spyOn(InAppBrowser, 'open');
    await openWebBrowser('www.google.com', {
      spectrum: 'dark',
      forceOpenOutsideApp: false,
    });
    expect(spyIsAvailable).toHaveBeenCalledTimes(1);
    expect(spyInAppBrowserOpen).toHaveBeenCalledTimes(1);
  });
  it('dark mode configuration is applied in browserConfig', async () => {
    const selectPlatform = jest.spyOn(Platform, 'select');
    await openWebBrowser('www.google.com', {
      spectrum: 'dark',
      forceOpenOutsideApp: false,
    });
    expect(selectPlatform).toBeCalledWith({
      android: {
        showTitle: true,
        toolbarColor: paletteValueToHex(paletteConfig.positiveForeground, 'dark'),
        secondaryToolbarColor: paletteValueToHex(paletteConfig.lineHeavy, 'dark'),
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
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
      },
    });
  });
  it('light mode configuration is applied in browserConfig', async () => {
    const selectPlatform = jest.spyOn(Platform, 'select');
    await openWebBrowser('www.google.com', {
      spectrum: 'light',
      forceOpenOutsideApp: false,
    });
    expect(selectPlatform).toBeCalledWith({
      android: {
        showTitle: true,
        toolbarColor: paletteValueToHex(paletteConfig.positiveForeground, 'light'),
        secondaryToolbarColor: paletteValueToHex(paletteConfig.lineHeavy, 'light'),
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
      },
      ios: {
        dismissButtonStyle: 'close',
        preferredBarTintColor: paletteValueToHex(paletteConfig.positiveForeground, 'light'),
        preferredControlTintColor: paletteValueToHex(paletteConfig.primary, 'light'),
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'crossDissolve',
        modalEnabled: true,
        enableBarCollapsing: false,
      },
    });
  });
  it('preventRedirectionIntoApp flag is configurable', async () => {
    const spyPreventRedirection = jest.spyOn(CustomTabsHelper, 'preventRedirectionIntoApp');
    await openWebBrowser('www.google.com', {
      spectrum: 'dark',
      preventRedirectionIntoApp: true,
      forceOpenOutsideApp: true,
    });
    expect(spyPreventRedirection).toHaveBeenCalledTimes(1);
  });
  it('mock an error', async () => {
    const spyOpenURL = jest.spyOn(Linking, 'openURL').mockImplementation(() => {
      return Promise.reject('App browser is not available');
    });
    const spyAlert = jest.spyOn(Alert, 'alert');

    await openWebBrowser('www.google.com', {
      spectrum: 'dark',
      forceOpenOutsideApp: true,
    });
    expect(spyOpenURL).toHaveBeenCalled();
    expect(spyAlert).toHaveBeenCalled();
  });
});
