import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { useToggler } from '@cbhq/cds-common';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';
import { ModalParentContext } from '@cbhq/cds-common/overlays/ModalParentContext';
import {
  type OverlayContentContextValue,
  OverlayContentContext,
} from '@cbhq/cds-common/overlays/OverlayContentContext';
import { ModalBaseProps, ModalRefBaseProps } from '@cbhq/cds-common/types';

import { VStack } from '../../layout';

import { useModalAnimation } from './useModalAnimation';

const overlayContentContextValue: OverlayContentContextValue = {
  isModal: true,
};

export type ModalProps = ModalBaseProps &
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
