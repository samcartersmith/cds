import React, { memo, useMemo } from 'react';

import { FallbackBaseProps } from '@cbhq/cds-common';
import { useFallbackShape } from '@cbhq/cds-common/hooks/useFallbackShape';
import { css } from 'linaria';

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
  background-size: 600px 100px;
  display: inline-block;
  position: relative;

  @keyframes shimmer {
    0% {
      background-position: -600px 0;
    }

    100% {
      background-position: 600px 0;
    }
  }
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
  ...props
}: FallbackProps) {
  const { width, borderRadius } = useFallbackShape(shape, baseWidth);

  const style = useMemo(
    () => ({
      width: percentage ? `100%` : width,
      height,
      borderRadius,
    }),
    [height, borderRadius, width, percentage],
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
