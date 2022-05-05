import React, { cloneElement, useMemo } from 'react';

import { Popover } from '../popover/Popover';

import { TooltipContent, tooltipId } from './TooltipContent';
import { TooltipProps } from './TooltipProps';
import { useTooltipAnimation } from './useTooltipAnimation';
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
}: TooltipProps) => {
  const { popperAnimationRef, animateIn, animateOut } = useTooltipAnimation();

  const { isOpen, handleOnMouseEnter, handleOnMouseLeave, handleOnFocus, handleOnBlur } =
    useTooltipState(animateOut);

  const clonedChild = useMemo(() => {
    return cloneElement(children, {
      'aria-describedby': tooltipId,
    });
  }, [children]);

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
          ref={popperAnimationRef}
          content={content}
          gap={gap}
          animateIn={animateIn}
          testID={testID}
          zIndex={zIndex}
        />
      }
    >
      {clonedChild}
    </Popover>
  );
};
