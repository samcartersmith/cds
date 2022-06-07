import React, { memo } from 'react';
import { PropsTOCProvider } from '@theme/PropsTOCManager';
import { TOCProvider } from '@theme/TOCManager';

const Root = memo(({ children }) => {
  return (
    <TOCProvider>
      <PropsTOCProvider>{children}</PropsTOCProvider>
    </TOCProvider>
  );
});

export default Root;
