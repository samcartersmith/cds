import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle } from 'react';
import {
  defaultPalette,
  ToastBaseProps,
  ToastHandleClose,
  ToastRefBaseProps,
} from '@cbhq/cds-common';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { Button } from '../buttons';
import { useA11y } from '../hooks/useA11y';
import { useSpacingScale } from '../hooks/useSpacingScale';
import { Box, HStack } from '../layout';
import { ColorSurge } from '../motion/ColorSurge';
import { ThemeProvider } from '../system/ThemeProvider';
import { TextHeadline } from '../typography';

import { useToastAnimation } from './useToastAnimation';
import { useToastPanResponder } from './useToastPanResponder';

const toastPalette = {
  background: defaultPalette.backgroundAlternate,
} as const;

const toastActionPalette = {
  light: { transparent: ['gray0', 0] },
  dark: { transparent: ['gray5', 0] },
} as const;

export type ToastProps = ToastBaseProps;

export const Toast = memo(
  forwardRef<ToastRefBaseProps, ToastProps>(
    (
      { text, action, onWillHide, onDidHide, bottomOffset, variant, accessibilityLabel, ...rest },
      ref,
    ) => {
      const [{ opacity, bottom }, animateIn, animateOut] = useToastAnimation();
      const spacing = useSpacingScale();
      const { announceForA11y } = useA11y();
      const defaultA11yLabel = text + (action ? action.label : '');

      useEffect(() => {
        animateIn.start(({ finished }) => {
          if (finished) {
            // announce toast copy and action label to screen reader
            announceForA11y(accessibilityLabel ?? defaultA11yLabel);
          }
        });
      }, [animateIn, text, action, accessibilityLabel, defaultA11yLabel, announceForA11y]);

      const handleClose: ToastHandleClose = useCallback(async () => {
        onWillHide?.();

        return new Promise((resolve) => {
          animateOut.start(({ finished }) => {
            if (finished) {
              onDidHide?.();
              resolve(finished);
            }
          });
        });
      }, [onWillHide, onDidHide, animateOut]);

      const { panHandlers, panResponderAnimation } = useToastPanResponder({
        onWillHide,
        onDidHide,
      });

      useImperativeHandle(
        ref,
        () => ({
          hide: handleClose,
        }),
        [handleClose],
      );

      const handleActionPress = useCallback(() => {
        action?.onPress();
        void handleClose();
      }, [action, handleClose]);

      return (
        <ThemeProvider name="toast" palette={toastPalette} scale={DEFAULT_SCALE}>
          <ScaleProvider value={DEFAULT_SCALE}>
            <Box
              alignSelf="center"
              bottom={bottomOffset ?? spacing[2]}
              dangerouslySetStyle={{
                // display on android
                elevation: zIndex.overlays.portal,
              }}
              maxWidth="100%"
              position="absolute"
              spacing={2}
              zIndex={zIndex.overlays.portal}
              {...rest}
              accessibilityRole="alert"
            >
              <HStack
                animated
                background
                alignItems="center"
                borderRadius="rounded"
                dangerouslySetStyle={{
                  opacity,
                  transform: [{ translateY: bottom }, ...panResponderAnimation],
                }}
                elevation={2}
                overflow="hidden"
                spacingEnd={1}
                spacingStart={3}
                spacingVertical={1}
                {...panHandlers}
              >
                <ColorSurge background={variant} />
                {/* avoid pushing contents off screen */}
                <Box accessible flexShrink={1} spacingEnd={2} spacingVertical={1}>
                  <TextHeadline>{text}</TextHeadline>
                </Box>
                {!!action && (
                  // TODO: remove once fixed globally on mobile
                  <ThemeProvider name="toastAction" palette={toastActionPalette}>
                    <Button
                      compact
                      transparent
                      onPress={handleActionPress}
                      testID={action.testID ?? 'toast-action'}
                    >
                      {action.label}
                    </Button>
                  </ThemeProvider>
                )}
              </HStack>
            </Box>
          </ScaleProvider>
        </ThemeProvider>
      );
    },
  ),
);
