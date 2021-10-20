import React, {
  memo,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Modal as RNModal, ModalProps as RNModalProps, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common/types';
import { ModalParentContext } from '@cbhq/cds-common/overlays/ModalParentContext';

import { useModalAnimation } from './useModalAnimation';
import { VStack } from '../../layout';

export type ModalProps = ModalBaseProps &
  Omit<RNModalProps, 'children' | 'visible' | 'onRequestClose'>;

export const Modal = memo(
  forwardRef<ModalRefBaseProps, React.PropsWithChildren<ModalProps>>((props, ref) => {
    const { children, visible, onRequestClose, hideDividers, hideCloseButton, ...restProps } =
      props;
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
        onRequestClose: handleClose,
      }),
      [handleClose],
    );

    const modalData = useMemo(
      () => ({ ...props, onRequestClose: handleClose }),
      [handleClose, props],
    );

    return (
      <RNModal
        statusBarTranslucent
        hardwareAccelerated
        transparent
        animationType="none"
        visible={visible}
        onRequestClose={handleClose}
        {...restProps}
      >
        <VStack
          animated
          dangerouslySetStyle={{ transform: [{ scale }], opacity, borderWidth: 0 }}
          pin="all"
          elevation={2}
        >
          <SafeAreaView style={styles.safeAreaContainer}>
            <ModalParentContext.Provider value={modalData}>{children}</ModalParentContext.Provider>
          </SafeAreaView>
        </VStack>
      </RNModal>
    );
  }),
);

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
});
