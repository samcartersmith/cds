/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useCallback, useMemo } from 'react';
import { css } from 'linaria';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { useA11yControlledVisibility } from '../../hooks/useA11yControlledVisibility';
import { Box } from '../../layout/Box';
import { FocusTrap } from '../FocusTrap';
import { Overlay } from '../Overlay/Overlay';

import { PositionedOverlayPortal } from './PositionedOverlayPortal';
import { PositionedOverlayProps } from './PositionedOverlayProps';
import { usePopper } from './usePopper';

const subjectStyle = css`
  background-color: transparent;
  display: flex;
  cursor: default;
`;

/**
 * PositionedOverlay is the internal recommended base component used for any overlay that is laid out with respect to a subject.
 * It is purposely a flexible component and is reserved for CDS internal usage.
 */
export const PositionedOverlay = memo(
  ({
    content,
    children,
    disablePortal,
    showOverlay = false,
    overlayRef,
    onPressSubject,
    onClose,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onMouseDown,
    invertPopoverSpectrum,
    visible,
    placement = 'bottom',
    skid,
    gap,
  }: PositionedOverlayProps) => {
    const { subject, setSubject, setPopper, popperStyles, popperAttributes } = usePopper({
      placement,
      skid,
      gap,
    });

    const { triggerAccessibilityProps, controlledElementAccessibilityProps } =
      useA11yControlledVisibility(visible);

    const handleClose = useCallback(async () => {
      subject?.focus(); // P3: get to refocus on subject upon close.
      onClose?.();
    }, [onClose, subject]);

    const memoizedContent = useMemo(
      () => (
        <div ref={setPopper} style={popperStyles.popper} {...popperAttributes.popper}>
          <FocusTrap onEscPress={handleClose}>
            {/* Box with Horizontal spacing to ensure proper margins but still rely on popper for layout. */}
            <Box
              background="transparent"
              spacingHorizontal={gutter}
              {...controlledElementAccessibilityProps}
            >
              {content}
            </Box>
          </FocusTrap>
        </div>
      ),
      [
        content,
        controlledElementAccessibilityProps,
        popperAttributes.popper,
        popperStyles.popper,
        setPopper,
        handleClose,
      ],
    );

    return (
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div
          ref={setSubject}
          onClick={onPressSubject}
          className={subjectStyle}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseDown={onMouseDown}
          {...triggerAccessibilityProps}
        >
          {children}
        </div>
        {visible ? (
          <PositionedOverlayPortal
            disablePortal={disablePortal}
            invertSpectrum={invertPopoverSpectrum}
          >
            {showOverlay ? (
              <Box
                pin="all"
                zIndex={zIndex.overlays.modal}
                height="100vh"
                width="100vw"
                position="fixed"
                role="dialog"
                aria-modal="true"
              >
                <Overlay ref={overlayRef} onPress={handleClose} />
                {memoizedContent}
              </Box>
            ) : (
              memoizedContent
            )}
          </PositionedOverlayPortal>
        ) : undefined}
      </div>
    );
  },
);
