/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { memo, useCallback, useMemo } from 'react';
import { css, cx } from '@linaria/core';

import { NewAnimatePresence } from '../../animation/NewAnimatePresence';
import { Box } from '../../layout/Box';
import { zIndex } from '../../styles/styles';
import { useTheme } from '../../system/ThemeProvider';
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
  strategy: undefined,
};

const blockStyles = css`
  width: 100%;
`;

const zIndexStyle = css`
  z-index: calc(var(--zIndex-portal) + var(--zIndex-modal));
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
    onPressSubject,
    onClose,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onMouseDown,
    // TO DO: Add workaround support for invertedSpectrum, or consumer will need to apply inverted spectrum styles separately for the content
    // invertPopoverSpectrum,
    visible,
    accessibilityLabel = 'popoverMenu',
    testID,
    contentPosition = defaultContentPosition,
    block = false,
    disabled,
    disableFocusTrap,
    disableAutoFocus = false,
    disableTypeFocus = false,
    focusTabIndexElements,
    respectNegativeTabIndex,
    autoFocusDelay,
    controlledElementAccessibilityProps,
  }: PopoverProps) => {
    const theme = useTheme();
    const { setSubject, setPopper, popperStyles, popperAttributes } = usePopper(contentPosition);

    // We use this to infer that hover events are triggering the mounting/dismounting of the content
    const hasHoverInteractions = !!onMouseEnter && !!onMouseLeave && !onPressSubject;
    const shouldShowContent = visible && !disabled;

    const handleClose = useCallback(async () => {
      onClose?.();
      onBlur?.();
    }, [onBlur, onClose]);

    // swallow click events inside the Popover content so the overlay doesn't consider it a blur event
    const handleCaptureEvents = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    }, []);

    const memoizedContent = useMemo(
      () => (
        <div
          ref={setPopper}
          className={zIndex.dropdown}
          style={{
            ...popperStyles.popper,
          }}
          {...popperAttributes.popper}
          onClick={handleCaptureEvents}
        >
          <FocusTrap
            autoFocusDelay={autoFocusDelay}
            disableAutoFocus={disableAutoFocus}
            disableFocusTrap={disableFocusTrap}
            disableTypeFocus={disableTypeFocus}
            focusTabIndexElements={focusTabIndexElements}
            onEscPress={handleClose}
            respectNegativeTabIndex={respectNegativeTabIndex}
          >
            {/* Box with Horizontal padding to ensure proper margins but still rely on popper for layout. */}
            <Box
              background="transparent"
              data-testid={testID}
              {...controlledElementAccessibilityProps}
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
        testID,
        content,
        controlledElementAccessibilityProps,
        disableFocusTrap,
        disableAutoFocus,
        disableTypeFocus,
        focusTabIndexElements,
        respectNegativeTabIndex,
        autoFocusDelay,
      ],
    );

    const renderContent = hasHoverInteractions ? (
      memoizedContent
    ) : (
      <Box
        aria-label={accessibilityLabel}
        aria-modal="true"
        bottom={0}
        className={zIndexStyle}
        left={0}
        onClick={handleClose}
        position="fixed"
        right={0}
        role="dialog"
        top={0}
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
          className={cx(subjectStyle, block && blockStyles)}
          onBlur={onBlur}
          onClick={disabled ? undefined : onPressSubject}
          onFocus={disabled ? undefined : onFocus}
          onMouseDown={disabled ? undefined : onMouseDown}
        >
          {children}
        </div>
        <NewAnimatePresence>
          {shouldShowContent ? (
            <Portal containerId={tooltipContainerId} disablePortal={disablePortal} theme={theme}>
              {showOverlay ? (
                <Box bottom={0} className={zIndexStyle} left={0} position="fixed" right={0} top={0}>
                  <Overlay animated onPress={handleClose} />
                  {memoizedContent}
                </Box>
              ) : (
                renderContent
              )}
            </Portal>
          ) : undefined}
        </NewAnimatePresence>
      </div>
    );
  },
);
