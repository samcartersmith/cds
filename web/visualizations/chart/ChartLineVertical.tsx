import React, { CSSProperties, memo, useCallback } from 'react';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { lineDashArray } from '@cbhq/cds-common/tokens/sparkline';
import { ChartLineVerticalProps } from '@cbhq/cds-common/types/InteractiveSparklineBaseProps';
import { css, cx } from 'linaria';
import { resetFadeClassName } from './fade';
import { useChartScrubContext } from './ChartScrubProvider';
import { usePalette } from '../../hooks/usePalette';
import { useChartContext } from './ChartProvider';

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

const lineProps = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
  'stroke-dasharray': lineDashArray,
  strokeWidth: borderWidth.sparkline,
};

export const ChartLineVertical = memo(({ color }: ChartLineVerticalProps) => {
  const { setLineDOMNode, setMaskDOMNode } = useChartScrubContext();
  const { height } = useChartContext();
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
      <div className={cx(maskClassName, resetFadeClassName)} style={maskStyle} ref={setupMaskRef} />
      <div className={cx(lineContainerClassName, resetFadeClassName)} ref={setupLineRef}>
        <svg className={lineContainerClassName}>
          <line {...lineProps} stroke={color} y2={height} />
        </svg>
      </div>
    </div>
  );
});
