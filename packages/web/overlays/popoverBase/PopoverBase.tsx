/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useCallback } from 'react';
import { css } from 'linaria';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Box } from '../../layout/Box';
import { Overlay } from '../Overlay/Overlay';

import { PopoverBasePortal } from './PopoverBasePortal';
import { PopoverBaseProps } from './PopoverBaseProps';
import { useCDSPopper } from './useCDSPopper';
import { useKeyboardNavigatablePortal } from './useKeyboardNavigatablePortal';

const subjectStyle = css`
  background-color: transparent;
  display: inline-block;
  cursor: default;
`;

export const PopoverBase = memo(
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
  }: PopoverBaseProps) => {
    const { popper, subject, setSubject, setPopper, popperStyles, popperAttributes } = useCDSPopper(
      {
        placement,
      },
    );

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
          <PopoverBasePortal disablePortal={disablePortal} invertSpectrum={invertPopoverSpectrum}>
            {showOverlay && <Overlay onPress={handleClose} />}
            <div ref={setPopper} style={popperStyles.popper} {...popperAttributes.popper}>
              {/* Box with Horizontal spacing to ensure proper margins but still rely on popper for layout. */}
              <Box background="transparent" spacingHorizontal={gutter}>
                {content}
              </Box>
            </div>
          </PopoverBasePortal>
        ) : undefined}
      </div>
    );
  },
);
