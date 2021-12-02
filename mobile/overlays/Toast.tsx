import React, { memo, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ToastBaseProps, ToastRefBaseProps } from '@cbhq/cds-common';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { HStack, Box } from '../layout';
import { TextHeadline } from '../typography';
import { Icon } from '../icons';
import { Pressable } from '../system';
import { useToastAnimation } from './useToastAnimation';

export type ToastProps = ToastBaseProps;

export const Toast: React.FC<ToastProps> = memo(
  forwardRef<ToastRefBaseProps, React.PropsWithChildren<ToastProps>>(
    ({ text, action, onWillHide, onDidHide, hideCloseButton = false }, ref) => {
      const [{ opacity, bottom }, animateIn, animateOut] = useToastAnimation();

      useEffect(() => {
        animateIn.start();
      }, [animateIn]);

      const handleClose = useCallback(async (): Promise<boolean> => {
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

      useImperativeHandle(
        ref,
        () => ({
          hide: handleClose,
        }),
        [handleClose],
      );

      return (
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
              transform: [{ translateY: bottom }],
            }}
          >
            {/* avoid pushing contents off screen */}
            <Box flexShrink={1}>
              <TextHeadline>{text}</TextHeadline>
            </Box>
            {action}
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
      );
    },
  ),
);
