import React from 'react';
import { Placement } from '@popperjs/core';
import { Tooltip as TooltipPopover, TooltipReference, useTooltipState } from 'reakit';

import { useSpacingStyles } from '../../hooks/useSpacingStyles';
import { TextLabel2 } from '../../typography/TextLabel2';
import { cx } from '../../utils/linaria';
import * as tooltipStyles from '../tooltipStyles';

type TooltipProps = {
  children: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode;
  /** Content to render within the toolip. */
  content: NonNullable<React.ReactNode>;
  /** Disable tooltip from displaying. */
  disabled?: boolean;
  /** The direction and alignment of the positioned tooltip. */
  placement?: Placement;
};

/** @deprecated This component is deprecated. Visit go/cds for our new Tooltip. */
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
      {/* 
      // @ts-expect-error  - this error is due to no-implicit-children with TooltipReference. I'm unable to bump to V2 of this package or override props since they're heavily nested in generics */}
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
