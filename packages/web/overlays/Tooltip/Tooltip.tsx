import React, { cloneElement, useCallback, useMemo, useRef } from 'react';

import { Popover } from '../popover/Popover';

import { TooltipContent } from './TooltipContent';
import { TooltipProps } from './TooltipProps';
import { useTooltipState } from './useTooltipState';

const preventMouseDown = (event: React.MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

export const Tooltip = ({
  children,
  content,
  placement = 'top',
  gap = 1,
  disablePortal,
  testID,
  zIndex,
  tooltipId: tooltipIdDefault,
  visible,
}: TooltipProps) => {
  const { isOpen, handleOnMouseEnter, handleOnMouseLeave, handleOnFocus, handleOnBlur, tooltipId } =
    useTooltipState(tooltipIdDefault);
  const tooltipContentRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = useCallback(
    ({ target }: React.MouseEvent) => {
      const node = tooltipContentRef.current;

      // to prevent flicker, don't open tooltip if enter event originates from tooltip content
      if (target instanceof Node && node?.parentNode !== target && !node?.contains(target)) {
        handleOnMouseEnter();
      }
    },
    [handleOnMouseEnter],
  );

  const clonedChild = useMemo(() => {
    return cloneElement(children, {
      'aria-describedby': tooltipId,
    });
  }, [children, tooltipId]);

  const contentPosition = useMemo(
    () => ({
      placement,
    }),
    [placement],
  );

  const isVisible = useMemo(() => visible !== false && isOpen, [visible, isOpen]);

  return (
    <Popover
      invertPopoverSpectrum
      content={
        <TooltipContent
          ref={tooltipContentRef}
          content={content}
          gap={gap}
          placement={placement}
          testID={testID}
          tooltipId={tooltipId}
          zIndex={zIndex}
        />
      }
      contentPosition={contentPosition}
      disablePortal={disablePortal}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      onMouseDown={preventMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      visible={isVisible}
    >
      {clonedChild}
    </Popover>
  );
};
