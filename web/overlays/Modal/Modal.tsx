import React, { useCallback, useEffect, memo, forwardRef, useImperativeHandle } from 'react';
import { css } from 'linaria';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';
import { borderRadius } from '@cbhq/cds-common/tokens/border';

import { Box, VStack, Divider } from '../../layout';
import { Overlay } from '../Overlay/Overlay';
import { ModalHeader } from './ModalHeader';
import { useScrollBlocker } from '../../hooks/useScrollBlocker';
import { spacing } from '../../tokens';

const contentClassName = css`
  position: absolute;
  top: ${spacing[10]};
  width: 612px;
  max-height: calc(100vh - ${spacing[10]}*2);
  border-radius: ${borderRadius.standard}px;

  @media only screen and (max-width: 660px) {
    max-height: 100vh;
    top: 0;
    bottom: 0;
    max-width: 612px;
    width: inherit;
    border-radius: 0;
  }
`;

export type ModalProps = {
  /**
   * Disable overlay click that closes the Modal
   * @default false
   */
  disableOverlayClick?: boolean;
} & ModalBaseProps;

export const Modal: React.FC<ModalProps> = memo(
  forwardRef<ModalRefBaseProps, React.PropsWithChildren<ModalProps>>(
    (
      {
        children,
        visible = false,
        onClose,
        onBack,
        title,
        hideDividers = false,
        hideCloseIcon = false,
        disableOverlayClick = false,
        footer,
        ...props
      },
      ref,
    ) => {
      const blockScroll = useScrollBlocker();
      // prevent body scroll when modal is open
      useEffect(() => {
        if (visible) {
          blockScroll(true);
        } else {
          blockScroll(false);
        }

        return () => {
          blockScroll(false);
        };
      }, [visible, blockScroll]);

      // close modal on Escape key press for accessibility
      const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
          event.preventDefault();
          if (event.key === 'Escape') {
            onClose();
          }
        },
        [onClose],
      );

      useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [handleKeyDown]);

      useImperativeHandle(
        ref,
        () => ({
          onClose,
        }),
        [onClose],
      );

      if (!visible) {
        return null;
      }

      return (
        <Box
          position="fixed"
          pin="all"
          height="100vh"
          width="100vw"
          justifyContent="center"
          role="dialog"
          aria-modal="true"
          {...props}
        >
          <Overlay onPress={disableOverlayClick ? undefined : onClose} />
          <VStack elevation={2} background="background" dangerouslySetClassName={contentClassName}>
            <ModalHeader
              onBack={onBack}
              title={title}
              onClose={hideCloseIcon ? undefined : onClose}
            />
            {!hideDividers && <Divider />}
            {children}
            {!hideDividers && <Divider />}
            {footer}
          </VStack>
        </Box>
      );
    },
  ),
);
