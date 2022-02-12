import React, {
  forwardRef,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Animated, Modal, ModalProps, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSpectrum } from '@cbhq/cds-common';
import {
  horizontalDrawerPercentageOfView,
  MAX_OVER_DRAG,
  verticalDrawerPercentageOfView,
} from '@cbhq/cds-common/animation/drawer';
import type { DrawerBaseProps, DrawerRefBaseProps } from '@cbhq/cds-common/types';
import { emptyObject } from '@cbhq/cds-utils';

import { useDrawerAnimation } from '../../animation/useDrawerAnimation';
import { useDrawerPanResponder } from '../../hooks/useDrawerPanResponder';
import { useDrawerSpacing } from '../../hooks/useDrawerSpacing';
import { Box } from '../../layout/Box';
import { HandleBar } from '../HandleBar/HandleBar';
import { Overlay } from '../Overlay/Overlay';
import { useOverlayAnimation } from '../Overlay/useOverlayAnimation';

import { DrawerStatusBar } from './DrawerStatusBar';

export type DrawerProps = DrawerBaseProps & Omit<ModalProps, 'onRequestClose' | 'children'>;

export const Drawer = memo(
  forwardRef<DrawerRefBaseProps, PropsWithChildren<DrawerProps>>(
    (
      {
        children,
        pin = 'bottom',
        onCloseComplete,
        preventDismissGestures = false,
        hideHandleBar = false,
        disableCapturePanGestureToDismiss = false,
        ...props
      },
      ref,
    ) => {
      const { width, height } = useWindowDimensions();

      const {
        drawerAnimation,
        animateDrawerOut,
        animateDrawerIn,
        drawerAnimationStyles,
        onLayout,
        hasDrawerRendered,
      } = useDrawerAnimation(pin);
      const [opacity, animateOverlayIn, animateOverlayOut] = useOverlayAnimation();
      const scheme = useSpectrum();
      const spacingStyles = useDrawerSpacing(pin);
      const isMounted = useRef(false);

      const handleCloseRequest = useCallback(() => {
        requestAnimationFrame(() => {
          Animated.parallel([animateDrawerOut, animateOverlayOut]).start(({ finished }) => {
            if (finished) {
              isMounted.current = false;
              onCloseComplete?.();
            }
          });
        });
      }, [animateDrawerOut, animateOverlayOut, onCloseComplete]);

      useEffect(() => {
        if (!isMounted.current) {
          if (hasDrawerRendered) {
            isMounted.current = true;
            drawerAnimation.flattenOffset();
            Animated.parallel([animateOverlayIn, animateDrawerIn]).start();
          }
        }
        return () => {
          isMounted.current = false;
        };
      }, [drawerAnimation, animateOverlayIn, animateDrawerIn, hasDrawerRendered]);

      const panGestureHandlers = useDrawerPanResponder({
        pin,
        drawerAnimation,
        animateDrawerIn,
        handleCloseRequest,
        disableCapturePanGestureToDismiss,
      });

      const isPinHorizontal = pin === 'left' || pin === 'right';
      const shouldShowHandleBar = !hideHandleBar && pin === 'bottom';

      // leave 15% of the screenwidth as open area for menu drawer
      const horizontalDrawerWidth = width * horizontalDrawerPercentageOfView + MAX_OVER_DRAG;
      // drawer will automatically size itself based on content, but will cap at 75% of viewport height
      const verticalDrawerMaxHeight = height * verticalDrawerPercentageOfView + MAX_OVER_DRAG;

      const handleOverlayPress = useCallback(() => {
        if (!preventDismissGestures) {
          handleCloseRequest();
        }
      }, [handleCloseRequest, preventDismissGestures]);

      const cardStyles = StyleSheet.create({
        spacing: {
          ...spacingStyles,
        },
        overflowStyles: {
          overflow: 'hidden',
        },
      });

      const combinedStyles = StyleSheet.flatten([cardStyles.spacing, drawerAnimationStyles]);

      useImperativeHandle(
        ref,
        () => ({
          handleDrawerClose: () => {
            requestAnimationFrame(() => {
              handleCloseRequest();
            });
          },
        }),
        [handleCloseRequest],
      );

      const renderChildrenProps = useMemo(
        () => ({ closeDrawer: handleCloseRequest }),
        [handleCloseRequest],
      );

      // this hack clips internal content from overflowing the borderRadius, but also make sure the handlebar still shows if handlebar is enabled
      const Content = useMemo(() => {
        return () => {
          if (shouldShowHandleBar) {
            return (
              <>
                <HandleBar />
                <Box
                  borderRadius="pill"
                  dangerouslySetStyle={shouldShowHandleBar && cardStyles.overflowStyles}
                >
                  {typeof children === 'function' ? children(renderChildrenProps) : children}
                </Box>
              </>
            );
          }
          return (
            typeof children === 'function' ? children(renderChildrenProps) : children
          ) as React.ReactElement;
        };
      }, [cardStyles.overflowStyles, children, renderChildrenProps, shouldShowHandleBar]);

      return (
        <Modal
          transparent
          onRequestClose={handleCloseRequest}
          hardwareAccelerated
          visible
          animationType="none"
          {...props}
        >
          <DrawerStatusBar pin={pin} visible />
          <Overlay opacity={opacity} onTouchStart={handleOverlayPress} />
          <Box
            {...(!preventDismissGestures ? panGestureHandlers.panHandlers : emptyObject)}
            background="background"
            borderRadius={isPinHorizontal ? 'none' : 'pill'}
            bordered={scheme === 'dark'}
            elevation={scheme === 'dark' ? 2 : 0}
            pin={pin}
            animated
            maxHeight={!isPinHorizontal ? verticalDrawerMaxHeight : '100%'}
            width={isPinHorizontal ? horizontalDrawerWidth : '100%'}
            dangerouslySetStyle={combinedStyles}
          >
            <View onLayout={onLayout}>
              <Content />
            </View>
          </Box>
        </Modal>
      );
    },
  ),
);
