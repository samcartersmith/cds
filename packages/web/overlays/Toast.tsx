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

export const Toast: React.FC<ToastProps> = memo(
  forwardRef<ToastRefBaseProps, React.PropsWithChildren<ToastProps>>(
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
        <Portal disablePortal={disablePortal} containerId={toastContainerId}>
          {/* toast does not respond to density as per design guideline */}
          <ThemeProvider scale={DEFAULT_SCALE}>
            <motion.div
              {...motionProps}
              className={toastClassName}
              data-testid={`${testID}-motion`}
            >
              <Box
                width="100%"
                justifyContent="center"
                spacing={2}
                // persist toast when hovering
                onMouseEnter={pauseTimer}
                onMouseLeave={resumeTimer}
                role="alert"
                testID={testID}
                {...rest}
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
                  position="relative"
                  overflow="hidden"
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
                        testID={`${testID}-close-button`}
                        transparent
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
