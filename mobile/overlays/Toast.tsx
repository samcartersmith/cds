import React, { memo, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ToastBaseProps, ToastRefBaseProps, ToastHandleClose } from '@cbhq/cds-common';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { HStack, Box } from '../layout';
import { TextLabel1, Link as LinkButton } from '../typography';
import { Icon } from '../icons';
import { Pressable, ThemeProvider } from '../system';
import { useToastAnimation } from './useToastAnimation';
import { useToastPanResponder } from './useToastPanResponder';

export type ToastProps = ToastBaseProps;

export const Toast: React.FC<ToastProps> = memo(
  forwardRef<ToastRefBaseProps, React.PropsWithChildren<ToastProps>>(
    ({ text, action, onWillHide, onDidHide, hideCloseButton = false }, ref) => {
      const [{ opacity, bottom }, animateIn, animateOut] = useToastAnimation();

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

      const handleActionPress = action?.onPress;

      return (
        // toast does not react to density as per design guideline
        <ThemeProvider scale="large">
          <Box
            spacing={2}
            position="absolute"
            bottom={4}
            alignSelf="center"
            zIndex={zIndex.overlays.portal}
            maxWidth="100%"
            dangerouslySetStyle={{
              // display on android
              elevation: zIndex.overlays.portal,
            }}
          >
            <HStack
              animated
              spacingVertical={2}
              spacingHorizontal={3}
              gap={4}
              elevation={2}
              background="backgroundAlternate"
              borderRadius="standard"
              alignItems="center"
              dangerouslySetStyle={{
                opacity,
                transform: [{ translateY: bottom }, ...panResponderAnimation],
              }}
              {...panHandlers}
            >
              {/* avoid pushing contents off screen */}
              <Box flexShrink={1}>
                <TextLabel1>{text}</TextLabel1>
              </Box>
              {!!action && (
                <LinkButton
                  variant="label1"
                  onPress={handleActionPress}
                  testID={action.testID ?? 'toast-action'}
                >
                  {action.label}
                </LinkButton>
              )}
              {!hideCloseButton && (
                <Pressable
                  aria-label="toast close"
                  transparentWhileInactive
                  backgroundColor="background"
                  borderRadius="round"
                  onPress={handleClose}
                  testID="toast-close-button"
                >
                  <Icon name="close" size="s" color="secondaryForeground" />
                </Pressable>
              )}
            </HStack>
          </Box>
        </ThemeProvider>
      );
    },
  ),
);
