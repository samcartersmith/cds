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
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@cbhq/cds-common2/overlays/OverlayContentContext';
import { zIndex } from '@cbhq/cds-common2/tokens/zIndex';
import type { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common2/types/ModalBaseProps';
import type { Position } from '@cbhq/cds-common2/types/Position';

import { useA11yLabels } from '../../hooks/useA11yLabels';
import { Box } from '../../layout';
import { VStack } from '../../layout/VStack';
import { useMotionProps } from '../../motion/useMotionProps';
import { media } from '../../styles/media';
import { FocusTrap, type FocusTrapProps } from '../FocusTrap';

import { ModalWrapper, ModalWrapperProps } from './ModalWrapper';

const modalMaxWidth = 612;
const defaultWidthStyle = { tablet: 'auto', desktop: modalMaxWidth };
const defaultMaxWidthStyle = { tablet: modalMaxWidth };

const baseStyle = css`
  position: absolute;
  top: var(--space-10);
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
  @media ${media.phone} {
    border-radius: var(--borderRadius-0);
  }
`;

const modalResponsiveStyle = css`
  @media ${media.tablet} {
    margin-right: var(--space-3);
    margin-left: var(--space-3);
  }

  @media ${media.phone} {
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

const MotionBox = motion(Box);

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
   * If `true`, the focus trap will restore focus to the previously focused element when it unmounts.
   *
   * WARNING: If you disable this, you need to ensure that focus is restored properly so it doesn't end up on the body
   * @default true
   */
  restoreFocusOnUnmount?: boolean;
} & Omit<ModalBaseProps, 'width'> &
  Omit<ModalWrapperProps, 'onOverlayPress'> &
  Pick<FocusTrapProps, 'disableFocusTrap' | 'focusTabIndexElements'>;

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
        restoreFocusOnUnmount = true,
        width,
        dangerouslyDisableResponsiveness = false,
        dangerouslySetPosition,
        shouldCloseOnEscPress = true,
        hideCloseButton,
        hideDividers,
        maxWidth,
        ...props
      },
      ref,
    ) => {
      const defaultWidth = dangerouslyDisableResponsiveness ? modalMaxWidth : defaultWidthStyle;
      const defaultMaxWidth = dangerouslyDisableResponsiveness ? undefined : defaultMaxWidthStyle;
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
        () => ({ position: dangerouslySetPosition }),
        [dangerouslySetPosition],
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
            <MotionBox
              {...motionProps}
              className={cx(baseStyle, !dangerouslyDisableResponsiveness && modalResponsiveStyle)}
              maxWidth={maxWidth ?? defaultMaxWidth}
              style={dialogStyles}
              testID="modal-dialog-motion"
              width={width ?? defaultWidth}
            >
              <FocusTrap
                disableFocusTrap={disableFocusTrap}
                focusTabIndexElements={focusTabIndexElements}
                onEscPress={shouldCloseOnEscPress ? handleClose : undefined}
                restoreFocusOnUnmount={restoreFocusOnUnmount}
              >
                <VStack
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
            </MotionBox>
          </ModalWrapper>
        </OverlayContentContext.Provider>
      );
    },
  ),
);
