import React, {
  memo,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { ToastBaseProps, ToastRefBaseProps } from '@cbhq/cds-common';

import { HStack, Box } from '../layout';
import { TextLabel1, Link as LinkButton } from '../typography';
import { Icon } from '../icons';
import { Pressable, ThemeProvider } from '../system';
import { toastClassName } from './toastStyles';
import { toastContainerId } from './PortalProvider';
import { isSSR } from '../utils/browser';
import { ModalProps } from './Modal/Modal';
import { useToastAnimation } from './useToastAnimation';

export type ToastProps = ToastBaseProps & Pick<ModalProps, 'disablePortal'>;

export const Toast: React.FC<ToastProps> = memo(
  forwardRef<ToastRefBaseProps, React.PropsWithChildren<ToastProps>>(
    (
      { text, action, onWillHide, onDidHide, disablePortal = false, hideCloseButton = false },
      ref,
    ) => {
      const toastRef = useRef<HTMLElement>(null);
      const { animateIn, animateOut } = useToastAnimation(toastRef);

      useEffect(() => {
        void animateIn.start();
      }, [animateIn]);

      const handleClose = useCallback(async (): Promise<boolean> => {
        onWillHide?.();
        await animateOut.start();
        onDidHide?.();
        return true;
      }, [onWillHide, onDidHide, animateOut]);

      useImperativeHandle(
        ref,
        () => ({
          hide: handleClose,
        }),
        [handleClose],
      );

      const handleActionPress = action?.onPress;

      const toastNode = (
        // toast does not react to density as per design guideline
        <ThemeProvider scale="large">
          <Box dangerouslySetClassName={toastClassName} spacing={2} ref={toastRef}>
            <HStack
              spacingVertical={2}
              spacingHorizontal={3}
              gap={4}
              elevation={2}
              background="backgroundAlternate"
              borderRadius="standard"
              alignItems="center"
              maxWidth={550}
            >
              {/* avoid pushing contents off screen */}
              <Box flexShrink={1}>
                <TextLabel1 as="p">{text}</TextLabel1>
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

      if (disablePortal || isSSR() || !document?.getElementById(toastContainerId)) {
        return toastNode;
      }

      return createPortal(toastNode, document.getElementById(toastContainerId) as HTMLElement);
    },
  ),
);
