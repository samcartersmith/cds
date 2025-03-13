import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle } from 'react';
import { ToastBaseProps, ToastHandleClose, ToastRefBaseProps } from '@cbhq/cds-common2';
import { zIndex } from '@cbhq/cds-common2/tokens/zIndex';

import { Button } from '../buttons';
import { useA11y } from '../hooks/useA11y';
import { useTheme } from '../hooks/useTheme';
import { Box, HStack } from '../layout';
import { ColorSurge } from '../motion/ColorSurge';
import { Text } from '../typography/Text';

import { useToastAnimation } from './useToastAnimation';
import { useToastPanResponder } from './useToastPanResponder';

export type ToastProps = ToastBaseProps;

export const Toast = memo(
  forwardRef<ToastRefBaseProps, ToastProps>(
    (
      { text, action, onWillHide, onDidHide, bottomOffset, variant, accessibilityLabel, ...rest },
      ref,
    ) => {
      const theme = useTheme();
      const [{ opacity, bottom }, animateIn, animateOut] = useToastAnimation();
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
        <Box
          alignSelf="center"
          bottom={bottomOffset ?? theme.space[2]}
          maxWidth="100%"
          padding={2}
          position="absolute"
          style={{
            // display on android
            elevation: zIndex.portal,
          }}
          zIndex={zIndex.portal}
          {...rest}
          accessibilityRole="alert"
        >
          <HStack
            animated
            bordered
            alignItems="center"
            background="bgAlternate"
            borderRadius={200}
            elevation={2}
            overflow="hidden"
            paddingEnd={1}
            paddingStart={3}
            paddingY={1}
            style={{
              opacity,
              transform: [{ translateY: bottom }, ...panResponderAnimation],
            }}
            {...panHandlers}
          >
            <ColorSurge background={variant} />
            {/* avoid pushing contents off screen */}
            <Box accessible flexShrink={1} paddingEnd={2} paddingY={1}>
              <Text font="headline">{text}</Text>
            </Box>
            {!!action && (
              <Button
                compact
                transparent
                onPress={handleActionPress}
                testID={action.testID ?? 'toast-action'}
              >
                {action.label}
              </Button>
            )}
          </HStack>
        </Box>
      );
    },
  ),
);
