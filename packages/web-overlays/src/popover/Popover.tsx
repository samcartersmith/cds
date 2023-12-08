/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, MouseEvent, useCallback, useMemo } from 'react';
import { css } from 'linaria';
import { useScale } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { NewAnimatePresence } from '@cbhq/cds-web/animation/NewAnimatePresence';
import { usePopoverA11y } from '@cbhq/cds-web/hooks/usePopoverA11y';
import { Box } from '@cbhq/cds-web/layout/Box';
import { FocusTrap } from '@cbhq/cds-web/overlays/FocusTrap';
import { Overlay } from '@cbhq/cds-web/overlays/Overlay/Overlay';
import { Portal } from '@cbhq/cds-web/overlays/Portal';
import { tooltipContainerId } from '@cbhq/cds-web/overlays/PortalProvider';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { cx } from '@cbhq/cds-web/utils/linaria';

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
    accessibilityLabel = 'popoverMenu',
    testID,
    contentPosition = defaultContentPosition,
    block = false,
    disableTypeFocus = false,
    disabled,
  }: PopoverProps) => {
    const { setSubject, setPopper, popperStyles, popperAttributes } = usePopper(contentPosition);
    const scale = useScale();
    const invertedSpectrum = useSpectrumConditional(inverseConfig);

    const { subjectAccessibilityProps, contentAccessibilityProps } = usePopoverA11y(
      visible,
      false,
      accessibilityLabel,
    );

    // We use this to infer that hover events are triggering the mounting/dismounting of the content
    const hasHoverInteractions = !!onMouseEnter && !!onMouseLeave && !onPressSubject;
    const shouldShowContent = visible && !disabled;

    const handleClose = useCallback(async () => {
      onClose?.();
      onBlur?.();
    }, [onBlur, onClose]);

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
          <FocusTrap disableTypeFocus={disableTypeFocus} onEscPress={handleClose}>
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
        disableTypeFocus,
        contentAccessibilityProps,
        testID,
        content,
      ],
    );

    const renderContent = hasHoverInteractions ? (
      memoizedContent
    ) : (
      <Box
        accessibilityLabel={accessibilityLabel}
        aria-modal="true"
        onClick={handleClose}
        pin="all"
        position="fixed"
        role="dialog"
        zIndex={zIndex.overlays.portal + zIndex.overlays.modal}
      >
        {memoizedContent}
      </Box>
    );

    return (
      <div
        className={block ? blockStyles : undefined}
        onMouseEnter={disabled ? undefined : onMouseEnter}
        onMouseLeave={disabled ? undefined : onMouseLeave}
      >
        <div
          ref={setSubject}
          className={cx(subjectStyle, block ? blockStyles : undefined)}
          onBlur={onBlur}
          onClick={disabled ? undefined : onPressSubject}
          onFocus={disabled ? undefined : onFocus}
          onMouseDown={disabled ? undefined : onMouseDown}
          {...subjectAccessibilityProps}
        >
          {children}
        </div>
        <NewAnimatePresence>
          {shouldShowContent ? (
            <Portal containerId={tooltipContainerId} disablePortal={disablePortal}>
              <ThemeProvider
                scale={scale}
                spectrum={invertPopoverSpectrum ? invertedSpectrum : null}
              >
                {showOverlay ? (
                  <Box
                    pin="all"
                    position="fixed"
                    zIndex={zIndex.overlays.portal + zIndex.overlays.modal}
                  >
                    <Overlay animated onPress={handleClose} />
                    {memoizedContent}
                  </Box>
                ) : (
                  renderContent
                )}
              </ThemeProvider>
            </Portal>
          ) : undefined}
        </NewAnimatePresence>
      </div>
    );
  },
);
