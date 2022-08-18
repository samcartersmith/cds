import React, { memo } from 'react';
import RootOriginal from '@theme-original/Root';
import { initContentfulClient } from '@cb/cms';
import { isProduction } from '@cbhq/cds-utils';

import { useContentfulConfig } from ':cds-website/cms/useContentfulConfig';

const Root = memo(({ children }) => {
  const { accessToken, space, host, clientKey } = useContentfulConfig();

  initContentfulClient(
    {
      accessToken,
      space,
      host,
      // contentful environment aliases
      environment: isProduction() ? 'master' : 'develop',
    },
    clientKey,
  );

  return <RootOriginal>{children}</RootOriginal>;
});

export default Root;
