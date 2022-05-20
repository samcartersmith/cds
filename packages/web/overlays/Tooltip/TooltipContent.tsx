import React, { ForwardedRef, forwardRef, useEffect, useMemo, useRef } from 'react';
import { maxWidth, spacingHorizontal, spacingVertical } from '@cbhq/cds-common/tokens/tooltip';
import { zIndex as cdsZIndex } from '@cbhq/cds-common/tokens/zIndex';

import { Box } from '../../layout/Box';
import { spacing } from '../../tokens';
import { TextLabel2 } from '../../typography';

import { PopperTooltipProps } from './TooltipProps';

export const tooltipId = 'tooltipId';

export const TooltipContent = forwardRef(
  (
    { content, gap, animateIn, testID, zIndex }: PopperTooltipProps,
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
        padding: spacing[gap],
        zIndex: zIndex ?? cdsZIndex.overlays.tooltip,
      }),
      [gap, zIndex],
    );

    return (
      <div style={outerStyle}>
        <Box
          ref={ref}
          spacingHorizontal={spacingHorizontal}
          spacingVertical={spacingVertical}
          background="background"
          borderRadius="tooltipV2"
          maxWidth={maxWidth}
          opacity={0}
          testID={testID}
        >
          {typeof content === 'string' ? (
            <TextLabel2 as="p" overflow="break" id={tooltipId} accessibilityLabel={content}>
              {content}
            </TextLabel2>
          ) : (
            <div id={tooltipId}>{content}</div>
          )}
        </Box>
      </div>
    );
  },
);
