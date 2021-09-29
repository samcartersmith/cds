import React from 'react';

import { Box, BoxProps } from '../../layout';

export const ModalBody: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box spacing={3} flexGrow={1} overflow="auto" {...props}>
      {children}
    </Box>
  );
};
