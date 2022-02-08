/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Options as PopperOptions } from '@popperjs/core';
import { css, cx } from 'linaria';
import React, { cloneElement, useLayoutEffect, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import { PopperTooltip, tooltipId } from './PopperTooltip';
import { TooltipPortal } from './TooltipPortal';
import { TooltipProps } from './TooltipProps';
import { useTooltipAnimation } from './useTooltipAnimation';
import { useTooltipState } from './useTooltipState';

// Naming these help with code readability.
const POPPER_GAP = 0;
const POPPER_SKID = 0;

const subjectStyle = css`
  background-color: transparent;
  display: inline-block;
  cursor: default;
`;

const onPreventMouseDown = (event: React.MouseEvent) => {
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
  const [subject, setSubject] = useState<HTMLDivElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);

  const { popperAnimationRef, animateIn, animateOut } = useTooltipAnimation();

  const { isOpen, handleOnMouseEnter, handleOnMouseLeave, handleOnFocus, handleOnBlur } =
    useTooltipState(animateOut);

  const popperOptions: Partial<PopperOptions> = useMemo(() => {
    return {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [POPPER_SKID, POPPER_GAP],
          },
        },
      ],
    };
  }, [placement]);

  const { styles, attributes, update } = usePopper(subject, popper, popperOptions);

  useLayoutEffect(() => {
    void update?.();
  }, [update]);

  const clonedChild = useMemo(() => {
    return cloneElement(children, {
      'aria-describedby': tooltipId,
    });
  }, [children]);

  return (
    <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
      <div
        ref={setSubject}
        className={cx(subjectStyle)}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onMouseDown={onPreventMouseDown}
      >
        {clonedChild}
      </div>
      {isOpen ? (
        <TooltipPortal disablePortal={disablePortal}>
          <PopperTooltip
            ref={popperAnimationRef}
            setPopper={setPopper}
            content={content}
            popperStyles={styles}
            popperAttributes={attributes}
            gap={gap}
            animateIn={animateIn}
            testID={testID}
            zIndex={zIndex}
          />
        </TooltipPortal>
      ) : undefined}
    </div>
  );
};
