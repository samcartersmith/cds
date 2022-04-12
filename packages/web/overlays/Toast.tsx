import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { ToastBaseProps, ToastRefBaseProps } from '@cbhq/cds-common';
import { ToastContext } from '@cbhq/cds-common/overlays/ToastProvider';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';

import { Button, IconButton } from '../buttons';
import { Box, HStack } from '../layout';
import { ThemeProvider } from '../system';
import { TextHeadline } from '../typography';
import { getBrowserGlobals, isSSR } from '../utils/browser';

import { ModalProps } from './Modal/Modal';
import { toastContainerId } from './PortalProvider';
import { toastClassName } from './toastStyles';
import { useToastAnimation } from './useToastAnimation';

export type ToastProps = {
  /**
   * Hide the close button on the right
   * @default false
   */
  hideCloseButton?: boolean;
} & ToastBaseProps &
  Pick<ModalProps, 'disablePortal'>;

export const Toast: React.FC<ToastProps> = memo(
  forwardRef<ToastRefBaseProps, React.PropsWithChildren<ToastProps>>(
    (
      { text, action, onWillHide, onDidHide, disablePortal = false, hideCloseButton = false },
      ref,
    ) => {
      const toastRef = useRef<HTMLElement>(null);
      const { animateIn, animateOut } = useToastAnimation(toastRef);
      const { pauseTimer, resumeTimer } = useContext(ToastContext);

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

      const handleActionPress = useCallback(() => {
        action?.onPress();
        void handleClose();
      }, [action, handleClose]);

      const toastNode = (
        // toast does not react to density as per design guideline
        <ThemeProvider scale={DEFAULT_SCALE}>
          <Box
            dangerouslySetClassName={toastClassName}
            spacing={2}
            ref={toastRef}
            // persist toast when hovering
            onMouseEnter={pauseTimer}
            onMouseLeave={resumeTimer}
          >
            <HStack
              spacingVertical={1}
              spacingStart={3}
              spacingEnd={1}
              elevation={2}
              background="backgroundAlternate"
              borderRadius="standard"
              alignItems="center"
              maxWidth={550}
            >
              {/* avoid pushing contents off screen */}
              <Box flexShrink={1} spacingEnd={2} spacingVertical={1} role="alert">
                <TextHeadline as="p" tabIndex={0}>
                  {text}
                </TextHeadline>
              </Box>
              <HStack>
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
                {!hideCloseButton && (
                  <IconButton
                    name="close"
                    variant="foregroundMuted"
                    onPress={handleClose}
                    testID="toast-close-button"
                    transparent
                  />
                )}
              </HStack>
            </HStack>
          </Box>
        </ThemeProvider>
      );

      const document = getBrowserGlobals()?.document;
      if (disablePortal || isSSR() || !document?.getElementById(toastContainerId)) {
        return toastNode;
      }

      return createPortal(toastNode, document?.getElementById(toastContainerId) as HTMLElement);
    },
  ),
);
