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

  return (
    <Popover
      contentPosition={contentPosition}
      disablePortal={disablePortal}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onMouseDown={preventMouseDown}
      invertPopoverSpectrum
      visible={isOpen}
      content={
        <TooltipContent
          tooltipId={tooltipId}
          content={content}
          gap={gap}
          testID={testID}
          zIndex={zIndex}
        />
      }
    >
      {clonedChild}
    </Popover>
  );
};
