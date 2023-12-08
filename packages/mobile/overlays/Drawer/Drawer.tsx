import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Animated, Modal, ModalProps, StyleSheet, useWindowDimensions } from 'react-native';
import { useSpectrum } from '@cbhq/cds-common';
import { drawerAnimationDefaultDuration, MAX_OVER_DRAG } from '@cbhq/cds-common/animation/drawer';
import {
  horizontalDrawerPercentageOfView,
  verticalDrawerPercentageOfView as defaultVerticalDrawerPercentageOfView,
} from '@cbhq/cds-common/tokens/drawer';
import type { DrawerBaseProps, DrawerRefBaseProps } from '@cbhq/cds-common/types';

import { VStack } from '../../layout';
import { Box } from '../../layout/Box';
import { HandleBar } from '../HandleBar/HandleBar';
import { Overlay } from '../Overlay/Overlay';
import { useOverlayAnimation } from '../Overlay/useOverlayAnimation';

import { DrawerStatusBar } from './DrawerStatusBar';
import { useDrawerAnimation } from './useDrawerAnimation';
import { useDrawerPanResponder } from './useDrawerPanResponder';
import { useDrawerSpacing } from './useDrawerSpacing';

export type DrawerProps = DrawerBaseProps & Omit<ModalProps, 'onRequestClose' | 'children'>;

export const Drawer = memo(
  forwardRef<DrawerRefBaseProps, DrawerProps>(function Drawer(
    {
      children,
      pin = 'bottom',
      onCloseComplete,
      preventDismissGestures = false,
      hideHandleBar = false,
      disableCapturePanGestureToDismiss = false,
      onBlur,
      verticalDrawerPercentageOfView = defaultVerticalDrawerPercentageOfView,
      handleBarAccessibilityLabel,
      stickyFooter,
      ...props
    },
    ref,
  ) {
    const { width, height } = useWindowDimensions();

    const {
      drawerAnimation,
      animateDrawerOut,
      animateDrawerIn,
      drawerAnimationStyles,
      animateSwipeToClose,
    } = useDrawerAnimation(pin, verticalDrawerPercentageOfView);
    const [opacityAnimation, animateOverlayIn, animateOverlayOut] = useOverlayAnimation(
      drawerAnimationDefaultDuration,
    );
    const scheme = useSpectrum();
    const spacingStyles = useDrawerSpacing(pin);
    const isMounted = useRef(false);

    const handleClose = useCallback(() => {
      Animated.parallel([animateDrawerOut, animateOverlayOut]).start(({ finished }) => {
        if (finished) {
          isMounted.current = false;
          onCloseComplete?.();
        }
      });
    }, [animateDrawerOut, animateOverlayOut, onCloseComplete]);

    const handleSwipeToClose = useCallback(() => {
      if (!preventDismissGestures) {
        Animated.parallel([animateSwipeToClose, animateOverlayOut]).start(({ finished }) => {
          if (finished) {
            isMounted.current = false;
            onCloseComplete?.();
          }
        });
      }
    }, [preventDismissGestures, animateSwipeToClose, animateOverlayOut, onCloseComplete]);

    useEffect(() => {
      if (!isMounted.current) {
        Animated.parallel([animateOverlayIn, animateDrawerIn]).start(({ finished }) => {
          if (finished) {
            isMounted.current = true;
          }
        });
      }
    }, [drawerAnimation, animateDrawerIn, animateOverlayIn]);

    const panGestureHandlers = useDrawerPanResponder({
      pin,
      drawerAnimation,
      animateDrawerIn,
      disableCapturePanGestureToDismiss,
      onBlur,
      handleSwipeToClose,
      opacityAnimation,
      verticalDrawerPercentageOfView,
    });

    const isPinHorizontal = pin === 'left' || pin === 'right';
    const shouldShowHandleBar = !hideHandleBar && pin === 'bottom';

    // leave 15% of the screenwidth as open area for menu drawer
    const horizontalDrawerWidth = useMemo(
      () => width * horizontalDrawerPercentageOfView + MAX_OVER_DRAG,
      [width],
    );
    // drawer will automatically size itself based on content, but will cap at 75% of viewport height (can override)
    const verticalDrawerMaxHeight = useMemo(
      () => height * verticalDrawerPercentageOfView + MAX_OVER_DRAG,
      [height, verticalDrawerPercentageOfView],
    );

    const getPanGestureHandlers = !preventDismissGestures
      ? panGestureHandlers.panHandlers
      : undefined;

    const handleOverlayPress = useCallback(() => {
      if (!preventDismissGestures) {
        onBlur?.();
        handleClose();
      }
    }, [handleClose, preventDismissGestures, onBlur]);

    const cardStyles = StyleSheet.create({
      spacing: {
        ...spacingStyles,
      },
      overflowStyles: {
        overflow: 'hidden',
      },
    });

    const combinedStyles = [
      cardStyles.spacing,
      drawerAnimationStyles,
      !!stickyFooter && { paddingBottom: MAX_OVER_DRAG },
    ];

    useImperativeHandle(
      ref,
      () => ({
        handleClose,
      }),
      [handleClose],
    );

    // this hack clips internal content from overflowing the borderRadius, but also make sure the handlebar still shows if handlebar is enabled
    const content = useMemo(() => {
      if (shouldShowHandleBar) {
        return (
          <Box
            maxHeight={
              !isPinHorizontal
                ? verticalDrawerMaxHeight * defaultVerticalDrawerPercentageOfView
                : '100%'
            }
          >
            <HandleBar
              accessibilityLabel={handleBarAccessibilityLabel}
              accessibilityRole="button"
              onAccessibilityTap={handleClose}
            />
            <Box borderRadius="roundedLarge" dangerouslySetStyle={cardStyles.overflowStyles}>
              {typeof children === 'function' ? children({ handleClose }) : children}
            </Box>
          </Box>
        );
      }
      return (
        <Box maxHeight={!isPinHorizontal ? verticalDrawerMaxHeight : '100%'}>
          {typeof children === 'function' ? children({ handleClose }) : children}
        </Box>
      );
    }, [
      shouldShowHandleBar,
      children,
      handleClose,
      isPinHorizontal,
      verticalDrawerMaxHeight,
      handleBarAccessibilityLabel,
      cardStyles.overflowStyles,
    ]);

    const renderStickyFooter = useMemo(() => {
      if (pin !== 'bottom') return null;
      return typeof stickyFooter === 'function' ? stickyFooter({ handleClose }) : stickyFooter;
    }, [handleClose, pin, stickyFooter]);

    return (
      <Modal
        hardwareAccelerated
        transparent
        visible
        animationType="none"
        onRequestClose={handleClose}
        {...props}
        accessibilityRole="alert"
      >
        <DrawerStatusBar visible pin={pin} />
        <Overlay
          onTouchStart={handleOverlayPress}
          opacity={opacityAnimation}
          testID="drawer-overlay"
        />
        <Box
          {...getPanGestureHandlers}
          animated
          background="background"
          borderRadius={isPinHorizontal ? 'roundedNone' : 'roundedLarge'}
          bordered={scheme === 'dark'}
          dangerouslySetStyle={combinedStyles}
          elevation={scheme === 'dark' ? 2 : 0}
          onAccessibilityEscape={handleClose}
          pin={pin}
          // close modal when user performs the "escape" accessibility gesture
          // https://reactnative.dev/docs/accessibility#onaccessibilityescape-ios
          width={isPinHorizontal ? horizontalDrawerWidth : '100%'}
        >
          <VStack>
            {content}
            {renderStickyFooter}
          </VStack>
        </Box>
      </Modal>
    );
  }),
);
