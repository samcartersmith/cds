import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo } from 'react';
import { m as motion } from 'framer-motion';
import { CSSProperties } from 'linaria';
import { Position } from '@cbhq/cds-common';
import {
  animateInOpacityConfig,
  animateInScaleConfig,
  animateOutOpacityConfig,
  animateOutScaleConfig,
} from '@cbhq/cds-common/animation/modal';
import { ModalParentContext } from '@cbhq/cds-common/overlays/ModalParentContext';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { useA11yLabels } from '../../hooks/useA11yLabels';
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
  /**
   * Set disableFocusTrap to disable keyboard listeners responsible for focus trap behavior
   * This can be useful for scenarios like Yubikey 2fa
   * @default false
   */
  disableFocusTrap?: boolean;
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
      disableFocusTrap,
      accessibilityLabelledBy,
      accessibilityLabel,
      zIndex: customZIndex,
      width,
      dangerouslyDisableResponsiveness = false,
      dangerouslySetPosition,
      shouldCloseOnEscPress = true,
      className,
      id,
      testID,
      role,
      hideCloseButton,
      hideDividers,
    } = props;

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

    const dialogStyles = useMemo(() => {
      const styles: CSSProperties = {};

      if (width) {
        styles.width = width;
      }

      if (dangerouslySetPosition) {
        styles.position = dangerouslySetPosition;
      }

      return styles;
    }, [dangerouslySetPosition, width]);

    return (
      <ModalWrapper
        accessibilityLabel={label}
        accessibilityLabelledBy={labelledBy}
        className={className}
        dangerouslyDisableResponsiveness={dangerouslyDisableResponsiveness}
        disableOverlayPress={disableOverlayPress}
        disablePortal={disablePortal}
        id={id}
        onDidClose={onDidClose}
        onOverlayPress={handleClose}
        role={role}
        testID={testID}
        visible={visible}
        zIndex={customZIndex}
      >
        <motion.div
          {...motionProps}
          className={cx(
            modalDefaultClassName,
            !dangerouslyDisableResponsiveness && modalResponsiveClassName,
          )}
          data-testid="modal-dialog-motion"
          style={dialogStyles}
        >
          <FocusTrap
            disableFocusTrap={disableFocusTrap}
            onEscPress={shouldCloseOnEscPress ? handleClose : undefined}
          >
            <VStack
              background="background"
              className={cx(
                modalDialogClassName,
                !dangerouslyDisableResponsiveness && modalDialogResponsiveClassName,
              )}
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
    );
  }),
);
