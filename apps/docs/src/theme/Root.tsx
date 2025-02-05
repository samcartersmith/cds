import React from 'react';
import { PropsTOCProvider } from '@site/src/utils/toc/PropsTOCManager';
import { TOCProvider } from '@site/src/utils/toc/TOCManager';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <TOCProvider>
      <PropsTOCProvider>{children}</PropsTOCProvider>
    </TOCProvider>
  );
}
