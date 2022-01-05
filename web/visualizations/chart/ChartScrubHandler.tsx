import React, { memo, MouseEvent, useCallback, useRef } from 'react';
import { noop } from '@cbhq/cds-utils';
import {
  ChartScrubHandlerProps,
  InteractiveSparklineBaseProps,
} from '@cbhq/cds-common/types/InteractiveSparklineBaseProps';
import { css } from 'linaria';
import { ChartGetMarker } from '@cbhq/cds-common';
import { fadeDuration, maskOpacity } from '@cbhq/cds-common/tokens/sparkline';
import { durations } from '@cbhq/cds-common/tokens/motion';
import { useChartContext } from './ChartProvider';
import { useChartScrubContext } from './ChartScrubProvider';
import { fadeIn, fadeOut } from './fade';

const scrubHandlerContainerClassName = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const scrubHandlerClassName = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const fadeInMaskClassName = css`
  && {
    animation: cdsChartScrubFadeInMask ${fadeDuration}ms linear;
    opacity: ${maskOpacity};
  }

  @keyframes cdsChartScrubFadeInMask {
    0% {
      opacity: 0;
    }
    100% {
      opacity: ${maskOpacity};
    }
  }
`;

const fadeOutMaskClassName = css`
  && {
    animation: cdsChartScrubFadeOutMask ${durations.moderate1}ms linear;
    opacity: 0;
  }

  @keyframes cdsChartScrubFadeOutMask {
    0% {
      opacity: ${maskOpacity};
    }
    100% {
      opacity: 0;
    }
  }
`;

function fadeOutMask(domNode?: HTMLElement | null) {
  domNode?.classList.remove(fadeInMaskClassName);
  domNode?.classList.add(fadeOutMaskClassName);
}

export function fadeInMask(domNode?: HTMLElement | null) {
  domNode?.classList.add(fadeInMaskClassName);
  domNode?.classList.remove(fadeOutMaskClassName);
}

type ChartScrubHandlerWebProps<Period extends string> = ChartScrubHandlerProps & {
  getMarker: ChartGetMarker;
  selectedPeriod: Period;
} & Pick<InteractiveSparklineBaseProps<Period>, 'onScrub' | 'formatHoverDate'>;

const ChartScrubHandlerWithGeneric = <Period extends string>({
  onScrubEnd = noop,
  onScrubStart = noop,
  children,
  disabled,
  onScrub,
  getMarker,
  selectedPeriod,
  formatHoverDate,
}: ChartScrubHandlerWebProps<Period>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { lineDOMNode, maskDOMNode, hoverDateDOMNode } = useChartScrubContext();
  const { width: chartWidth } = useChartContext();

  const handleMouseEnter = useCallback(() => {
    onScrubStart?.();

    fadeIn(lineDOMNode);
    fadeInMask(maskDOMNode);
  }, [lineDOMNode, maskDOMNode, onScrubStart]);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const xPos = Math.max(0, event.clientX - (containerRef.current?.offsetLeft ?? 0));

      const dataPoint = getMarker(xPos);

      if (dataPoint) {
        onScrub?.({
          point: dataPoint,
          period: selectedPeriod,
        });

        if (lineDOMNode) {
          lineDOMNode.style.transform = `translateX(${xPos}px)`;
        }
        if (maskDOMNode) {
          maskDOMNode.style.transform = `translateX(${xPos}px)`;
        }
        if (hoverDateDOMNode && formatHoverDate) {
          fadeIn(hoverDateDOMNode);
          hoverDateDOMNode.innerText = formatHoverDate(dataPoint.date, selectedPeriod);

          const textWidth = hoverDateDOMNode.offsetWidth;
          const halfTextWidth = textWidth / 2;
          let textPos = xPos - halfTextWidth;
          textPos = Math.max(0, textPos);
          textPos = Math.min(textPos, chartWidth - textWidth);

          hoverDateDOMNode.style.transform = `translateX(${textPos}px)`;
        }
      }
    },
    [
      getMarker,
      onScrub,
      selectedPeriod,
      lineDOMNode,
      maskDOMNode,
      hoverDateDOMNode,
      formatHoverDate,
      chartWidth,
    ],
  );

  const handleMouseLeave = useCallback(() => {
    onScrubEnd?.();

    fadeOut(lineDOMNode);
    fadeOutMask(maskDOMNode);
    fadeOut(hoverDateDOMNode);
  }, [hoverDateDOMNode, lineDOMNode, maskDOMNode, onScrubEnd]);

  return (
    <div ref={containerRef} className={scrubHandlerContainerClassName}>
      {children}
      {!disabled && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className={scrubHandlerClassName}
        />
      )}
    </div>
  );
};

export const ChartScrubHandler = memo(
  ChartScrubHandlerWithGeneric,
) as typeof ChartScrubHandlerWithGeneric;
