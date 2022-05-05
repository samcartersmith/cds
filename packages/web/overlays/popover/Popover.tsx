/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, MouseEvent, useCallback, useMemo } from 'react';
import { css } from 'linaria';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { usePopoverA11y } from '../../hooks/usePopoverA11y';
import { Box } from '../../layout/Box';
import { cx } from '../../utils/linaria';
import { FocusTrap } from '../FocusTrap';
import { Overlay } from '../Overlay/Overlay';

import { PopoverPortal } from './PopoverPortal';
import { PopoverContentPositionConfig, PopoverProps } from './PopoverProps';
import { usePopper } from './usePopper';

const subjectStyle = css`
  background-color: transparent;
  display: flex;
  cursor: default;
`;

const defaultContentPosition: PopoverContentPositionConfig = {
  gap: 0,
  skid: 0,
  placement: 'bottom',
  offsetGap: undefined,
};

const blockStyles = css`
  width: 100%;
`;

/**
 * Popover is the internal recommended base component used for any overlay that is laid out with respect to a subject.
 * It is purposely a flexible component and is reserved for CDS internal usage.
 */
export const Popover = memo(
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
    accessibilityLabel,
    testID,
    contentPosition = defaultContentPosition,
    block = false,
  }: PopoverProps) => {
    const { subject, setSubject, setPopper, popperStyles, popperAttributes } =
      usePopper(contentPosition);

    const { subjectAccessibilityProps, contentAccessibilityProps } = usePopoverA11y(
      visible,
      false,
      accessibilityLabel,
    );

    const handleClose = useCallback(async () => {
      subject?.focus(); // P3: get to refocus on subject upon close.
      onClose?.();
      onBlur?.();
    }, [onBlur, onClose, subject]);

    // swallow click events inside the Popover content so the overlay doesn't consider it a blur event
    const handleCaptureEvents = useCallback((event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    }, []);

    const memoizedContent = useMemo(
      () => (
        <div
          ref={setPopper}
          style={{
            ...popperStyles.popper,
            zIndex: zIndex.overlays.portal + zIndex.overlays.popoverMenu,
          }}
          {...popperAttributes.popper}
          onClick={handleCaptureEvents}
        >
          <FocusTrap onEscPress={handleClose}>
            {/* Box with Horizontal spacing to ensure proper margins but still rely on popper for layout. */}
            <Box background="transparent" {...contentAccessibilityProps} testID={testID}>
              {content}
            </Box>
          </FocusTrap>
        </div>
      ),
      [
        setPopper,
        popperStyles.popper,
        popperAttributes.popper,
        handleCaptureEvents,
        handleClose,
        contentAccessibilityProps,
        testID,
        content,
      ],
    );

    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={block ? blockStyles : undefined}
      >
        <div
          ref={setSubject}
          onClick={onPressSubject}
          className={cx(subjectStyle, block ? blockStyles : undefined)}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseDown={onMouseDown}
          {...subjectAccessibilityProps}
        >
          {children}
        </div>
        {visible ? (
          <PopoverPortal disablePortal={disablePortal} invertSpectrum={invertPopoverSpectrum}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: zIndex.overlays.modal,
              }}
              role="dialog"
              aria-modal="true"
              onClick={handleClose}
            >
              {showOverlay && <Overlay ref={overlayRef} />}
              {memoizedContent}
            </div>
          </PopoverPortal>
        ) : undefined}
      </div>
    );
  },
);
