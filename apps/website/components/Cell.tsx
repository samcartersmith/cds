import React from 'react';
import { Box } from '@cbhq/cds-web/layout';

export const Cell: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Box flexGrow={1} spacing={1} flexBasis={0}>
      {children}
    </Box>
  );
};
