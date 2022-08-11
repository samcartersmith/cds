import React, { memo } from 'react';
import { ChangelogTOCProvider } from '@theme/ChangelogTOCManager';
import { PropsTOCProvider } from '@theme/PropsTOCManager';
import { TOCProvider } from '@theme/TOCManager';
import useContentfulConfig from '@theme/useContentfulConfig';
import { initContentfulClient } from '@cb/cms';
import { isProduction } from '@cbhq/cds-utils';

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

  return (
    <TOCProvider>
      <ChangelogTOCProvider>
        <PropsTOCProvider>{children}</PropsTOCProvider>
      </ChangelogTOCProvider>
    </TOCProvider>
  );
});

export default Root;
