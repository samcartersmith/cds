import { useCallback } from 'react';

import goToLink from '../utils/goToLink';

export default function useGoToLinkHandler(link?: string) {
  const handler = useCallback(() => {
    goToLink(link!);
  }, [link]);

  if (link) {
    return handler;
  }
  return undefined;
}
