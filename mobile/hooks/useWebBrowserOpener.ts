import { useCallback } from 'react';

import { useSpectrum } from '@cbhq/cds-common';
import { Linking } from 'react-native';

import { openWebBrowser, OpenWebBrowserOptions } from '../utils/openWebBrowser';
import { parseUrl } from '../utils/urlUtil';

export const useWebBrowserOpener = () => {
  const spectrum = useSpectrum();
  return useCallback(
    async (url: string, options?: Partial<OpenWebBrowserOptions>) => {
      const parsedUrl = parseUrl(url);

      switch (parsedUrl.protocol) {
        case 'http':
        case 'https':
          // Use custom handling for web URLs
          await openWebBrowser(url, {
            spectrum: options?.spectrum ?? spectrum,
            preventRedirectionIntoApp: options?.preventRedirectionIntoApp || false,
            forceOpenOutsideApp: options?.forceOpenOutsideApp || false,
          });
          break;
        default:
          {
            // Handle other schemes such as mailto, tel, and sms
            try {
              const canOpenUrl = await Linking.canOpenURL(url);

              if (!canOpenUrl) {
                // TODO: replace these with Bugsnag one day
                console.error(`Cannot open URL ${url}`);
                return;
              }

              await Linking.openURL(url);
            } catch (err) {
              console.error(err.message);
            }
          }
          break;
      }
    },
    [spectrum]
  );
};
