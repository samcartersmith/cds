import { useCallback, useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import { ComposePage as CbComposePage, getComposePage } from '@cb/cms';

import { useContentfulConfig } from './useContentfulConfig';

export type ComposePage<T> = {
  title?: string;
} & CbComposePage<T>;

export function useComposePage<T>(slug?: string) {
  const location = useLocation();

  const [pageData, setPageData] = useState<ComposePage<T> | null>(null);
  const { space, clientKey } = useContentfulConfig();

  const handleError = useCallback((error: Error | string) => {
    // TODO: replace with Bugsnag
    // eslint-disable-next-line no-console
    console.error(`Contentful error: ${error}`);
  }, []);

  const route = slug ?? location.pathname;

  useEffect(() => {
    async function getContentfulEntry() {
      const composePageResult = await getComposePage<T>(
        route,
        {
          // eslint-disable-next-line no-console
          onError: (error) => console.error(error),
          locale: 'en',
          spaceId: space,
          clientKey,
        },
        handleError,
      );

      if (composePageResult.type === 'SUCCESS') {
        setPageData(composePageResult.result);
      }
    }
    if (route) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getContentfulEntry();
    }
  }, [route, space, clientKey, handleError]);

  return { pageData, space, handleError };
}
