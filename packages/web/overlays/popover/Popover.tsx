/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, MouseEvent, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { css } from 'linaria';
import { useScale } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { usePopoverA11y } from '../../hooks/usePopoverA11y';
import { Box } from '../../layout/Box';
import { ThemeProvider } from '../../system';
import { cx } from '../../utils/linaria';
import { FocusTrap } from '../FocusTrap';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal';
import { tooltipContainerId } from '../PortalProvider';

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

const inverseConfig = { light: 'dark', dark: 'light' } as const;

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
    disableTypeFocus = false,
  }: PopoverProps) => {
    const { subject, setSubject, setPopper, popperStyles, popperAttributes } =
      usePopper(contentPosition);
    const scale = useScale();
    const invertedSpectrum = useSpectrumConditional(inverseConfig);

    const { subjectAccessibilityProps, contentAccessibilityProps } = usePopoverA11y(
      visible,
      false,
      accessibilityLabel,
    );

    // We use this to infer that hover events are triggering the mounting/dismounting of the content
    const hasHoverInteractions = !!onMouseEnter && !!onMouseLeave && !onPressSubject;

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
            zIndex: zIndex.overlays.dropdown,
          }}
          {...popperAttributes.popper}
          onClick={handleCaptureEvents}
        >
          <FocusTrap onEscPress={handleClose} disableTypeFocus={disableTypeFocus}>
            {/* Box with Horizontal spacing to ensure proper margins but still rely on popper for layout. */}
            <Box
              dangerouslySetBackground="transparent"
              {...contentAccessibilityProps}
              testID={testID}
            >
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
        disableTypeFocus,
      ],
    );

    const renderContent = hasHoverInteractions ? (
      memoizedContent
    ) : (
      <Box
        position="fixed"
        pin="all"
        zIndex={zIndex.overlays.portal + zIndex.overlays.modal}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
      >
        {memoizedContent}
      </Box>
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
        <AnimatePresence>
          {visible ? (
            <Portal disablePortal={disablePortal} containerId={tooltipContainerId}>
              <ThemeProvider
                scale={scale}
                spectrum={invertPopoverSpectrum ? invertedSpectrum : null}
              >
                {showOverlay ? (
                  <Box
                    position="fixed"
                    pin="all"
                    zIndex={zIndex.overlays.portal + zIndex.overlays.modal}
                  >
                    <Overlay onPress={handleClose} animated />
                    {memoizedContent}
                  </Box>
                ) : (
                  renderContent
                )}
              </ThemeProvider>
            </Portal>
          ) : undefined}
        </AnimatePresence>
      </div>
    );
  },
);
