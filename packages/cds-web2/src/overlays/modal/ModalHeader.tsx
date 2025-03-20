import React from 'react';
import { useModalParent } from '@cbhq/cds-common2/overlays/ModalParentContext';
import type { ModalHeaderBaseProps as SharedModalHeaderBaseProps } from '@cbhq/cds-common2/types/ModalBaseProps';

import { IconButton } from '../../buttons/IconButton';
import { Box, type BoxDefaultElement, type BoxProps } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { Text } from '../../typography/Text';

type ModalHeaderBaseProps = {
  /** Handles back button press */
  onBackButtonClick?: React.MouseEventHandler;
} & Omit<SharedModalHeaderBaseProps, 'onRequestClose'>;

export type ModalHeaderProps = ModalHeaderBaseProps & BoxProps<BoxDefaultElement>;

export const ModalHeader = ({
  alignItems = 'center',
  paddingX = 3,
  paddingY = 2,
  title,
  onBackButtonClick,
  backAccessibilityLabel,
  backAccessibilityHint,
  closeAccessibilityLabel,
  closeAccessibilityHint,
  ...props
}: ModalHeaderProps) => {
  const { onRequestClose, accessibilityLabelledBy, hideCloseButton, hideDividers } =
    useModalParent();

  if (!title && !onBackButtonClick && !onRequestClose) return null;

  return (
    <HStack
      alignItems={alignItems}
      borderedBottom={!hideDividers}
      paddingX={paddingX}
      paddingY={paddingY}
      {...props}
    >
      {!!onBackButtonClick && (
        <Box>
          <IconButton
            transparent
            accessibilityHint={backAccessibilityHint}
            accessibilityLabel={backAccessibilityLabel}
            name="backArrow"
            onClick={onBackButtonClick}
            testID="modal-back-button"
          />
        </Box>
      )}
      <Box alignItems="center" flexGrow={1} justifyContent="center" paddingX={2}>
        <Text as="h2" font="headline" id={accessibilityLabelledBy} textAlign="center">
          {title}
        </Text>
      </Box>
      {!hideCloseButton && (
        <Box justifyContent="flex-end">
          <IconButton
            transparent
            accessibilityHint={closeAccessibilityHint}
            accessibilityLabel={closeAccessibilityLabel}
            name="close"
            onClick={onRequestClose}
            testID="modal-close-button"
          />
        </Box>
      )}
    </HStack>
  );
};
