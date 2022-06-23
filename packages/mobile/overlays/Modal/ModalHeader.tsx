import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';
import { ModalHeaderBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { IconButton } from '../../buttons';
import { Box, HStack } from '../../layout';
import { TextHeadline } from '../../typography';

type ModalHeaderProps = {
  /** Handles back button press */
  onBackButtonPress?: (event: GestureResponderEvent) => void;
} & ModalHeaderBaseProps;

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onBackButtonPress }) => {
  const { onRequestClose, hideCloseButton, hideDividers } = useModalParent();

  return (
    <HStack
      spacingHorizontal={3}
      spacingVertical={2}
      alignItems="center"
      borderedBottom={!hideDividers}
    >
      <Box flexGrow={1} flexBasis={0}>
        {!!onBackButtonPress && (
          <IconButton
            transparent
            name="backArrow"
            onPress={onBackButtonPress}
            testID="modal-back-button"
          />
        )}
      </Box>
      <Box flexGrow={6} flexBasis={0} alignItems="center" justifyContent="center">
        <TextHeadline align="center">{title}</TextHeadline>
      </Box>
      <Box flexGrow={1} flexBasis={0} alignItems="flex-end">
        {!hideCloseButton && (
          <IconButton
            transparent
            name="close"
            onPress={onRequestClose}
            testID="modal-close-button"
          />
        )}
      </Box>
    </HStack>
  );
};
