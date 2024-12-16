import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import { motion } from 'framer-motion';
import {
  animateInOpacityConfig,
  animateInScaleConfig,
  animateOutOpacityConfig,
  animateOutScaleConfig,
} from '@cbhq/cds-common/animation/modal';
import { ModalParentContext } from '@cbhq/cds-common/overlays/ModalParentContext';
import {
  type OverlayContentContextValue,
  OverlayContentContext,
} from '@cbhq/cds-common/overlays/OverlayContentContext';
import { ModalRefBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';
import type { Position } from '@cbhq/cds-common/types/Position';

import { useA11yLabels } from '../../hooks/useA11yLabels';
import { type BoxProps } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { useMotionProps } from '../../motion/useMotionProps';
import { breakpoints, media } from '../../styles/media';
import { getStyles } from '../../styles/styleProps';
import { FocusTrap } from '../FocusTrap';

import { ModalWrapper, ModalWrapperProps } from './ModalWrapper';

const baseStyle = css`
  position: absolute;
  top: var(--space-10);
  width: 612px;
  max-height: calc(100vh - var(--space-10) * 2);
  max-height: calc(100dvh - var(--space-10) * 2);
  display: flex;
  justify-content: center;
  /* this makes sure modal dialogue displays on top of overlay */
  z-index: var(--zIndex-modal);
`;

const modalDialogResponsiveStyle = css`
  @media ${media.phonePortrait} {
    border-radius: var(--borderRadius-0);
  }
`;

const modalResponsiveStyle = css`
  @media (max-width: ${breakpoints.tabletLandscape - 1}px) {
    max-width: 612px;
    width: auto;
    margin-right: var(--space-3);
    margin-left: var(--space-3);
  }

  @media ${media.phonePortrait} {
    max-height: 100vh;
    max-height: 100dvh;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin-right: 0;
    margin-left: 0;
  }
`;

const overlayContentContextValue: OverlayContentContextValue = {
  isModal: true,
};

export type ModalBaseProps = {
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
  /** Component to render as the Modal content */
  children: React.FC<{ closeModal: () => void }> | NonNullable<React.ReactNode>;
  /**
   * Callback function fired when modal is closed.
   */
  onRequestClose: () => void;
  /**
   * Hide top and bottom dividers inside Modal body
   * @default false
   */
  hideDividers?: boolean;
  /**
   * Hide the close icon on the top right
   * @default false
   */
  hideCloseButton?: boolean;
} & Omit<ModalWrapperProps, 'onOverlayPress' | 'children'>;

export type ModalProps = ModalBaseProps & Omit<BoxProps<'div'>, 'children'>;

export const Modal = memo(
  forwardRef(
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
      }: ModalProps,
      ref: React.ForwardedRef<ModalRefBaseProps>,
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

      const dialogStyles = useMemo(
        () => getStyles({ width, position: dangerouslySetPosition }),
        [width, dangerouslySetPosition],
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
              className={cx(
                baseStyle,
                !dangerouslyDisableResponsiveness && modalResponsiveStyle,
                dialogStyles.className,
              )}
              data-testid="modal-dialog-motion"
              style={dialogStyles.style}
            >
              <FocusTrap
                disableFocusTrap={disableFocusTrap}
                focusTabIndexElements={focusTabIndexElements}
                onEscPress={shouldCloseOnEscPress ? handleClose : undefined}
              >
                <VStack
                  background="background"
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
