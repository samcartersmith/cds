import React, { memo, ReactNode } from 'react';
import { ChangelogTOCProvider } from '@theme/ChangelogTOCManager';
import { PropsTOCProvider } from '@theme/PropsTOCManager';
import { TOCProvider } from '@theme/TOCManager';

type RootProps = {
  children?: ReactNode;
};
const Root = memo(({ children }: RootProps) => {
  return (
    <TOCProvider>
      <ChangelogTOCProvider>
        <PropsTOCProvider>{children}</PropsTOCProvider>
      </ChangelogTOCProvider>
    </TOCProvider>
  );
});

export default Root;
