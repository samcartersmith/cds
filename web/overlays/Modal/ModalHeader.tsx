import React from 'react';
import { ModalHeaderBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { Box, HStack } from '../../layout';
import { TextHeadline } from '../../typography';
import { IconButton } from '../../buttons';

export type ModalHeaderProps = {
  /** Handles back button press */
  onBack?: React.MouseEventHandler;
  /** Handles close button press */
  onClose?: React.MouseEventHandler;
  accessibilityLabelledBy?: React.AriaAttributes['aria-labelledby'];
} & Omit<ModalHeaderBaseProps, 'onClose' | 'onBack'>;

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onBack,
  onClose,
  accessibilityLabelledBy,
}) => {
  const height = useInteractableHeight(true);

  if (!title && !onBack && !onClose) return null;

  // use empty placeholder which has the same size as IconButton to maintain horizontal position
  const emptyPlaceholder = <Box height={height} width={height} />;

  return (
    <HStack spacingHorizontal={3} spacingVertical={2} alignItems="center">
      <Box>
        {onBack ? (
          <IconButton transparent name="backArrow" onPress={onBack} testID="modal-back-button" />
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
        {onClose ? (
          <IconButton transparent name="close" onPress={onClose} testID="modal-close-button" />
        ) : (
          emptyPlaceholder
        )}
      </Box>
    </HStack>
  );
};
