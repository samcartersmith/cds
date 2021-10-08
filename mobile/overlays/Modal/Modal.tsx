import React, { memo, forwardRef, useImperativeHandle, useEffect, useCallback } from 'react';
import { Modal as RNModal, ModalProps as RNModalProps, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common/types';

import { useModalAnimation } from './useModalAnimation';

import { VStack, Divider } from '../../layout';
import { ModalHeader } from './ModalHeader';

export type ModalProps = ModalBaseProps &
  Omit<RNModalProps, 'children' | 'visible' | 'onRequestClose'>;

export const Modal = memo(
  forwardRef<ModalRefBaseProps, React.PropsWithChildren<ModalProps>>(
    (
      { children, visible, onClose, onBack, title, hideDividers, hideCloseIcon, footer, ...props },
      ref,
    ) => {
      const [{ opacity, scale }, animateIn, animateOut] = useModalAnimation();

      useEffect(() => {
        if (visible) {
          animateIn.start();
        }
      }, [visible, animateIn]);

      const handleClose = useCallback(() => {
        animateOut.start(({ finished }) => {
          if (finished) {
            onClose();
          }
        });
      }, [onClose, animateOut]);

      useImperativeHandle(
        ref,
        () => ({
          onClose,
        }),
        [onClose],
      );

      return (
        <RNModal
          statusBarTranslucent
          hardwareAccelerated
          transparent
          animationType="none"
          visible={visible}
          onRequestClose={handleClose}
          {...props}
        >
          <VStack
            animated
            opacity={opacity}
            dangerouslySetStyle={{ transform: [{ scale }] }}
            pin="all"
            elevation={2}
          >
            <SafeAreaView style={styles.safeAreaContainer}>
              <ModalHeader
                onBack={onBack}
                title={title}
                onClose={hideCloseIcon ? undefined : handleClose}
              />
              {!hideDividers && <Divider />}
              {children}
              {!hideDividers && <Divider />}
              {footer}
            </SafeAreaView>
          </VStack>
        </RNModal>
      );
    },
  ),
);

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
});
