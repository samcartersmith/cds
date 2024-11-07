import React from 'react';
import { BoxBaseProps } from '@cbhq/cds-common';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';

import { Box } from '../../layout';

export type ModalBodyProps = Pick<BoxBaseProps, 'flexDirection' | 'alignItems'>;

export const ModalBody: React.FC<React.PropsWithChildren<ModalBodyProps>> = ({
  children,
  flexDirection = 'column',
  ...props
}) => {
  const { hideDividers } = useModalParent();

  return (
    <Box
      flexDirection={flexDirection}
      flexGrow={1}
      overflow="auto"
      spacingHorizontal={3}
      spacingVertical={hideDividers ? 0 : 3} // remove vertical padding when dividers hidden
      tabIndex={0}
      {...props}
    >
      {children}
    </Box>
  );
};
