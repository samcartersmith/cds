import { useCallback } from 'react';

import { useSpectrum } from '@cbhq/cds-common';
import { Alert, Linking } from 'react-native';

import { openWebBrowser } from '../utils/openWebBrowser';
import { parseUrl } from '../utils/urlUtil';

export const useOpenExternalUrl = () => {
  const spectrum = useSpectrum();
  return useCallback(
    async (url: string) => {
      const parsedUrl = parseUrl(url);

      switch (parsedUrl.protocol) {
        case 'http':
        case 'https':
          // Use custom handling for web URLs
          openWebBrowser(url, {
            spectrum,
            preventRedirectionIntoApp: false,
            forceOpenOutsideApp: false,
          });
          break;
        default:
          {
            // Handle other schemes such as mailto, tel, and sms
            const canOpenUrl = await Linking.canOpenURL(url);

            if (!canOpenUrl) {
              // TODO: replace these with Bugsnag one day
              Alert.alert(`Cannot open URL ${url}`);
              return;
            }

            Linking.openURL(url);
          }
          break;
      }
    },
    [spectrum]
  );
};
