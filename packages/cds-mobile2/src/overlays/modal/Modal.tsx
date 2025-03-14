import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { usePreviousValue } from '@cbhq/cds-common2/hooks/usePreviousValue';
import { ModalParentContext } from '@cbhq/cds-common2/overlays/ModalParentContext';
import {
  type OverlayContentContextValue,
  OverlayContentContext,
} from '@cbhq/cds-common2/overlays/OverlayContentContext';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common2/types';

import { VStack } from '../../layout';

import { useModalAnimation } from './useModalAnimation';

const overlayContentContextValue: OverlayContentContextValue = {
  isModal: true,
};

export type ModalProps = Omit<ModalBaseProps, 'width'> &
  Omit<RNModalProps, 'children' | 'visible' | 'onRequestClose' | 'animationType'>;

export const Modal = memo(
  forwardRef<ModalRefBaseProps, ModalProps>((props, ref) => {
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
    const [internalVisible, setInternalVisible] = useState(visible);
    const prevVisible = usePreviousValue(visible);

    const handleClose = useCallback(() => {
      animateOut.start(({ finished }) => {
        if (finished) {
          setInternalVisible(false);
          onDidClose?.();
        }
      });
    }, [animateOut, onDidClose]);

    useEffect(() => {
      if (!prevVisible && visible) {
        animateIn.start();
        setInternalVisible(true);
      } else if (prevVisible && !visible) {
        handleClose();
      }
    }, [visible, handleClose, onRequestClose, prevVisible, animateIn]);

    useImperativeHandle(
      ref,
      () => ({
        onRequestClose,
      }),
      [onRequestClose],
    );

    const modalData = useMemo(
      () => ({
        visible,
        onRequestClose,
        hideDividers,
        hideCloseButton,
      }),
      [visible, onRequestClose, hideDividers, hideCloseButton],
    );

    const renderChildrenProps = useMemo(
      () => ({ closeModal: () => onRequestClose?.() }),
      [onRequestClose],
    );

    return (
      <OverlayContentContext.Provider value={overlayContentContextValue}>
        <RNModal
          hardwareAccelerated
          statusBarTranslucent
          transparent
          onRequestClose={onRequestClose}
          visible={internalVisible}
          {...restProps}
          // prevent animation from overridden
          animationType="none"
        >
          <VStack
            animated
            elevation={2}
            pin="all"
            style={{ transform: [{ scale }], opacity, borderWidth: 0 }}
          >
            <SafeAreaView style={styles.safeAreaContainer}>
              <ModalParentContext.Provider value={modalData}>
                {typeof children === 'function' ? children(renderChildrenProps) : children}
              </ModalParentContext.Provider>
            </SafeAreaView>
          </VStack>
        </RNModal>
      </OverlayContentContext.Provider>
    );
  }),
);

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
