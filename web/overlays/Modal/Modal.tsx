import React, { useCallback, useEffect, memo, forwardRef, useImperativeHandle } from 'react';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';
import { cx } from 'linaria';

import { Box, VStack, Divider } from '../../layout';
import { Overlay } from '../Overlay/Overlay';
import { ModalHeader } from './ModalHeader';
import {
  modalDefaultClassName,
  modalResponsiveClassName,
  overlayResponsiveClassName,
} from './modalStyles';
import { useScrollBlocker } from '../../hooks/useScrollBlocker';
import { useModalAnimation } from './useModalAnimation';

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
      const { modalRef, overlayRef, animateIn, animateOut } = useModalAnimation();

      useEffect(() => {
        if (visible) {
          void animateIn();
        }
      }, [visible, animateIn]);

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

      const handleClose = useCallback(async () => {
        // unmount after animations finished
        const finished = await animateOut();
        if (finished) {
          onClose();
        }
      }, [animateOut, onClose]);

      // close modal on Escape key press for accessibility
      const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
          event.preventDefault();
          if (event.key === 'Escape') {
            void handleClose();
          }
        },
        [handleClose],
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
          onClose: handleClose,
        }),
        [handleClose],
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
          <Overlay
            onPress={disableOverlayClick ? undefined : handleClose}
            dangerouslySetClassName={cx(overlayResponsiveClassName)}
            ref={overlayRef}
          />
          <VStack
            elevation={2}
            background="background"
            dangerouslySetClassName={cx(modalDefaultClassName, modalResponsiveClassName)}
            ref={modalRef}
          >
            <ModalHeader
              onBack={onBack}
              title={title}
              onClose={hideCloseIcon ? undefined : handleClose}
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
