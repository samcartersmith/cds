import { BoxBaseProps } from '@cbhq/cds-common';
import React from 'react';

import { Box } from '../../layout';

export type ModalBodyProps = Pick<BoxBaseProps, 'flexDirection'>;

export const ModalBody: React.FC<ModalBodyProps> = ({ children, flexDirection = 'column' }) => {
  return (
    <Box spacing={3} flexGrow={1} overflow="auto" flexDirection={flexDirection}>
      {children}
    </Box>
  );
};
