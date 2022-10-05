/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { css } from 'linaria';
import { useScale } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { useClickOutside } from '../../hooks/useClickOutside';
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
    const { subject, setSubject, setPopper, popperStyles, popperAttributes, popper } =
      usePopper(contentPosition);
    const scale = useScale();
    const invertedSpectrum = useSpectrumConditional(inverseConfig);

    const { subjectAccessibilityProps, contentAccessibilityProps } = usePopoverA11y(
      visible,
      false,
      accessibilityLabel,
    );

    const handleClose = useCallback(() => {
      subject?.focus(); // P3: get to refocus on subject upon close.
      onClose?.();
      onBlur?.();
    }, [onBlur, onClose, subject]);

    useClickOutside({ element: popper, callback: handleClose, enabled: visible });

    const memoizedContent = useMemo(
      () => (
        <div
          ref={setPopper}
          style={{
            ...popperStyles.popper,
            zIndex: zIndex.overlays.dropdown,
          }}
          {...popperAttributes.popper}
        >
          <FocusTrap onEscPress={handleClose} disableTypeFocus={disableTypeFocus}>
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
        handleClose,
        contentAccessibilityProps,
        testID,
        content,
        disableTypeFocus,
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
                  memoizedContent
                )}
              </ThemeProvider>
            </Portal>
          ) : undefined}
        </AnimatePresence>
      </div>
    );
  },
);
