import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import { IOS_BOTTOM_NAV_BAR_HEIGHT, useDimensions } from '../../hooks/useDimensions';
import { useSpacingScale } from '../../hooks/useSpacingScale';
import { TooltipPlacement, UseTooltipPositionParams } from './TooltipProps';

export const useTooltipPosition = ({
  placement,
  subjectLayout,
  tooltipLayout,
}: UseTooltipPositionParams) => {
  const { screenHeight, screenWidth, statusBarHeight } = useDimensions();
  const spacing = useSpacingScale();

  const calculateTooltipStart = useCallback(() => {
    if (subjectLayout === undefined) return undefined;

    const { width, pageOffsetX } = subjectLayout;

    // Make sure we keep the Math.ceil is important. There is a bug with modals and justifyContent="space-around"|"space-evently" that causes an onLayout loop.
    return pageOffsetX - Math.ceil(tooltipLayout.width / 2 - width / 2);
  }, [subjectLayout, tooltipLayout.width]);

  const calculateTooltipTop = useCallback(
    (calculatedPlacement: TooltipPlacement) => {
      if (subjectLayout === undefined || tooltipLayout.height === 0) return undefined;

      const { pageOffsetY } = subjectLayout;

      const actualPageYOffset =
        Platform.OS === 'android' ? pageOffsetY - (statusBarHeight ?? 0) : pageOffsetY;

      return calculatedPlacement === 'bottom'
        ? actualPageYOffset + (subjectLayout?.height ?? 0)
        : actualPageYOffset - (tooltipLayout?.height ?? 0);
    },
    [statusBarHeight, subjectLayout, tooltipLayout.height],
  );

  const screenAwareTooltipPosition = useMemo(() => {
    if (
      placement === undefined ||
      subjectLayout === undefined ||
      tooltipLayout.height === 0 ||
      tooltipLayout.width === 0
    )
      return undefined;

    // Shift tooltip horizontally if x layout is invalid
    const start = calculateTooltipStart();
    if (start === undefined) return undefined;

    const startXThreshold = spacing[gutter];
    const endXThreshold = screenWidth - spacing[gutter];

    let actualStart = start;
    const endX = start + tooltipLayout.width;

    if (start < startXThreshold) {
      /** Overflow on start; shift tooltip right */
      actualStart = startXThreshold;
    } else if (endX > endXThreshold) {
      /** Overflow on end; shift tooltip left */
      const overflow = endX - endXThreshold;
      actualStart = endX - (overflow + tooltipLayout.width);
    }

    // Flip tooltip vertically if x layout is invalid
    const top = calculateTooltipTop(placement);
    let actualTop = top;

    if (
      placement === 'top' &&
      top !== undefined &&
      statusBarHeight !== undefined &&
      top < statusBarHeight
    ) {
      actualTop = calculateTooltipTop('bottom');
    } else if (
      placement === 'bottom' &&
      top !== undefined &&
      top + tooltipLayout.height >
        screenHeight - (Platform.OS === 'ios' ? IOS_BOTTOM_NAV_BAR_HEIGHT : 0)
    ) {
      actualTop = calculateTooltipTop('top');
    }

    return actualTop !== undefined
      ? {
          top: actualTop,
          start: actualStart,
        }
      : undefined;
  }, [
    placement,
    subjectLayout,
    tooltipLayout.height,
    tooltipLayout.width,
    calculateTooltipStart,
    spacing,
    screenWidth,
    calculateTooltipTop,
    statusBarHeight,
    screenHeight,
  ]);

  return useMemo(() => {
    return {
      ...screenAwareTooltipPosition,
      opacity: screenAwareTooltipPosition !== undefined ? 1 : 0,
    };
  }, [screenAwareTooltipPosition]);
};
