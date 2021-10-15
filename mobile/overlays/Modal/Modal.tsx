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
      {
        children,
        visible,
        onRequestClose,
        onBackButtonPress,
        title,
        hideDividers,
        hideCloseButton,
        footer,
        ...props
      },
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
            onRequestClose();
          }
        });
      }, [onRequestClose, animateOut]);

      useImperativeHandle(
        ref,
        () => ({
          onRequestClose,
        }),
        [onRequestClose],
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
            dangerouslySetStyle={{ transform: [{ scale }], opacity, borderWidth: 0 }}
            pin="all"
            elevation={2}
          >
            <SafeAreaView style={styles.safeAreaContainer}>
              <ModalHeader
                onBackButtonPress={onBackButtonPress}
                title={title}
                onRequestClose={hideCloseButton ? undefined : handleClose}
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
