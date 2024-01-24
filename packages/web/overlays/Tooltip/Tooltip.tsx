import React, { cloneElement, useMemo } from 'react';

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
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      visible={isVisible}
    >
      {clonedChild}
    </Popover>
  );
};
