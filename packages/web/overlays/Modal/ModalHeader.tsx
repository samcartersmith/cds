import React from 'react';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';
import { ModalHeaderBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { IconButton } from '../../buttons';
import { Box, HStack } from '../../layout';
import { OnPress } from '../../system';
import { TextHeadline } from '../../typography';

export type ModalHeaderProps = {
  /** Handles back button press */
  onBackButtonPress?: OnPress;
} & Omit<ModalHeaderBaseProps, 'onRequestClose'>;

export const ModalHeader: React.FC<React.PropsWithChildren<ModalHeaderProps>> = ({
  title,
  onBackButtonPress,
  backAccessibilityLabel,
  backAccessibilityHint,
  closeAccessibilityLabel,
  closeAccessibilityHint,
}) => {
  const height = useInteractableHeight(true);
  const { onRequestClose, accessibilityLabelledBy, hideCloseButton, hideDividers } =
    useModalParent();

  if (!title && !onBackButtonPress && !onRequestClose) return null;

  // use empty placeholder which has the same size as IconButton to maintain horizontal position
  const emptyPlaceholder = <Box height={height} width={height} />;

  return (
    <HStack
      alignItems="center"
      borderedBottom={!hideDividers}
      spacingHorizontal={3}
      spacingVertical={2}
    >
      <Box>
        {onBackButtonPress ? (
          <IconButton
            transparent
            accessibilityHint={backAccessibilityHint}
            accessibilityLabel={backAccessibilityLabel}
            name="backArrow"
            onPress={onBackButtonPress}
            testID="modal-back-button"
          />
        ) : (
          emptyPlaceholder
        )}
      </Box>
      <Box alignItems="center" flexGrow={1} justifyContent="center" spacingHorizontal={2}>
        <TextHeadline align="center" as="h2" id={accessibilityLabelledBy}>
          {title}
        </TextHeadline>
      </Box>
      <Box justifyContent="flex-end">
        {!hideCloseButton ? (
          <IconButton
            transparent
            accessibilityHint={closeAccessibilityHint}
            accessibilityLabel={closeAccessibilityLabel}
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
