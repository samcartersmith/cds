import React from 'react';
import { useModalParent } from '@cbhq/cds-common2/overlays/ModalParentContext';

import { type BoxProps, Box } from '../../layout/Box';

export type ModalBodyProps = BoxProps<'div'>;

export const ModalBody = ({
  children,
  flexDirection = 'column',
  flexGrow = 1,
  overflow = 'auto',
  paddingX = 3,
  tabIndex = 0,
  ...props
}: ModalBodyProps) => {
  const { hideDividers } = useModalParent();

  return (
    <Box
      flexDirection={flexDirection}
      flexGrow={flexGrow}
      overflow={overflow}
      paddingX={paddingX}
      paddingY={hideDividers ? 0 : 3} // remove vertical padding when dividers hidden
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </Box>
  );
};
