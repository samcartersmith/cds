import React from 'react';

import { Placement } from '@popperjs/core';
import { Tooltip as TooltipPopover, TooltipReference, useTooltipState } from 'reakit/Tooltip';
import { cx } from '../utils/linaria';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as tooltipStyles from './tooltipStyles';
import { TextLabel2 } from '../typography/TextLabel2';

type TooltipProps = {
  children: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode;
  /** Content to render within the toolip. */
  content: NonNullable<React.ReactNode>;
  /** Disable tooltip from displaying. */
  disabled?: boolean;
  /** The direction and alignment of the positioned tooltip. */
  placement?: Placement;
};

export const Tooltip = ({ children, content, disabled, placement = 'top' }: TooltipProps) => {
  const spacingStyles = useSpacingStyles({ spacing: 1 });
  const tooltip = useTooltipState({
    placement,
    unstable_fixed: false,
    unstable_offset: [0, 8],
    unstable_preventOverflow: true,
  });

  // Avoid tooltip overhead and just render directly
  if (disabled) {
    return <>{children({})}</>;
  }

  return (
    <>
      <TooltipReference {...tooltip}>{children}</TooltipReference>

      <TooltipPopover
        {...tooltip}
        className={cx(tooltipStyles.container, spacingStyles)}
        // Need theme provider
        unstable_portal={false}
      >
        <TextLabel2 as="span" color="primaryForeground">
          {content}
        </TextLabel2>
      </TooltipPopover>
    </>
  );
};
