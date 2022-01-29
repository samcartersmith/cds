import React from 'react';
import { BoxBaseProps } from '@cbhq/cds-common';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';

import { Box } from '../../layout';

export type ModalBodyProps = Pick<BoxBaseProps, 'flexDirection' | 'alignItems'>;

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  flexDirection = 'column',
  ...props
}) => {
  const { hideDividers } = useModalParent();

  return (
    <Box
      spacingHorizontal={3}
      // remove vertical padding when dividers hidden
      spacingVertical={hideDividers ? 0 : 3}
      flexGrow={1}
      overflow="auto"
      flexDirection={flexDirection}
      {...props}
    >
      {children}
    </Box>
  );
};
