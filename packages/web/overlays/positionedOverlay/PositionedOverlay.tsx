/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useCallback } from 'react';
import { css } from 'linaria';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Box } from '../../layout/Box';
import { Overlay } from '../Overlay/Overlay';

import { PositionedOverlayPortal } from './PositionedOverlayPortal';
import { PositionedOverlayProps } from './PositionedOverlayProps';
import { useKeyboardNavigatablePortal } from './useKeyboardNavigatablePortal';
import { usePopper } from './usePopper';

const subjectStyle = css`
  background-color: transparent;
  display: inline-block;
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
    onClickSubject,
    onClose,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onMouseDown,
    invertPopoverSpectrum,
    visible,
    placement = 'bottom',
  }: PositionedOverlayProps) => {
    const { popper, subject, setSubject, setPopper, popperStyles, popperAttributes } = usePopper({
      placement,
    });

    const handleClose = useCallback(() => {
      subject?.focus(); // P3: get to refocus on subject upon close.
      onClose?.();
    }, [onClose, subject]);

    useKeyboardNavigatablePortal({ portalContent: popper, handleClose });

    return (
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div
          ref={setSubject}
          onClick={onClickSubject}
          className={subjectStyle}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseDown={onMouseDown}
        >
          {children}
        </div>
        {visible ? (
          <PositionedOverlayPortal
            disablePortal={disablePortal}
            invertSpectrum={invertPopoverSpectrum}
          >
            {showOverlay && <Overlay onPress={handleClose} />}
            <div ref={setPopper} style={popperStyles.popper} {...popperAttributes.popper}>
              {/* Box with Horizontal spacing to ensure proper margins but still rely on popper for layout. */}
              <Box background="transparent" spacingHorizontal={gutter}>
                {content}
              </Box>
            </div>
          </PositionedOverlayPortal>
        ) : undefined}
      </div>
    );
  },
);
