import { useCallback, useEffect, useState } from 'react';
import type { ComposePageData, FilterOptions } from '@theme/useComposePage';
import { ComposePage, getComposePage } from '@cb/cms';

export default function useComposePage({
  route,
  spaceId,
  clientKey,
}: FilterOptions): ComposePageData {
  const [pageData, setPageData] = useState<ComposePage<unknown> | null>(null);

  const handleError = useCallback((error: Error | string) => {
    // TODO: replace with Bugsnag
    // eslint-disable-next-line no-console
    console.error(`Contentful error: ${error}`);
  }, []);

  useEffect(() => {
    async function getContentfulEntry() {
      const composePageResult = await getComposePage(
        route,
        {
          // eslint-disable-next-line no-console
          onError: (error) => console.error(error),
          locale: 'en',
          spaceId,
          clientKey,
        },
        handleError,
      );

      if (composePageResult.type === 'SUCCESS') {
        setPageData(composePageResult.result);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getContentfulEntry();
  }, [route, spaceId, clientKey, handleError]);

  return { pageData, handleError };
}
