// to do: check styles once IconButton is available
import React from 'react';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';
import { ModalHeaderBaseProps as SharedModalHeaderBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { IconButton } from '../../buttons/IconButton';
import type { PolymorphicBoxProps } from '../../layout/Box';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { Text } from '../../text/Text';

type ModalHeaderBaseProps = {
  /** Handles back button press */
  onBackButtonPress?: React.MouseEventHandler;
} & Omit<SharedModalHeaderBaseProps, 'onRequestClose'>;

export type ModalHeaderProps<AsComponent extends React.ElementType> = PolymorphicBoxProps<
  AsComponent,
  ModalHeaderBaseProps
>;

export const ModalHeader = <AsComponent extends React.ElementType = 'div'>({
  alignItems = 'center',
  paddingX = 3,
  paddingY = 2,
  title,
  onBackButtonPress,
  backAccessibilityLabel,
  backAccessibilityHint,
  closeAccessibilityLabel,
  closeAccessibilityHint,
  ...props
}: ModalHeaderProps<AsComponent>) => {
  const { onRequestClose, accessibilityLabelledBy, hideCloseButton, hideDividers } =
    useModalParent();

  if (!title && !onBackButtonPress && !onRequestClose) return null;

  return (
    <HStack
      alignItems={alignItems}
      borderedBottom={!hideDividers}
      paddingX={paddingX}
      paddingY={paddingY}
      {...props}
    >
      {onBackButtonPress && (
        <Box>
          <IconButton
            transparent
            accessibilityHint={backAccessibilityHint}
            accessibilityLabel={backAccessibilityLabel}
            name="backArrow"
            onClick={onBackButtonPress}
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
