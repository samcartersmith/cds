import { maxWidth, spacingHorizontal, spacingVertical } from '@cbhq/cds-common/tokens/tooltip';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import React, { ForwardedRef, forwardRef, useEffect, useMemo, useRef } from 'react';
import { Box } from '../../layout/Box';
import { spacing } from '../../tokens';
import { TextLabel2 } from '../../typography';
import { PopperTooltipProps } from './TooltipProps';

export const PopperTooltip = forwardRef(
  (
    { setPopper, content, popperStyles, popperAttributes, gap, animateIn }: PopperTooltipProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (!didMount.current) {
        didMount.current = true;
        animateIn();
      }
    }, [animateIn]);

    const outerStyle = useMemo(
      () => ({
        ...popperStyles.popper,
        padding: spacing[gap],
      }),
      [gap, popperStyles.popper],
    );

    return (
      <div ref={setPopper} style={outerStyle} {...popperAttributes.popper}>
        <Box
          ref={ref}
          spacingHorizontal={spacingHorizontal}
          spacingVertical={spacingVertical}
          background="background"
          borderRadius="tooltipV2"
          zIndex={zIndex.overlays.tooltip}
          maxWidth={maxWidth}
          opacity={0}
        >
          <TextLabel2 as="p">{content}</TextLabel2>
        </Box>
      </div>
    );
  },
);
