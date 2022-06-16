import React, { memo } from 'react';
import { ChangelogTOCProvider } from '@theme/ChangelogTOCManager';
import { PropsTOCProvider } from '@theme/PropsTOCManager';
import { TOCProvider } from '@theme/TOCManager';

const Root = memo(({ children }) => {
  return (
    <TOCProvider>
      <ChangelogTOCProvider>
        <PropsTOCProvider>{children}</PropsTOCProvider>
      </ChangelogTOCProvider>
    </TOCProvider>
  );
});

export default Root;
