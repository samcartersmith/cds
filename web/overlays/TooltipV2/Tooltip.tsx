import { Options as PopperOptions } from '@popperjs/core';
import { css, cx } from 'linaria';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import { PopperTooltip } from './PopperTooltip';
import { TooltipPortal } from './TooltipPortal';
import { TooltipProps } from './TooltipProps';
import { usePopperAnimation } from './usePopperAnimation';
import { useTooltipState } from './useTooltipState';

const DEFAULT_GAP = 8;
const DEFAULT_SKID = 0; // We do not offer an override for this, but it helps with readability of the config.

const subjectStyle = css`
  background-color: transparent;
  display: inline-block;
  cursor: default;
`;

export const Tooltip = ({
  children,
  content,
  placement = 'top',
  gapOverride = DEFAULT_GAP,
}: TooltipProps) => {
  const [subject, setSubject] = useState<HTMLDivElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);

  const { isOpen, handleOnMouseEnter, handleOnMouseLeave, handleOnFocus, handleOnBlur } =
    useTooltipState();

  const { isInAnimationState } = usePopperAnimation(popper, isOpen);

  const popperOptions: Partial<PopperOptions> = useMemo(() => {
    return {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [DEFAULT_SKID, gapOverride],
          },
        },
      ],
    };
  }, [gapOverride, placement]);

  const { styles, attributes, update } = usePopper(subject, popper, popperOptions);

  useLayoutEffect(() => {
    void update?.();
  }, [update]);

  return (
    <div>
      <div
        ref={setSubject}
        className={cx(subjectStyle)}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      >
        {children}
      </div>
      <TooltipPortal>
        {isOpen || isInAnimationState ? (
          <PopperTooltip
            ref={setPopper}
            handleOnMouseEnter={handleOnMouseEnter}
            handleOnMouseLeave={handleOnMouseLeave}
            content={content}
            popperStyles={styles}
            popperAttributes={attributes}
          />
        ) : undefined}
      </TooltipPortal>
    </div>
  );
};
