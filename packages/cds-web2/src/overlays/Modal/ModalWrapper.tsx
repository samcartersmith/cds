import React, { forwardRef, memo, useEffect } from 'react';
import { css, cx } from '@linaria/core';

import { NewAnimatePresence } from '../../animation/NewAnimatePresence';
import { useScrollBlocker } from '../../hooks/useScrollBlocker';
import { type BoxProps, Box } from '../../layout/Box';
import { media } from '../../styles/media';
import { useTheme } from '../../system/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import { Portal, PortalProps } from '../Portal';
import { modalContainerId } from '../PortalProvider';

const modalOverlayResponsiveStyle = css`
  @media ${media.phonePortrait} {
    display: none;
  }
`;

export type ModalWrapperBaseProps = {
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
  onOverlayPress?: (() => void) | undefined;
  /**
   * Configure if the overlay should be visible/hidden
   * @default false
   */
  hideOverlay?: boolean;
  /**
   * WAI-ARIA Roles
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
   */
  role?: Extract<React.AriaRole, 'dialog' | 'alertdialog'>;
  /**
   * Controls visibility of the Modal
   * @default false
   */
  visible: boolean;
  /**
   * Callback fired after the component is closed.
   */
  onDidClose?: () => void;
} & Pick<PortalProps, 'disablePortal'>;

export type ModalWrapperProps = ModalWrapperBaseProps & BoxProps<'div'>;

export const ModalWrapper = memo(
  forwardRef(
    (
      {
        alignItems = 'center',
        'aria-modal': ariaModal,
        children,
        visible = false,
        disablePortal = false,
        disableOverlayPress = false,
        dangerouslyDisableResponsiveness = false,
        height = '100vh',
        justifyContent = 'center',
        position = 'fixed',
        top = 0,
        bottom = 0,
        left = 0,
        right = 0,
        onOverlayPress,
        onDidClose,
        hideOverlay = false,
        role = 'dialog',
        width = '100vw',
        ...props
      }: ModalWrapperProps,
      ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const theme = useTheme();
      const blockScroll = useScrollBlocker();

      // prevent body scroll when modal is open
      useEffect(() => {
        blockScroll(visible);

        return () => {
          blockScroll(false);
        };
      }, [visible, blockScroll]);

      return (
        <NewAnimatePresence onExitComplete={onDidClose}>
          {!!visible && (
            <Portal containerId={modalContainerId} disablePortal={disablePortal} theme={theme}>
              <Box
                ref={ref}
                alignItems={alignItems}
                aria-modal={ariaModal ?? 'true'}
                bottom={bottom}
                height={height}
                justifyContent={justifyContent}
                left={left}
                position={position}
                right={right}
                role={role}
                top={top}
                width={width}
                {...props}
              >
                <>
                  {!hideOverlay && (
                    <Overlay
                      animated
                      className={cx(
                        !dangerouslyDisableResponsiveness && modalOverlayResponsiveStyle,
                      )}
                      onPress={!disableOverlayPress ? onOverlayPress : undefined}
                      testID="modal-overlay"
                    />
                  )}
                  {/* NOTE: Add position or zIndex to children to avoid displaying under overlay
                   * https://www.freecodecamp.org/news/z-index-explained-how-to-stack-elements-using-css-7c5aa0f179b3/
                   */}
                  {children}
                </>
              </Box>
            </Portal>
          )}
        </NewAnimatePresence>
      );
    },
  ),
);
