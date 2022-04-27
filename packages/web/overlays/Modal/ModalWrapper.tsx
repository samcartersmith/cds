import React, { AriaRole, ForwardedRef, forwardRef, memo, useEffect } from 'react';
import { AnimatePresence, m as motion, Target } from 'framer-motion';
import {
  animateInOpacityConfig as animateInOverlayOpacityConfig,
  animateOutOpacityConfig as animateOutOverlayOpacityConfig,
} from '@cbhq/cds-common/animation/overlay';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { ModalBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';

import { NoopFn } from '../..';
import { Animated } from '../../animation/Animated';
import { useScrollBlocker } from '../../hooks/useScrollBlocker';
import { Box, BoxProps } from '../../layout';
import { Overlay } from '../Overlay/Overlay';
import { Portal, PortalProps } from '../Portal';
import { modalContainerId } from '../PortalProvider';

import { modalOverlayResponsiveClassName } from './modalStyles';

export type ModalWrapperProps = {
  /**
   * Disable overlay click that closes the Modal
   * @default false
   */
  disableOverlayPress?: boolean;
  /**
   * Disable responsiveness so it maintains the same UI across different viewports.
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   * @default false
   */
  dangerouslyDisableResponsiveness?: boolean;
  /**
   * Callback function fired when the overlay is pressed.
   */
  onOverlayPress?: NoopFn | undefined;
  /**
   * Configure if the overlay should be visible/hidden
   * @default false
   */
  hideOverlay?: boolean;
  /**
   * WAI-ARIA Roles
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
   */
  role?: Extract<AriaRole, 'dialog' | 'alertdialog'>;
} & Pick<PortalProps, 'disablePortal'> &
  Pick<ModalBaseProps, 'visible' | 'zIndex' | 'children' | 'onDidClose' | 'testID'> &
  Pick<BoxProps, 'dangerouslySetClassName'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy' | 'id'>;

export const ModalWrapper = memo(
  forwardRef((props: ModalWrapperProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      children,
      visible = false,
      disablePortal = false,
      accessibilityLabelledBy = 'modal_title',
      accessibilityLabel = 'modal',
      zIndex: customZIndex,
      dangerouslySetClassName,
      id,
      disableOverlayPress = false,
      dangerouslyDisableResponsiveness = false,
      onOverlayPress,
      onDidClose,
      hideOverlay = false,
      testID,
      role = 'dialog',
    } = props;

    const blockScroll = useScrollBlocker();

    // prevent body scroll when modal is open
    useEffect(() => {
      blockScroll(visible);

      return () => {
        blockScroll(false);
      };
    }, [visible, blockScroll]);

    return (
      <AnimatePresence onExitComplete={onDidClose}>
        {visible && (
          <Portal disablePortal={disablePortal} containerId={modalContainerId}>
            <Box
              position="fixed"
              pin="all"
              height="100vh"
              width="100vw"
              justifyContent="center"
              alignItems="center"
              role={role}
              aria-modal="true"
              accessibilityLabelledBy={accessibilityLabelledBy}
              accessibilityLabel={accessibilityLabel}
              id={id}
              zIndex={customZIndex ?? zIndex.overlays.modal}
              dangerouslySetClassName={dangerouslySetClassName}
              testID={testID}
              ref={ref}
            >
              {!hideOverlay && (
                <motion.div
                  initial={
                    Animated.toFramerTransition([animateOutOverlayOpacityConfig], {
                      propertiesOnly: true,
                    }) as Target
                  }
                  animate={Animated.toFramerTransition([animateInOverlayOpacityConfig])}
                  exit={Animated.toFramerTransition([animateOutOverlayOpacityConfig])}
                >
                  <Overlay
                    onPress={disableOverlayPress ? undefined : onOverlayPress}
                    dangerouslySetClassName={
                      !dangerouslyDisableResponsiveness
                        ? modalOverlayResponsiveClassName
                        : undefined
                    }
                    testID="modal-overlay"
                  />
                </motion.div>
              )}
              {/* NOTE: Add position or zIndex to children to avoid displaying under overlay
               * https://www.freecodecamp.org/news/z-index-explained-how-to-stack-elements-using-css-7c5aa0f179b3/
               */}
              {children}
            </Box>
          </Portal>
        )}
      </AnimatePresence>
    );
  }),
);
