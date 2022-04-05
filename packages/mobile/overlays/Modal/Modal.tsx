import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import { Modal as RNModal, ModalProps as RNModalProps, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToggler } from '@cbhq/cds-common';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';
import { ModalParentContext } from '@cbhq/cds-common/overlays/ModalParentContext';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common/types';

import { VStack } from '../../layout';

import { useModalAnimation } from './useModalAnimation';

export type ModalProps = ModalBaseProps &
  Omit<RNModalProps, 'children' | 'visible' | 'onRequestClose'>;

export const Modal = memo(
  forwardRef<ModalRefBaseProps, React.PropsWithChildren<ModalProps>>((props, ref) => {
    const {
      children,
      visible,
      onRequestClose,
      onDidClose,
      hideDividers,
      hideCloseButton,
      ...restProps
    } = props;
    const [{ opacity, scale }, animateIn, animateOut] = useModalAnimation();
    const [internalVisible, toggleInternalVisible] = useToggler(visible);
    const prevVisible = usePreviousValue(visible);

    const handleClose = useCallback(() => {
      animateOut.start(({ finished }) => {
        if (finished) {
          toggleInternalVisible.toggleOff();
          onDidClose?.();
        }
      });
    }, [animateOut, toggleInternalVisible, onDidClose]);

    useEffect(() => {
      if (!prevVisible && visible) {
        animateIn.start();
        toggleInternalVisible.toggleOn();
      } else if (prevVisible && !visible) {
        handleClose();
      }
    }, [toggleInternalVisible, visible, handleClose, onRequestClose, prevVisible, animateIn]);

    useImperativeHandle(
      ref,
      () => ({
        onRequestClose,
      }),
      [onRequestClose],
    );

    const modalData = useMemo(() => ({ ...props, onRequestClose }), [onRequestClose, props]);

    const renderChildrenProps = useMemo(
      () => ({ closeModal: () => onRequestClose?.() }),
      [onRequestClose],
    );

    return (
      <RNModal
        statusBarTranslucent
        hardwareAccelerated
        transparent
        animationType="none"
        visible={internalVisible}
        onRequestClose={onRequestClose}
        {...restProps}
      >
        <VStack
          animated
          dangerouslySetStyle={{ transform: [{ scale }], opacity, borderWidth: 0 }}
          pin="all"
          elevation={2}
        >
          <SafeAreaView style={styles.safeAreaContainer}>
            <ModalParentContext.Provider value={modalData}>
              {typeof children === 'function' ? children(renderChildrenProps) : children}
            </ModalParentContext.Provider>
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
