import React, { memo, ReactNode, useMemo } from 'react';
import { css } from 'linaria';

import { VStack } from '../../layout/VStack';
import { cx } from '../../utils/linaria';
import { FocusTrap } from '../FocusTrap';

import { usePopoverContext } from './PopoverContext';
import { usePopoverMenuAnimation } from './usePopoverMenuAnimation';
import { usePopoverPosition } from './usePopoverPosition';

const popoverStyleOverrides = css`
  overflow-y: auto;
  overflow-x: hidden;
`;

const popoverMenuStaticClassName = 'cds-popover-menu';

type PopoverContentProps = { children: ReactNode };

/** @deprecated */
export const PopoverContent = memo(({ children }: PopoverContentProps) => {
  const {
    setPopper,
    trigger,
    popper,
    width,
    minWidth,
    maxWidth,
    maxHeight,
    popoverMenuRef,
    controlledElementAccessibilityProps,
    popoverPositionConfig,
    visible,
    handlePopoverMenuBlur,
    handleExitMenu,
  } = usePopoverContext();
  const { popperStyles, popperAttributes } = usePopoverPosition(
    trigger,
    popper,
    popoverPositionConfig,
  );

  const convertedWidth = typeof width === 'number' ? `${width}px` : width;

  const popoverStyles: React.CSSProperties = useMemo(
    () => ({
      ...popperStyles.popper,
      width: convertedWidth,
      minWidth,
      maxWidth,
    }),
    [popperStyles, convertedWidth, minWidth, maxWidth],
  );

  usePopoverMenuAnimation(visible, popoverMenuRef, popoverPositionConfig);

  return (
    <div ref={setPopper} {...popperAttributes.popper} style={popoverStyles}>
      <VStack
        ref={popoverMenuRef}
        {...controlledElementAccessibilityProps}
        background
        elevation={2}
        width={width}
        borderRadius="popover"
        role="menu"
        maxHeight={maxHeight}
        minWidth={minWidth}
        maxWidth={maxWidth}
        dangerouslySetClassName={cx(popoverMenuStaticClassName, popoverStyleOverrides)}
        onBlur={handlePopoverMenuBlur}
      >
        {/* NOTE: this is a temp fix since we're deprecating this component but 
        FocusTrap must take a ReactElement as child and it breaks the animations 
        if I wrap the outer VStack in FocusTrap */}
        <FocusTrap onEscPress={handleExitMenu}>
          <VStack>{children}</VStack>
        </FocusTrap>
      </VStack>
    </div>
  );
});
