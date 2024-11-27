import React from 'react';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';

import { type PolymorphicBoxProps, Box } from '../../layout/Box';

export type ModalBodyProps<AsComponent extends React.ElementType> =
  PolymorphicBoxProps<AsComponent>;

export const ModalBody = <AsComponent extends React.ElementType = 'div'>({
  children,
  flexDirection = 'column',
  flexGrow = 1,
  overflow = 'auto',
  paddingX = 3,
  tabIndex = 0,
  ...props
}: ModalBodyProps<AsComponent>) => {
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
