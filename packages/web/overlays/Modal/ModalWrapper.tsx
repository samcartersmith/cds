import React, { ForwardedRef, forwardRef, memo, useEffect } from 'react';
import { AnimatePresence, m as motion, Target } from 'framer-motion';
import {
  animateInOpacityConfig as animateInOverlayOpacityConfig,
  animateOutOpacityConfig as animateOutOverlayOpacityConfig,
} from '@cbhq/cds-common/animation/overlay';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { ModalBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';

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

  onOverlayPress: (() => void) | undefined;
} & Pick<PortalProps, 'disablePortal'> &
  Pick<ModalBaseProps, 'visible' | 'zIndex' | 'children'> &
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
      <AnimatePresence>
        {visible && (
          <Portal disablePortal={disablePortal} containerId={modalContainerId}>
            <Box
              position="fixed"
              pin="all"
              height="100vh"
              width="100vw"
              justifyContent="center"
              alignItems="center"
              role="dialog"
              aria-modal="true"
              accessibilityLabelledBy={accessibilityLabelledBy}
              accessibilityLabel={accessibilityLabel}
              id={id}
              zIndex={customZIndex ?? zIndex.overlays.modal}
              dangerouslySetClassName={dangerouslySetClassName}
              ref={ref}
            >
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
                    !dangerouslyDisableResponsiveness ? modalOverlayResponsiveClassName : undefined
                  }
                  testID="modal-overlay"
                />
              </motion.div>
              {children}
            </Box>
          </Portal>
        )}
      </AnimatePresence>
    );
  }),
);
