import { useEffect, useState } from 'react';
import type { ThemeConfig } from '@cbhq/cds-web2/core/theme';

type Theme = {
  docsTheme?: ThemeConfig;
  playgroundTheme?: ThemeConfig;
};

const postMessageType = 'GET_INTERNAL_CDS_THEME_FROM_EXTENSION';
const responseMessageType = 'CDS_INTERNAL_THEME_RESPONSE';

export const useInternalCDSTheme = () => {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    // Request theme immediately
    window.postMessage({ type: postMessageType }, '*');

    // Listener for response from extension
    const messageListener = (event: MessageEvent<{ type: string; theme: Theme }>) => {
      if (event.source === window && event.data.type === responseMessageType && event.data.theme) {
        setTheme(event.data.theme);
      }
    };
    // Add message listener
    window.addEventListener('message', messageListener);

    // Cleanup
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, []);

  return theme;
};
