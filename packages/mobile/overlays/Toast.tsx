import React, { memo, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  ToastBaseProps,
  ToastRefBaseProps,
  ToastHandleClose,
  defaultPalette,
} from '@cbhq/cds-common';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';

import { HStack, Box } from '../layout';
import { TextHeadline } from '../typography';
import { useToastAnimation } from './useToastAnimation';
import { useToastPanResponder } from './useToastPanResponder';
import { Button } from '../buttons';
import { useSpacingScale } from '../hooks/useSpacingScale';
import { ThemeProvider } from '../system/ThemeProvider';

const toastPalette = {
  background: defaultPalette.backgroundAlternate,
} as const;

export type ToastProps = ToastBaseProps;

export const Toast: React.FC<ToastProps> = memo(
  forwardRef<ToastRefBaseProps, React.PropsWithChildren<ToastProps>>(
    ({ text, action, onWillHide, onDidHide, bottomOffset }, ref) => {
      const [{ opacity, bottom }, animateIn, animateOut] = useToastAnimation();
      const spacing = useSpacingScale();

      useEffect(() => {
        animateIn.start();
      }, [animateIn]);

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
        <ThemeProvider name="toast" scale={DEFAULT_SCALE} palette={toastPalette}>
          <ScaleProvider value={DEFAULT_SCALE}>
            <Box
              spacing={2}
              position="absolute"
              alignSelf="center"
              bottom={bottomOffset ?? spacing['2']}
              zIndex={zIndex.overlays.portal}
              maxWidth="100%"
              dangerouslySetStyle={{
                // display on android
                elevation: zIndex.overlays.portal,
              }}
            >
              <HStack
                animated
                spacingVertical={1}
                spacingStart={3}
                spacingEnd={1}
                elevation={2}
                background
                borderRadius="standard"
                alignItems="center"
                dangerouslySetStyle={{
                  opacity,
                  transform: [{ translateY: bottom }, ...panResponderAnimation],
                }}
                {...panHandlers}
              >
                {/* avoid pushing contents off screen */}
                <Box flexShrink={1} spacingEnd={2} spacingVertical={1}>
                  <TextHeadline>{text}</TextHeadline>
                </Box>
                {!!action && (
                  <Button
                    onPress={handleActionPress}
                    testID={action.testID ?? 'toast-action'}
                    compact
                    transparent
                  >
                    {action.label}
                  </Button>
                )}
              </HStack>
            </Box>
          </ScaleProvider>
        </ThemeProvider>
      );
    },
  ),
);
