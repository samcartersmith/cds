import React, { memo, MouseEvent, useCallback, useRef } from 'react';
import { css } from 'linaria';
import { ChartGetMarker } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { fadeDuration, maskOpacity } from '@cbhq/cds-common/tokens/sparkline';
import {
  SparklineInteractiveBaseProps,
  SparklineInteractiveScrubHandlerProps,
} from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';
import { noop } from '@cbhq/cds-utils';

import { cubicBezier } from '../../animation/convertMotionConfig';

import { fadeIn, fadeOut } from './fade';
import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveScrubContext } from './SparklineInteractiveScrubProvider';

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
    animation: cdsSparklineInteractiveScrubFadeInMask ${fadeDuration}ms ${cubicBezier('global')};
    opacity: ${maskOpacity};
  }

  @keyframes cdsSparklineInteractiveScrubFadeInMask {
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
    animation: cdsSparklineInteractiveScrubFadeOutMask ${fadeDuration}ms ${cubicBezier('global')};
    opacity: 0;
  }

  @keyframes cdsSparklineInteractiveScrubFadeOutMask {
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

type SparklineInteractiveScrubHandlerWebProps<Period extends string> =
  SparklineInteractiveScrubHandlerProps & {
    getMarker: ChartGetMarker;
    selectedPeriod: Period;
  } & Pick<SparklineInteractiveBaseProps<Period>, 'onScrub' | 'formatHoverDate'>;

const SparklineInteractiveScrubHandlerWithGeneric = <Period extends string>({
  onScrubEnd = noop,
  onScrubStart = noop,
  children,
  disabled,
  onScrub,
  getMarker,
  selectedPeriod,
  formatHoverDate,
}: SparklineInteractiveScrubHandlerWebProps<Period>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { lineDOMNode, maskDOMNode, hoverDateDOMNode } = useSparklineInteractiveScrubContext();
  const { width: chartWidth } = useSparklineInteractiveContext();
  const padding = useScaleConditional({ dense: 4, normal: 8 });

  const handleMouseEnter = useCallback(() => {
    onScrubStart?.();

    fadeIn(lineDOMNode);
    fadeInMask(maskDOMNode);
  }, [lineDOMNode, maskDOMNode, onScrubStart]);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const xPos = Math.max(
        0,
        event.clientX - (containerRef.current?.getBoundingClientRect().left ?? 0),
      );

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
          textPos = Math.max(padding, textPos);
          textPos = Math.min(textPos, chartWidth - textWidth - padding);

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
      padding,
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

export const SparklineInteractiveScrubHandler = memo(
  SparklineInteractiveScrubHandlerWithGeneric,
) as typeof SparklineInteractiveScrubHandlerWithGeneric;
