import { useCallback, useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import { ComposePage as CbComposePage, getComposePage } from '@cb/cms';
import { isProduction } from '@cbhq/cds-utils';

import { useContentfulConfig } from './useContentfulConfig';

export type ComposePage<T> = {
  title?: string;
} & CbComposePage<T>;

export function useComposePage<T>(slug?: string) {
  const location = useLocation();

  const [pageData, setPageData] = useState<ComposePage<T> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { space, clientKey } = useContentfulConfig();

  const handleError = useCallback((error: Error | string) => {
    // TODO: replace with Bugsnag
    if (!isProduction()) {
      console.error(`Contentful error: ${error}`);
    }
  }, []);

  const route = slug ?? location.pathname;

  useEffect(() => {
    async function getContentfulEntry() {
      const composePageResult = await getComposePage<T>(
        route,
        {
          onError: (error) => console.error(error),
          locale: 'en',
          spaceId: space,
          clientKey,
          include: 10,
        },
        handleError,
      );

      if (composePageResult.type === 'SUCCESS') {
        setPageData(composePageResult.result);
      }
      setIsLoading(false);
    }

    if (route) {
      void getContentfulEntry();
    }
  }, [route, space, clientKey, handleError]);

  return { pageData, space, isLoading, handleError };
}
