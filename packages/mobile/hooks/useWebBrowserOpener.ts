import { useCallback } from 'react';

import { useSpectrum } from '@cbhq/cds-common';
import { Linking } from 'react-native';

import { openWebBrowser, OpenWebBrowserOptions } from '../utils/openWebBrowser';

export const useWebBrowserOpener = () => {
  const spectrum = useSpectrum();
  return useCallback(
    async (url: string, options?: Partial<OpenWebBrowserOptions>) => {
      if (url.startsWith('https://') || url.startsWith('http://')) {
        // Use custom handling for web URLs
        await openWebBrowser(url, {
          spectrum: options?.spectrum ?? spectrum,
          ...options,
        });
        return;
      }

      // Handle other schemes such as mailto, tel, and sms
      try {
        const canOpenUrl = await Linking.canOpenURL(url);

        if (!canOpenUrl) {
          // TODO: replace these with Bugsnag one day
          // eslint-disable-next-line no-console
          console.error(`Cannot open URL ${url}`);
          return;
        }

        await Linking.openURL(url);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    },
    [spectrum],
  );
};
