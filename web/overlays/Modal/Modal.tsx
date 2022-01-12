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
import { createPortal } from 'react-dom';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { ModalParentContext } from '@cbhq/cds-common/overlays/ModalParentContext';
import { Position } from '@cbhq/cds-common';

import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';
import { cx } from '../../utils/linaria';
import { Box, VStack, BoxProps } from '../../layout';
import { Overlay } from '../Overlay/Overlay';
import {
  modalDefaultClassName,
  modalResponsiveClassName,
  modalOverlayDefaultClassName,
  modalOverlayResponsiveClassName,
} from './modalStyles';
import { useScrollBlocker } from '../../hooks/useScrollBlocker';
import { useModalAnimation } from './useModalAnimation';
import { isSSR } from '../../utils/browser';
import { modalContainerId } from '../PortalProvider';

export type ModalProps = {
  /**
   * Disable overlay click that closes the Modal
   * @default false
   */
  disableOverlayPress?: boolean;
  /**
   * Disable React portal integration
   */
  disablePortal?: boolean;
  /**
   * If pressing the esc key should close the modal
   * @default true
   */
  shouldCloseOnEscPress?: boolean;
  /**
   * Disable responsiveness so it maintains the same UI across different viewports.
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   * @default false
   */
  dangerouslyDisableResponsiveness?: boolean;
  /**
   * Set the position for the modal dialogue
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetPosition?: Position;
} & ModalBaseProps &
  Pick<BoxProps, 'dangerouslySetClassName'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy'>;

export const Modal = memo(
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
      dangerouslySetWidth,
      dangerouslyDisableResponsiveness = false,
      dangerouslySetPosition,
      shouldCloseOnEscPress = true,
      dangerouslySetClassName,
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
        onRequestClose?.();
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
        if (event.key === 'Escape' && shouldCloseOnEscPress) {
          void handleClose();
        }

        if (event.key === 'Tab') {
          handleTabKey(event);
        }

        // Swallow the event, in case someone is listening on the body.
        event.stopPropagation();
      },
      [handleClose, handleTabKey, shouldCloseOnEscPress],
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

    const renderChildrenProps = useMemo(() => ({ closeModal: handleClose }), [handleClose]);

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
        alignItems="center"
        role="dialog"
        aria-modal="true"
        accessibilityLabelledBy={accessibilityLabelledBy}
        accessibilityLabel={accessibilityLabel}
        zIndex={customZIndex ?? zIndex.overlays.modal}
        dangerouslySetClassName={dangerouslySetClassName}
      >
        <Overlay
          onPress={disableOverlayPress ? undefined : handleClose}
          dangerouslySetClassName={cx(
            modalOverlayDefaultClassName,
            !dangerouslyDisableResponsiveness && modalOverlayResponsiveClassName,
          )}
          ref={overlayRef}
          testID="modal-overlay"
        />
        <VStack
          elevation={2}
          background="background"
          width={dangerouslySetWidth}
          position={dangerouslySetPosition}
          dangerouslySetClassName={cx(
            modalDefaultClassName,
            !dangerouslyDisableResponsiveness && modalResponsiveClassName,
          )}
          ref={modalRef}
        >
          <ModalParentContext.Provider value={modalData}>
            {typeof children === 'function' ? children(renderChildrenProps) : children}
          </ModalParentContext.Provider>
        </VStack>
      </Box>
    );

    if (disablePortal || isSSR() || !document?.getElementById(modalContainerId)) {
      return modalNode;
    }

    return createPortal(modalNode, document.getElementById(modalContainerId) as HTMLElement);
  }),
);
