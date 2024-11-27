import React, { memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { FallbackBaseProps } from '@cbhq/cds-common';
import { useFallbackShape, UseFallbackShapeOptions } from '@cbhq/cds-common/hooks/useFallbackShape';

import { Box, BoxProps } from './Box';

const fallback = css`
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: linear;
  overflow: hidden;
  background: rgb(var(--gray60), 0.05);
  background-image: linear-gradient(
    to right,
    rgb(var(--gray60), 0.05) 0%,
    rgb(var(--gray60), 0) 25%,
    rgb(var(--gray60), 0.1) 50%,
    rgb(var(--gray60), 0) 75%,
    rgb(var(--gray60), 0.05) 100%
  );
  background-repeat: no-repeat;
  display: inline-block;
  position: relative;

  /* stylelint-disable plugin/no-low-performance-animation-properties */
  @keyframes shimmer {
    0% {
      background-position: -600px 0;
    }

    100% {
      background-position: 600px 0;
    }
  }
  /* stylelint-enable plugin/no-low-performance-animation-properties */
`;

export type FallbackProps = {
  /** Convert width to a percentage. */
  percentage?: boolean;
} & FallbackBaseProps &
  Omit<BoxProps, 'borderRadius' | 'height' | 'width'>;

export const Fallback = memo(function Fallback({
  height,
  shape = 'rectangle',
  width: baseWidth,
  percentage,
  disableRandomRectWidth,
  rectWidthVariant,
  ...props
}: FallbackProps) {
  const fallbackShapeOptions = useMemo(
    (): UseFallbackShapeOptions => ({
      disableRandomRectWidth,
      rectWidthVariant,
    }),
    [disableRandomRectWidth, rectWidthVariant],
  );

  const { width, borderRadius } = useFallbackShape(shape, baseWidth, fallbackShapeOptions);
  const backgroundSizeHeight = typeof height === 'number' ? `${height}px` : height;

  const style = useMemo(
    () => ({
      width: percentage ? `100%` : width,
      backgroundSize: `600px ${backgroundSizeHeight}`,
      height,
      borderRadius,
    }),
    [percentage, width, backgroundSizeHeight, height, borderRadius],
  );

  return (
    <Box
      flexGrow={0}
      flexShrink={0}
      width={percentage && typeof width === 'number' ? `${Math.min(width, 100)}%` : width}
      {...props}
    >
      <div className={fallback} style={style}>
        &nbsp;
      </div>
    </Box>
  );
});
