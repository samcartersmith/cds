import React, { memo, forwardRef, useImperativeHandle } from 'react';
import { Modal as RNModal, ModalProps as RNModalProps, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common';

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
          onRequestClose={onClose}
          {...props}
        >
          <VStack pin="all" elevation={2}>
            <SafeAreaView style={styles.safeAreaContainer}>
              <ModalHeader
                onBack={onBack}
                title={title}
                onClose={hideCloseIcon ? undefined : onClose}
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
