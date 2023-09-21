import React, { memo } from 'react';
import RootOriginal from '@theme-original/Root';
import { initContentfulClient } from '@cb/cms';

import { useContentfulConfig } from ':cds-website/cms/useContentfulConfig';

const Root = memo(({ children }: { children: React.ReactNode }) => {
  const { accessToken, space, host, clientKey, environment } = useContentfulConfig();

  initContentfulClient(
    'website',
    {
      accessToken,
      space,
      host,
      environment,
    },
    clientKey,
  );

  return <RootOriginal>{children}</RootOriginal>;
});

export default Root;
