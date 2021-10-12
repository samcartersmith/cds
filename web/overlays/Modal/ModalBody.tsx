import React from 'react';

import { Box } from '../../layout';

export const ModalBody: React.FC = ({ children }) => {
  return (
    <Box spacing={3} flexGrow={1} overflow="auto">
      {children}
    </Box>
  );
};
