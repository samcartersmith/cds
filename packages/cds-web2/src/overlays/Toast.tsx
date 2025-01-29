import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
} from 'react';
import { css } from '@linaria/core';
import { motion, useAnimation } from 'framer-motion';
import { SharedAccessibilityProps, ToastBaseProps, ToastRefBaseProps } from '@cbhq/cds-common2';
import {
  animateInBottomConfig,
  animateInOpacityConfig,
  animateOutBottomConfig,
  animateOutOpacityConfig,
} from '@cbhq/cds-common2/animation/toast';
import { ToastContext } from '@cbhq/cds-common2/overlays/ToastProvider';

import { Button, IconButton } from '../buttons';
import { type BoxProps, Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { ColorSurge } from '../motion/ColorSurge';
import { useMotionProps } from '../motion/useMotionProps';
import { Text } from '../text/Text';

import { ModalProps } from './modal/Modal';
import { Portal } from './Portal';
import { toastContainerId } from './PortalProvider';

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
  Pick<ModalProps, 'disablePortal'> &
  Omit<BoxProps<'div'>, 'children'>;

// Note: ensure any updates here are reflected in the jsdoc above
const closeButtonAccessibilityDefaults: ToastProps['closeButtonAccessibilityProps'] = {
  accessibilityLabel: 'close',
};

export const baseStyle = css`
  position: fixed;
  left: 0;
  width: 100%;
`;

export const toastTestId = 'cds-toast';

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
        testID = toastTestId,
        bottomOffset = 'var(--space-4)',
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
          <motion.div {...motionProps} className={baseStyle} data-testid={`${testID}-motion`}>
            <Box
              justifyContent="center"
              onMouseEnter={pauseTimer} // persist toast when hovering
              onMouseLeave={resumeTimer}
              padding={2}
              role="alert"
              testID={testID}
              width="100%"
              {...rest}
            >
              <HStack
                alignItems="center"
                background="backgroundAlternate"
                borderRadius={200}
                elevation={2}
                maxWidth={550}
                overflow="hidden"
                paddingLeft={3}
                paddingRight={1}
                paddingY={1}
                position="relative"
              >
                {/* avoid pushing contents off screen */}
                <Box flexShrink={1} paddingRight={2} paddingY={1}>
                  <Text as="p" font="headline" tabIndex={0}>
                    {text}
                  </Text>
                </Box>
                <ColorSurge background={variant} />
                <HStack>
                  {!!action && (
                    <Button
                      compact
                      transparent
                      onClick={handleActionPress}
                      testID={action.testID ?? 'toast-action'}
                    >
                      {action.label}
                    </Button>
                  )}
                  {!hideCloseButton && (
                    <IconButton
                      transparent
                      name="close"
                      onClick={handleClose}
                      testID={`${testID}-close-button`}
                      variant="foregroundMuted"
                      {...closeButtonAccessibilityProps}
                    />
                  )}
                </HStack>
              </HStack>
            </Box>
          </motion.div>
        </Portal>
      );
    },
  ),
);
