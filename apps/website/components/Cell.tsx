import React from 'react';
import { Box } from '@cbhq/cds-web/layout';

export const Cell: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Box flexBasis={0} flexGrow={1} spacing={1}>
      {children}
    </Box>
  );
};
