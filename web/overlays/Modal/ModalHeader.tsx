import React from 'react';
import { ModalHeaderBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { Box, HStack } from '../../layout';
import { TextHeadline } from '../../typography';
import { IconButton } from '../../buttons';

export type ModalHeaderProps = {
  /** Handles back button press */
  onBack?: React.MouseEventHandler;
  /** Handles close button press */
  onClose?: React.MouseEventHandler;
} & ModalHeaderBaseProps;

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onBack, onClose }) => {
  if (!title && !onBack && !onClose) return null;

  return (
    <HStack spacingHorizontal={3} spacingVertical={2} alignItems="center">
      <Box flexGrow={1} flexBasis={0}>
        {!!onBack && <IconButton transparent name="backArrow" onPress={onBack} />}
      </Box>
      <Box flexGrow={1} flexBasis={0} justifyContent="center" alignItems="center">
        <TextHeadline as="span">{title}</TextHeadline>
      </Box>
      <Box flexGrow={1} flexBasis={0} justifyContent="flex-end">
        {!!onClose && <IconButton transparent name="close" onPress={onClose} />}
      </Box>
    </HStack>
  );
};
