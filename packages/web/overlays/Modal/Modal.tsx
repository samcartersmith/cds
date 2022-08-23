import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo } from 'react';
import { m as motion } from 'framer-motion';
import { Position } from '@cbhq/cds-common';
import {
  animateInOpacityConfig,
  animateInScaleConfig,
  animateOutOpacityConfig,
  animateOutScaleConfig,
} from '@cbhq/cds-common/animation/modal';
import { ModalParentContext } from '@cbhq/cds-common/overlays/ModalParentContext';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { VStack } from '../../layout';
import { useMotionProps } from '../../motion/useMotionProps';
import { cx } from '../../utils/linaria';
import { FocusTrap } from '../FocusTrap';

import {
  modalDefaultClassName,
  modalDialogClassName,
  modalDialogResponsiveClassName,
  modalResponsiveClassName,
} from './modalStyles';
import { ModalWrapper, ModalWrapperProps } from './ModalWrapper';

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
} & ModalBaseProps &
  Omit<ModalWrapperProps, 'onOverlayPress'>;

export const Modal = memo(
  forwardRef<ModalRefBaseProps, React.PropsWithChildren<ModalProps>>((props, ref) => {
    const {
      children,
      visible = false,
      onRequestClose,
      onDidClose,
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
      id,
      testID,
      role,
      hideCloseButton,
      hideDividers,
    } = props;

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
        accessibilityLabelledBy,
        hideCloseButton,
        hideDividers,
      }),
      [visible, handleClose, accessibilityLabelledBy, hideCloseButton, hideDividers],
    );

    // TODO: remove render props as we no longer need the method to close modal
    const renderChildrenProps = useMemo(() => ({ closeModal: handleClose }), [handleClose]);

    const dialogStyles = useMemo(
      () => ({
        position: dangerouslySetPosition,
      }),
      [dangerouslySetPosition],
    );

    return (
      <ModalWrapper
        visible={visible}
        disablePortal={disablePortal}
        accessibilityLabelledBy={accessibilityLabelledBy}
        accessibilityLabel={accessibilityLabel}
        zIndex={customZIndex}
        dangerouslySetClassName={dangerouslySetClassName}
        id={id}
        disableOverlayPress={disableOverlayPress}
        dangerouslyDisableResponsiveness={dangerouslyDisableResponsiveness}
        onOverlayPress={handleClose}
        onDidClose={onDidClose}
        testID={testID}
        role={role}
      >
        <motion.div
          {...motionProps}
          className={cx(
            modalDefaultClassName,
            !dangerouslyDisableResponsiveness && modalResponsiveClassName,
          )}
          style={dialogStyles}
          data-testid="modal-dialog-motion"
        >
          <FocusTrap onEscPress={shouldCloseOnEscPress ? handleClose : undefined}>
            <VStack
              elevation={2}
              background="background"
              width={dangerouslySetWidth ?? '100%'}
              overflow="hidden"
              dangerouslySetClassName={cx(
                modalDialogClassName,
                !dangerouslyDisableResponsiveness && modalDialogResponsiveClassName,
              )}
            >
              <ModalParentContext.Provider value={modalData}>
                {typeof children === 'function' ? children(renderChildrenProps) : children}
              </ModalParentContext.Provider>
            </VStack>
          </FocusTrap>
        </motion.div>
      </ModalWrapper>
    );
  }),
);
