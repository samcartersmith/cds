import { defaultPalette as paletteConfig, Spectrum } from '@cbhq/cds-common';
import { Alert, Linking, Platform } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import { CustomTabsHelper } from './customTabsHelper';
import { paletteValueToHex } from './palette';

interface Options {
  spectrum: Spectrum;
  preventRedirectionIntoApp?: boolean;
  forceOpenOutsideApp?: boolean;
}

export const openWebBrowser = async (url: string, options: Options) => {
  const preventRedirectionIntoApp = options.preventRedirectionIntoApp || false;
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
      readerMode: true,
      animated: true,
      modalPresentationStyle: 'fullScreen',
      modalTransitionStyle: 'crossDissolve',
      modalEnabled: true,
      enableBarCollapsing: false,
    },
  });

  try {
    if (!options.forceOpenOutsideApp && (await InAppBrowser.isAvailable())) {
      await InAppBrowser.open(url, browserConfig);
    } else {
      await Linking.openURL(url);
    }
  } catch (err) {
    // TODO: Should output this to Bugsnag
    Alert.alert(`An error occurred: ${err}`);
  }
};
