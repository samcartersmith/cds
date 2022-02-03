import React, { useMemo, ReactNode, memo } from 'react';
import { css } from 'linaria';
import { usePopoverMenuAnimation } from './usePopoverMenuAnimation';
import { cx } from '../../utils/linaria';
import { usePopoverContext } from './PopoverContext';
import { usePopoverPosition } from './usePopoverPosition';
import { VStack } from '../../layout/VStack';

const popoverStyleOverrides = css`
  overflow-y: auto;
  overflow-x: hidden;
`;

const popoverMenuStaticClassName = 'cds-popover-menu';

type PopoverContentProps = { children: ReactNode };

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

  usePopoverMenuAnimation(visible, popoverMenuRef);

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
      >
        {children}
      </VStack>
    </div>
  );
});
