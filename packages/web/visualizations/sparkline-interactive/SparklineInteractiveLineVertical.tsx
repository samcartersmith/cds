import React, { CSSProperties, memo, useCallback } from 'react';
import { css } from 'linaria';
import { lineDashArray } from '@cbhq/cds-common/tokens/sparkline';
import { SparklineInteractiveLineVerticalProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { usePalette } from '../../hooks/usePalette';
import { borderWidth } from '../../tokens';
import { cx } from '../../utils/linaria';

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
  width: ${borderWidth.sparkline};
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
  strokeWidth: borderWidth.sparkline,
};

export const SparklineInteractiveLineVertical = memo(
  ({ color }: SparklineInteractiveLineVerticalProps) => {
    const { setLineDOMNode, setMaskDOMNode } = useSparklineInteractiveScrubContext();
    const { height } = useSparklineInteractiveContext();
    const palette = usePalette();

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

    const maskStyle: CSSProperties = {
      backgroundColor: palette.background,
    };

    // hook up the line and mask
    return (
      <div className={verticalLineClassName}>
        <div
          className={cx(maskClassName, resetFadeClassName)}
          style={maskStyle}
          ref={setupMaskRef}
        />
        <div className={cx(lineContainerClassName, resetFadeClassName)} ref={setupLineRef}>
          <svg className={lineContainerClassName}>
            <line {...lineProps} stroke={color} y2={height} />
          </svg>
        </div>
      </div>
    );
  },
);
