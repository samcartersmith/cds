import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { ModalHeaderBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { Box, HStack } from '../../layout';
import { TextHeadline } from '../../typography';
import { IconButton } from '../../buttons';

type ModalHeaderProps = {
  /** Handles back button press */
  onBack?: (event: GestureResponderEvent) => void;
  /** Handles close button press */
  onClose?: (event: GestureResponderEvent) => void;
} & ModalHeaderBaseProps;

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onBack, onClose }) => {
  return (
    <HStack spacingHorizontal={3} spacingVertical={2} alignItems="center">
      <Box flexGrow={1} flexBasis={0}>
        {!!onBack && (
          <IconButton transparent name="backArrow" onPress={onBack} testID="modal-back-button" />
        )}
      </Box>
      <Box flexGrow={1} flexBasis={0} alignItems="center" justifyContent="center">
        <TextHeadline>{title}</TextHeadline>
      </Box>
      <Box flexGrow={1} flexBasis={0} alignItems="flex-end">
        {!!onClose && (
          <IconButton transparent name="close" onPress={onClose} testID="modal-close-button" />
        )}
      </Box>
    </HStack>
  );
};
