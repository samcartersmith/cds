import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo } from 'react';
import { m as motion, Target } from 'framer-motion';
import { Position } from '@cbhq/cds-common';
import {
  animateInOpacityConfig,
  animateInScaleConfig,
  animateOutOpacityConfig,
  animateOutScaleConfig,
} from '@cbhq/cds-common/animation/modal';
import { ModalParentContext } from '@cbhq/cds-common/overlays/ModalParentContext';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { Animated } from '../../animation/Animated';
import { VStack } from '../../layout';
import { cx } from '../../utils/linaria';
import { FocusTrap } from '../FocusTrap';

import { modalDefaultClassName, modalResponsiveClassName } from './modalStyles';
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
    } = props;

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
      () => ({ ...props, onRequestClose: handleClose }),
      [handleClose, props],
    );

    // TODO: remove render props as we no longer need the method to close modal
    const renderChildrenProps = useMemo(() => ({ closeModal: handleClose }), [handleClose]);

    const dialogStyles = useMemo(
      () => ({
        position: dangerouslySetPosition,
      }),
      [dangerouslySetPosition],
    );

    const dialogTransformTemplate = useCallback(({ scale }) => `scale(${scale})`, []);

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
      >
        <motion.div
          initial={
            Animated.toFramerTransition([animateOutOpacityConfig, animateOutScaleConfig], {
              propertiesOnly: true,
            }) as Target
          }
          animate={Animated.toFramerTransition([animateInOpacityConfig, animateInScaleConfig])}
          exit={Animated.toFramerTransition([animateOutOpacityConfig, animateOutScaleConfig])}
          transformTemplate={dialogTransformTemplate}
          className={cx(
            modalDefaultClassName,
            !dangerouslyDisableResponsiveness && modalResponsiveClassName,
          )}
          style={dialogStyles}
        >
          <FocusTrap onEscPress={shouldCloseOnEscPress ? handleClose : undefined}>
            <VStack
              elevation={2}
              background="background"
              width={dangerouslySetWidth ?? '100%'}
              overflow="hidden"
              borderRadius="standard"
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
