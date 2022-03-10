import React from 'react';
import { ModalHeaderBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';

import { Box, HStack } from '../../layout';
import { TextHeadline } from '../../typography';
import { IconButton } from '../../buttons';

export type ModalHeaderProps = {
  /** Handles back button press */
  onBackButtonPress?: React.MouseEventHandler;
} & Omit<ModalHeaderBaseProps, 'onRequestClose' | 'onBackButtonPress'>;

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onBackButtonPress }) => {
  const height = useInteractableHeight(true);
  const { onRequestClose, accessibilityLabelledBy, hideCloseButton, hideDividers } =
    useModalParent();

  if (!title && !onBackButtonPress && !onRequestClose) return null;

  // use empty placeholder which has the same size as IconButton to maintain horizontal position
  const emptyPlaceholder = <Box height={height} width={height} />;

  return (
    <HStack
      spacingHorizontal={3}
      spacingVertical={2}
      alignItems="center"
      borderedBottom={!hideDividers}
    >
      <Box>
        {onBackButtonPress ? (
          <IconButton
            transparent
            name="backArrow"
            onPress={onBackButtonPress}
            testID="modal-back-button"
          />
        ) : (
          emptyPlaceholder
        )}
      </Box>
      <Box flexGrow={1} justifyContent="center" alignItems="center" spacingHorizontal={2}>
        <TextHeadline as="span" align="center" id={accessibilityLabelledBy}>
          {title}
        </TextHeadline>
      </Box>
      <Box justifyContent="flex-end">
        {!hideCloseButton ? (
          <IconButton
            transparent
            name="close"
            onPress={onRequestClose}
            testID="modal-close-button"
          />
        ) : (
          emptyPlaceholder
        )}
      </Box>
    </HStack>
  );
};
