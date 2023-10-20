import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
} from 'react';
import { m as motion, useAnimation } from 'framer-motion';
import { SharedAccessibilityProps, ToastBaseProps, ToastRefBaseProps } from '@cbhq/cds-common';
import {
  animateInBottomConfig,
  animateInOpacityConfig,
  animateOutBottomConfig,
  animateOutOpacityConfig,
} from '@cbhq/cds-common/animation/toast';
import { ToastContext } from '@cbhq/cds-common/overlays/ToastProvider';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';

import { Button, IconButton } from '../buttons';
import { Box, HStack } from '../layout';
import { ColorSurge } from '../motion/ColorSurge';
import { useMotionProps } from '../motion/useMotionProps';
import { ThemeProvider } from '../system';
import { spacing } from '../tokens';
import { TextHeadline } from '../typography';

import { ModalProps } from './Modal/Modal';
import { Portal } from './Portal';
import { toastContainerId } from './PortalProvider';
import { toastClassName } from './toastStyles';

export type ToastProps = {
  /**
   * Hide the close button on the right
   * @default false
   */
  hideCloseButton?: boolean;
  /**
   * Accessibility props are provided to ensure i18n
   * support for all relevant a11y props
   * @default { accessibilityLabel: "close" }
   */
  closeButtonAccessibilityProps?: SharedAccessibilityProps;
} & ToastBaseProps &
  SharedAccessibilityProps &
  Pick<ModalProps, 'disablePortal'>;

// Note: ensure any updates here are reflected in the jsdoc above
const closeButtonAccessibilityDefaults: ToastProps['closeButtonAccessibilityProps'] = {
  accessibilityLabel: 'close',
};

export const Toast = memo(
  forwardRef<ToastRefBaseProps, ToastProps>(
    (
      {
        text,
        action,
        onWillHide,
        onDidHide,
        disablePortal = false,
        hideCloseButton = false,
        testID = 'cds-toast',
        bottomOffset = spacing[4],
        closeButtonAccessibilityProps = closeButtonAccessibilityDefaults,
        variant,
        ...rest
      },
      ref,
    ) => {
      const { pauseTimer, resumeTimer } = useContext(ToastContext);
      const animationControls = useAnimation();

      const motionProps = useMotionProps({
        enterConfigs: [animateInOpacityConfig, animateInBottomConfig],
        exitConfigs: [animateOutOpacityConfig, animateOutBottomConfig],
        animate: animationControls,
        style: { bottom: bottomOffset },
      });

      useEffect(() => {
        void animationControls.start('enter');
      }, [animationControls]);

      const handleClose = useCallback(async (): Promise<boolean> => {
        onWillHide?.();
        await animationControls.start('exit');
        onDidHide?.();
        return true;
      }, [onWillHide, onDidHide, animationControls]);

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
        <Portal containerId={toastContainerId} disablePortal={disablePortal}>
          {/* toast does not respond to density as per design guideline */}
          <ThemeProvider scale={DEFAULT_SCALE}>
            <motion.div
              {...motionProps}
              className={toastClassName}
              data-testid={`${testID}-motion`}
            >
              <Box
                justifyContent="center"
                onMouseEnter={pauseTimer} // persist toast when hovering
                onMouseLeave={resumeTimer}
                role="alert"
                spacing={2}
                testID={testID}
                width="100%"
                {...rest}
              >
                <HStack
                  alignItems="center"
                  background="backgroundAlternate"
                  borderRadius="rounded"
                  elevation={2}
                  maxWidth={550}
                  overflow="hidden"
                  position="relative"
                  spacingEnd={1}
                  spacingStart={3}
                  spacingVertical={1}
                >
                  {/* avoid pushing contents off screen */}
                  <Box flexShrink={1} spacingEnd={2} spacingVertical={1}>
                    <TextHeadline as="p" tabIndex={0}>
                      {text}
                    </TextHeadline>
                  </Box>
                  <ColorSurge background={variant} />
                  <HStack>
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
                    {!hideCloseButton && (
                      <IconButton
                        transparent
                        name="close"
                        onPress={handleClose}
                        testID={`${testID}-close-button`}
                        variant="foregroundMuted"
                        {...closeButtonAccessibilityProps}
                      />
                    )}
                  </HStack>
                </HStack>
              </Box>
            </motion.div>
          </ThemeProvider>
        </Portal>
      );
    },
  ),
);
