import { useEffect, useRef, useMemo } from 'react';

import { Placement } from '@popperjs/core';
import { cx } from 'linaria';
import { useHover, useId, useTooltip as useAriaTooltip } from 'react-aria';
import { usePopper } from 'react-popper';
import { useTooltipTriggerState } from 'react-stately';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as tooltipStyles from '../overlays/tooltipStyles';
import { TextLabel1 } from '../typography/TextLabel1';

export interface UseTooltipParams {
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

export const useTooltip = ({ content, disabled, placement = 'top' }: UseTooltipParams) => {
  const id = useId();

  // Styles
  const spacingStyles = useSpacingStyles({ spacingHorizontal: 1 });

  // Setup popper
  const popperRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLElement>(null);
  const { styles, attributes } = usePopper(anchorRef.current, popperRef.current, {
    placement,
    modifiers,
  });

  // Setup tooltip
  const { isOpen, open, close } = useTooltipTriggerState({ delay: 0, isDisabled: disabled });
  const { tooltipProps } = useAriaTooltip({ isOpen }, { isOpen, open, close });
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

  return useMemo(() => {
    // Prepare trigger props
    const triggerProps = {
      ...hoverProps,
      disabled,
      'aria-describedby': isOpen ? id : undefined,
    };

    const tooltip = (
      <div
        id={id}
        ref={popperRef}
        className={cx(tooltipStyles.container, disabled && tooltipStyles.disabled, spacingStyles)}
        style={{ ...styles.popper, display: isOpen ? 'flex' : 'none' }}
        aria-disabled={disabled}
        aria-hidden={!isOpen}
        {...attributes.popper}
        {...tooltipProps}
      >
        <TextLabel1 as="span" color="primaryForeground">
          {content}
        </TextLabel1>
      </div>
    );

    return { tooltipProps: triggerProps, tooltipRef: anchorRef, tooltip };
  }, [
    attributes.popper,
    content,
    disabled,
    hoverProps,
    id,
    isOpen,
    spacingStyles,
    styles.popper,
    tooltipProps,
  ]);
};
