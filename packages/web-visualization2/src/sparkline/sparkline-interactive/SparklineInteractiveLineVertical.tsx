import React, { memo, useCallback } from 'react';
import { css, cx } from '@linaria/core';
import { lineDashArray, borderWidth } from '@cbhq/cds-common2/tokens/sparkline';
import { SparklineInteractiveLineVerticalProps } from '@cbhq/cds-common2/types/SparklineInteractiveBaseProps';

import { resetFadeClassName } from './fade';
import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveScrubContext } from './SparklineInteractiveScrubProvider';

const verticalLineClassName = css`
  position: absolute;
  pointer-events: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const lineContainerClassName = css`
  width: ${borderWidth}px;
  height: 100%;
`;

const maskClassName = css`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const lineProps: React.SVGProps<SVGLineElement> = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
  strokeDasharray: lineDashArray.join(','),
  strokeWidth: borderWidth,
};

export const SparklineInteractiveLineVertical = memo(
  ({ color }: SparklineInteractiveLineVerticalProps) => {
    const { setLineDOMNode, setMaskDOMNode } = useSparklineInteractiveScrubContext();
    const { height } = useSparklineInteractiveContext();

    const setupLineRef = useCallback(
      (ref: HTMLDivElement) => {
        setLineDOMNode(ref ?? null);
      },
      [setLineDOMNode],
    );

    const setupMaskRef = useCallback(
      (ref: HTMLDivElement) => {
        setMaskDOMNode(ref ?? null);
      },
      [setMaskDOMNode],
    );

    const maskStyle: React.CSSProperties = {
      backgroundColor: 'var(--color-bg)',
    };

    // hook up the line and mask
    return (
      <div className={verticalLineClassName}>
        <div
          ref={setupMaskRef}
          className={cx(maskClassName, resetFadeClassName)}
          style={maskStyle}
        />
        <div ref={setupLineRef} className={cx(lineContainerClassName, resetFadeClassName)}>
          <svg className={lineContainerClassName}>
            <line {...lineProps} stroke={color} y2={height} />
          </svg>
        </div>
      </div>
    );
  },
);
