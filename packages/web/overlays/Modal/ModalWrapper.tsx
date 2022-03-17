import React, { ForwardedRef, forwardRef, memo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { ModalBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';

import { useScrollBlocker } from '../../hooks/useScrollBlocker';
import { Box, BoxProps } from '../../layout';
import { Portal, PortalProps } from '../Portal';
import { modalContainerId } from '../PortalProvider';

export type ModalWrapperProps = Pick<PortalProps, 'disablePortal'> &
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
              {children}
            </Box>
          </Portal>
        )}
      </AnimatePresence>
    );
  }),
);
