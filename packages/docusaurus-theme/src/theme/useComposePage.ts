import { useCallback, useEffect, useState } from 'react';
import type { ComposePageData, FilterOptions } from '@theme/useComposePage';
import useContentfulConfig from '@theme/useContentfulConfig';
import { ComposePage, getComposePage } from '@cb/cms';

export default function useComposePage({ slug }: FilterOptions): ComposePageData {
  const [pageData, setPageData] = useState<ComposePage<unknown> | null>(null);

  const { space, clientKey } = useContentfulConfig();

  const handleError = useCallback((error: Error | string) => {
    // TODO: replace with Bugsnag
    // eslint-disable-next-line no-console
    console.error(`Contentful error: ${error}`);
  }, []);

  useEffect(() => {
    async function getContentfulEntry() {
      const composePageResult = await getComposePage(
        slug,
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
    if (slug) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getContentfulEntry();
    }
  }, [slug, space, clientKey, handleError]);

  return { pageData, handleError };
}
