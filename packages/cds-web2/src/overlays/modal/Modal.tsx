import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import { m as motion } from 'framer-motion';
import {
  animateInOpacityConfig,
  animateInScaleConfig,
  animateOutOpacityConfig,
  animateOutScaleConfig,
} from '@cbhq/cds-common2/animation/modal';
import { ModalParentContext } from '@cbhq/cds-common2/overlays/ModalParentContext';
import {
  type OverlayContentContextValue,
  OverlayContentContext,
} from '@cbhq/cds-common2/overlays/OverlayContentContext';
import { zIndex } from '@cbhq/cds-common2/tokens/zIndex';
import type { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common2/types/ModalBaseProps';
import type { Position } from '@cbhq/cds-common2/types/Position';

import { useA11yLabels } from '../../hooks/useA11yLabels';
import { VStack } from '../../layout/VStack';
import { useMotionProps } from '../../motion/useMotionProps';
import { breakpoints, media } from '../../styles/media';
import { FocusTrap } from '../FocusTrap';

import { ModalWrapper, ModalWrapperProps } from './ModalWrapper';

const baseStyle = css`
  position: absolute;
  top: var(--space-10);
  width: 612px;
  max-height: calc(100vh - var(--space-10) * 2);
  @supports (height: 100dvh) {
    max-height: calc(100dvh - var(--space-10) * 2);
  }
  display: flex;
  justify-content: center;
  /* this makes sure modal dialogue displays on top of overlay */
  z-index: ${zIndex.modal};
`;

const modalDialogResponsiveStyle = css`
  @media ${media.phonePortrait} {
    border-radius: var(--borderRadius-0);
  }
`;

const modalResponsiveStyle = css`
  max-height: 100vh;
  @supports (max-height: 100dvh) {
    max-height: 100dvh;
  }
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin-right: 0;
  margin-left: 0;
  width: auto;

  @media (min-width: ${breakpoints.phoneLandscape}px) {
    max-width: 612px;
    margin-right: var(--space-3);
    margin-left: var(--space-3);
    top: var(--space-10);
    bottom: initial;
    right: initial;
    left: initial;
    max-height: calc(100vh - var(--space-10) * 2);
    @supports (height: 100dvh) {
      max-height: calc(100dvh - var(--space-10) * 2);
    }
  }

  @media (min-width: ${breakpoints.tabletLandscape}px) {
    width: 612px;
    margin-left: initial;
    margin-right: initial;
  }
`;

const overlayContentContextValue: OverlayContentContextValue = {
  isModal: true,
};

export type ModalProps = {
  /**
   * If pressing the esc key should close the modal
   * @default true
   */
  shouldCloseOnEscPress?: boolean;
  /**
   * Set the position for the modal dialogue
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetPosition?: Position;
  /**
   * Set disableFocusTrap to disable keyboard listeners responsible for focus trap behavior
   * This can be useful for scenarios like Yubikey 2fa
   * @default false
   */
  disableFocusTrap?: boolean;
  /**
   * Allow any element with `tabIndex` attribute to be focusable in FocusTrap, rather than only focusing specific interactive element types like button.
   * This can be useful when having long content in a Modal.
   * @default false
   */
  focusTabIndexElements?: boolean;
} & ModalBaseProps &
  Omit<ModalWrapperProps, 'onOverlayPress'>;

export const Modal = memo(
  forwardRef<ModalRefBaseProps, ModalProps>(
    (
      {
        children,
        visible = false,
        onRequestClose,
        disableOverlayPress = false,
        disablePortal = false,
        disableFocusTrap,
        accessibilityLabelledBy,
        accessibilityLabel,
        focusTabIndexElements = false,
        width,
        dangerouslyDisableResponsiveness = false,
        dangerouslySetPosition,
        shouldCloseOnEscPress = true,
        hideCloseButton,
        hideDividers,
        ...props
      },
      ref,
    ) => {
      const { labelledBySource, labelledBy, label } = useA11yLabels({
        accessibilityLabelledBy,
        accessibilityLabel,
      });

      const motionProps = useMotionProps({
        enterConfigs: [animateInOpacityConfig, animateInScaleConfig],
        exitConfigs: [animateOutOpacityConfig, animateOutScaleConfig],
        exit: 'exit',
      });

      const handleClose = useCallback(() => {
        onRequestClose?.();
      }, [onRequestClose]);

      useImperativeHandle(
        ref,
        () => ({
          onRequestClose: handleClose,
        }),
        [handleClose],
      );

      const modalData = useMemo(
        () => ({
          visible,
          onRequestClose: handleClose,
          accessibilityLabelledBy: labelledBySource,
          hideCloseButton,
          hideDividers,
        }),
        [visible, handleClose, labelledBySource, hideCloseButton, hideDividers],
      );

      // TODO: remove render props as we no longer need the method to close modal
      const renderChildrenProps = useMemo(() => ({ closeModal: handleClose }), [handleClose]);

      const dialogStyles = useMemo<React.CSSProperties>(
        () => ({ position: dangerouslySetPosition, width }),
        [dangerouslySetPosition, width],
      );

      return (
        <OverlayContentContext.Provider value={overlayContentContextValue}>
          <ModalWrapper
            accessibilityLabel={label}
            accessibilityLabelledBy={labelledBy}
            dangerouslyDisableResponsiveness={dangerouslyDisableResponsiveness}
            disableOverlayPress={disableOverlayPress}
            disablePortal={disablePortal}
            onOverlayPress={handleClose}
            visible={visible}
            {...props}
          >
            <motion.div
              {...motionProps}
              className={cx(baseStyle, !dangerouslyDisableResponsiveness && modalResponsiveStyle)}
              data-testid="modal-dialog-motion"
              style={dialogStyles}
            >
              <FocusTrap
                disableFocusTrap={disableFocusTrap}
                focusTabIndexElements={focusTabIndexElements}
                onEscPress={shouldCloseOnEscPress ? handleClose : undefined}
              >
                <VStack
                  background="bg"
                  borderRadius={200}
                  className={cx(!dangerouslyDisableResponsiveness && modalDialogResponsiveStyle)}
                  elevation={2}
                  overflow="hidden"
                  width="100%"
                >
                  <ModalParentContext.Provider value={modalData}>
                    {typeof children === 'function' ? children(renderChildrenProps) : children}
                  </ModalParentContext.Provider>
                </VStack>
              </FocusTrap>
            </motion.div>
          </ModalWrapper>
        </OverlayContentContext.Provider>
      );
    },
  ),
);
