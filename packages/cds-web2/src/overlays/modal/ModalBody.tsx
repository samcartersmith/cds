import React, { forwardRef } from 'react';
import { useModalParent } from '@cbhq/cds-common2/overlays/ModalParentContext';

import { Box, type BoxDefaultElement, type BoxProps } from '../../layout/Box';

export type ModalBodyProps = BoxProps<BoxDefaultElement>;

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  (
    {
      children,
      flexDirection = 'column',
      flexGrow = 1,
      overflow = 'auto',
      paddingX = 3,
      tabIndex = 0,
      ...props
    },
    ref,
  ) => {
    const { hideDividers } = useModalParent();

    return (
      <Box
        ref={ref}
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
  },
);
