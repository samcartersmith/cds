import React, { useEffect, useRef } from 'react';

import { Placement } from '@popperjs/core';
import { cx } from 'linaria';
import { useHover, useId, useTooltip } from 'react-aria';
import { usePopper } from 'react-popper';
import { useTooltipTriggerState } from 'react-stately';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { TextBody } from '../Text/Text';
import * as tooltipStyles from './tooltipStyles';

export interface TooltipProps {
  children: (
    props: React.HTMLAttributes<HTMLElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: React.RefObject<any>
  ) => React.ReactNode;
  /** Content to render within the toolip. */
  content: NonNullable<React.ReactNode>;
  /** Is the tooltip and trigger disabled? */
  disabled?: boolean;
  /** The direction and alignment of the positioned tooltip. */
  placement?: Placement;
}

const modifiers = [
  {
    name: 'offset',
    options: {
      offset: [0, 8],
    },
  },
  {
    name: 'preventOverflow',
  },
];

export const Tooltip = ({ children, content, disabled, placement = 'top' }: TooltipProps) => {
  const id = useId();

  // Setup popper
  const popperRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLElement>(null);
  const { styles, attributes } = usePopper(anchorRef.current, popperRef.current, {
    placement,
    modifiers,
  });

  // Setup tooltip
  const { isOpen, open, close } = useTooltipTriggerState({ delay: 0, isDisabled: disabled });
  const { tooltipProps } = useTooltip({ isOpen }, { isOpen, open, close });
  const { hoverProps } = useHover({
    isDisabled: disabled,
    onHoverStart: () => open(),
    onHoverEnd: () => close(),
  });

  // Close tooltip if the escape key is pressed
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close(true);
        anchorRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [anchorRef, close]);

  // Prepare trigger props
  const triggerProps = {
    ...hoverProps,
    disabled,
    'aria-describedby': isOpen ? id : undefined,
  };

  return (
    <>
      {children(triggerProps, anchorRef)}

      <div
        id={id}
        ref={popperRef}
        className={cx(
          tooltipStyles.container,
          isOpen && tooltipStyles.opened,
          disabled && tooltipStyles.disabled,
          useSpacingStyles({ spacingHorizontal: 1, spacingVertical: 0.5 })
        )}
        style={styles.popper}
        aria-disabled={disabled}
        aria-hidden={!isOpen}
        {...attributes.popper}
        {...tooltipProps}
      >
        <TextBody as="span" color="primaryForeground">
          {content}
        </TextBody>
      </div>
    </>
  );
};
