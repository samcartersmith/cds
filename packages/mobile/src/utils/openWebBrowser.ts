import { Linking, Platform } from 'react-native';
import InAppBrowser, { InAppBrowserOptions } from 'react-native-inappbrowser-reborn';
import { defaultPalette as paletteConfig, Spectrum } from '@cbhq/cds-common';

import { CustomTabsHelper } from './customTabsHelper';
import { isValidURL } from './isValidURL';
import { paletteValueToHex } from './palette';

// react-native-inappbrowser-reborn does not export these types
// so I have to copy it here instead
type InAppBrowseriOSOptions = {
  dismissButtonStyle?: 'done' | 'close' | 'cancel';
  preferredBarTintColor?: string;
  preferredControlTintColor?: string;
  readerMode?: boolean;
  animated?: boolean;
  modalPresentationStyle?:
    | 'automatic'
    | 'fullScreen'
    | 'pageSheet'
    | 'formSheet'
    | 'currentContext'
    | 'custom'
    | 'overFullScreen'
    | 'overCurrentContext'
    | 'popover'
    | 'none';
  modalTransitionStyle?: 'coverVertical' | 'flipHorizontal' | 'crossDissolve' | 'partialCurl';
  modalEnabled?: boolean;
  enableBarCollapsing?: boolean;
  ephemeralWebSession?: boolean;
};

type InAppBrowserAndroidOptions = {
  showTitle?: boolean;
  toolbarColor?: string;
  secondaryToolbarColor?: string;
  navigationBarColor?: string;
  navigationBarDividerColor?: string;
  enableUrlBarHiding?: boolean;
  enableDefaultShare?: boolean;
  forceCloseOnRedirection?: boolean;
  animations?: {
    startEnter: string;
    startExit: string;
    endEnter: string;
    endExit: string;
  };
  headers?: Record<string, string>;
  hasBackButton?: boolean;
  browserPackage?: string;
  showInRecents?: boolean;
};

export type OpenWebBrowserOptions = {
  spectrum: Spectrum;
  preventRedirectionIntoApp?: boolean;
  forceOpenOutsideApp?: boolean;
  onInvalidURL?: () => void;
} & Omit<InAppBrowseriOSOptions, 'preferredBarTintColor' | 'preferredControlTintColor'> &
  Omit<InAppBrowserAndroidOptions, 'toolbarColor' | 'secondaryToolbarColor'>;

export const openWebBrowser = async (url: string, options: OpenWebBrowserOptions) => {
  const preventRedirectionIntoApp = options.preventRedirectionIntoApp ?? false;
  const forceOpenOutsideApp = options.forceOpenOutsideApp ?? false;

  if (preventRedirectionIntoApp) {
    CustomTabsHelper.preventRedirectionIntoApp();
  }

  // An object takes the last key-pair value as its final value, so this works.
  // i.e if we have an object like { a: 1, b: 2, a: 3 }, the final result will be
  // { a: 3, b: 2 }
  const browserConfig: InAppBrowserOptions | undefined = Platform.select({
    android: {
      showTitle: true,
      toolbarColor: paletteValueToHex(paletteConfig.positiveForeground, options.spectrum),
      secondaryToolbarColor: paletteValueToHex(paletteConfig.lineHeavy, options.spectrum),
      enableUrlBarHiding: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: false,
      ...options,
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
      ...options,
    },
  });

  try {
    if (isValidURL(url)) {
      if (!forceOpenOutsideApp && (await InAppBrowser.isAvailable())) {
        await InAppBrowser.open(url, browserConfig);
      } else {
        const canOpenURL = await Linking.canOpenURL(url);
        if (canOpenURL) {
          await Linking.openURL(url);
        }
      }
    } else {
      options.onInvalidURL?.();
    }
  } catch (err) {
    // TODO: Should output this to Bugsnag
    // eslint-disable-next-line no-console
    console.error(`An error occurred: ${err}`);
    InAppBrowser.close();
  }
};
