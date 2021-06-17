import { defaultPalette as paletteConfig, Spectrum } from '@cbhq/cds-common';
import { Linking, Platform } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import { CustomTabsHelper } from './customTabsHelper';
import { paletteValueToHex } from './palette';

export interface OpenWebBrowserOptions {
  spectrum: Spectrum;
  preventRedirectionIntoApp?: boolean;
  forceOpenOutsideApp?: boolean;
}

export const openWebBrowser = async (url: string, options: OpenWebBrowserOptions) => {
  const preventRedirectionIntoApp = options.preventRedirectionIntoApp || false;
  const forceOpenOutsideApp = options.forceOpenOutsideApp || false;

  if (preventRedirectionIntoApp) {
    CustomTabsHelper.preventRedirectionIntoApp();
  }

  const browserConfig = Platform.select({
    android: {
      showTitle: true,
      toolbarColor: paletteValueToHex(paletteConfig.positiveForeground, options.spectrum),
      secondaryToolbarColor: paletteValueToHex(paletteConfig.lineHeavy, options.spectrum),
      enableUrlBarHiding: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: false,
    },
    ios: {
      dismissButtonStyle: 'close',
      preferredBarTintColor: paletteValueToHex(paletteConfig.positiveForeground, options.spectrum),
      preferredControlTintColor: paletteValueToHex(paletteConfig.primary, options.spectrum),
      readerMode: false,
      animated: true,
      modalPresentationStyle: 'fullScreen',
      modalTransitionStyle: 'crossDissolve',
      modalEnabled: true,
      enableBarCollapsing: false,
    },
  });

  try {
    if (!forceOpenOutsideApp && (await InAppBrowser.isAvailable())) {
      await InAppBrowser.open(url, browserConfig);
    } else {
      await Linking.openURL(url);
    }
  } catch (err) {
    // TODO: Should output this to Bugsnag
    console.error(`An error occurred: ${err}`);
  }
};
