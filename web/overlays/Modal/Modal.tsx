import React, {
  useMemo,
  useCallback,
  useEffect,
  useRef,
  memo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';
import { cx } from 'linaria';
import { createPortal } from 'react-dom';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { ModalParentContext } from '@cbhq/cds-common/overlays/ModalParentContext';

import { Box, VStack } from '../../layout';
import { Overlay } from '../Overlay/Overlay';
import {
  modalDefaultClassName,
  modalResponsiveClassName,
  overlayResponsiveClassName,
} from './modalStyles';
import { useScrollBlocker } from '../../hooks/useScrollBlocker';
import { useModalAnimation } from './useModalAnimation';
import { isSSR } from '../../utils/browser';
import { ThemeProvider } from '../../system';
import { modalContainerId } from '../PortalProvider';

export type ModalProps = {
  /**
   * Disable overlay click that closes the Modal
   * @default false
   */
  disableOverlayPress?: boolean;
  /**
   * Aria label for Modal
   */
  accessibilityLabel?: React.AriaAttributes['aria-label'];
  /**
   * Point to the id of the modal title
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role
   */
  accessibilityLabelledBy?: React.AriaAttributes['aria-labelledby'];
  /**
   * Disable React portal integration
   */
  disablePortal?: boolean;
} & ModalBaseProps;

export const Modal: React.FC<ModalProps> = memo(
  forwardRef<ModalRefBaseProps, React.PropsWithChildren<ModalProps>>((props, ref) => {
    const {
      children,
      visible = false,
      onRequestClose,
      disableOverlayPress = false,
      disablePortal = false,
      accessibilityLabelledBy = 'modal_title',
      accessibilityLabel = 'modal',
      zIndex: customZIndex,
    } = props;

    const blockScroll = useScrollBlocker();
    const { modalRef, overlayRef, animateIn, animateOut } = useModalAnimation();
    const isFocused = useRef(false);

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
        onRequestClose();
        isFocused.current = false;
      }
    }, [animateOut, onRequestClose]);

    // trap focus in modal for accessibility
    const handleTabKey = useCallback(
      (event: KeyboardEvent) => {
        if (!modalRef?.current || isSSR()) return;

        const focusableModalElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select',
        );

        if (focusableModalElements.length === 0) return;

        const firstElement = focusableModalElements[0] as HTMLElement;
        const lastElement = focusableModalElements[
          focusableModalElements.length - 1
        ] as HTMLElement;

        // bring focus inside modal
        if (
          !isFocused.current &&
          // check if focus is inside modal
          !Array.from(focusableModalElements).includes(document.activeElement as HTMLElement)
        ) {
          firstElement.focus();
          isFocused.current = true;
          event.preventDefault();
        }

        // tab to change focus to next element
        if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }

        // shift + tab to change to previous element
        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      },
      [modalRef],
    );

    // close modal on Escape key press for accessibility
    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          void handleClose();
        }

        if (event.key === 'Tab') {
          handleTabKey(event);
        }

        // Swallow the event, in case someone is listening on the body.
        event.stopPropagation();
      },
      [handleClose, handleTabKey],
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
        onRequestClose: handleClose,
      }),
      [handleClose],
    );

    const modalData = useMemo(
      () => ({ ...props, onRequestClose: handleClose }),
      [handleClose, props],
    );

    if (!visible) {
      return null;
    }

    const modalNode = (
      <Box
        position="fixed"
        pin="all"
        height="100vh"
        width="100vw"
        justifyContent="center"
        role="dialog"
        aria-modal="true"
        aria-labelledby={accessibilityLabelledBy}
        aria-label={accessibilityLabel}
        zIndex={customZIndex ?? zIndex.overlays.modal}
      >
        <Overlay
          onPress={disableOverlayPress ? undefined : handleClose}
          dangerouslySetClassName={cx(overlayResponsiveClassName)}
          ref={overlayRef}
          testID="modal-overlay"
        />
        <VStack
          elevation={2}
          background="background"
          dangerouslySetClassName={cx(modalDefaultClassName, modalResponsiveClassName)}
          ref={modalRef}
        >
          <ModalParentContext.Provider value={modalData}>{children}</ModalParentContext.Provider>
        </VStack>
      </Box>
    );

    if (disablePortal || isSSR() || !document?.getElementById(modalContainerId)) {
      return modalNode;
    }

    return createPortal(
      <ThemeProvider>{modalNode}</ThemeProvider>,
      document.getElementById(modalContainerId) as HTMLElement,
    );
  }),
);
