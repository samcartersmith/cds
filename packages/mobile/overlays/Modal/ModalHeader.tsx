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

export const ModalHeader: React.FC<React.PropsWithChildren<ModalHeaderProps>> = ({
  title,
  onBackButtonPress,
  backAccessibilityLabel,
  backAccessibilityHint,
  closeAccessibilityLabel,
  closeAccessibilityHint,
}) => {
  const { onRequestClose, hideCloseButton, hideDividers } = useModalParent();

  return (
    <HStack
      alignItems="center"
      borderedBottom={!hideDividers}
      spacingHorizontal={3}
      spacingVertical={2}
    >
      <Box flexBasis={0} flexGrow={1}>
        {!!onBackButtonPress && (
          <IconButton
            transparent
            accessibilityHint={backAccessibilityHint}
            accessibilityLabel={backAccessibilityLabel}
            name="backArrow"
            onPress={onBackButtonPress}
            testID="modal-back-button"
          />
        )}
      </Box>
      <Box alignItems="center" flexBasis={0} flexGrow={6} justifyContent="center">
        <TextHeadline align="center">{title}</TextHeadline>
      </Box>
      <Box alignItems="flex-end" flexBasis={0} flexGrow={1}>
        {!hideCloseButton && (
          <IconButton
            transparent
            accessibilityHint={closeAccessibilityHint}
            accessibilityLabel={closeAccessibilityLabel}
            name="close"
            onPress={onRequestClose}
            testID="modal-close-button"
          />
        )}
      </Box>
    </HStack>
  );
};
