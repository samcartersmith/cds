import { TabIndicatorProps, TabLabelProps as CommonTabLabelProps } from '@cbhq/cds-common';
import { animateDotWidthConfig } from '@cbhq/cds-common/animation/dot';
import { css } from 'linaria';
import React, { useCallback, useMemo, memo, useRef } from 'react';
import { TextHeadline, TextTitle3, TextTitle4, TextProps } from '../typography';
import { spacing } from '../tokens';
import { DotCount } from '../dots/DotCount';
import { HStack } from '../layout';
import { useDotAnimation } from './hooks/useDotAnimation';
import { useDimensions } from '../hooks/useDimensions';
import { cx } from '../utils/linaria';
import { Animated } from '../animation/Animated';
import { useIsoEffect } from '../hooks/useIsoEffect';

export const getDotSizeClassName = (count?: number) => {
  if (!count || count < 10) return 'size--s';
  if (count <= 99) return 'size--m';

  return 'size--l';
};

export const tabLabelSpacingClassName = css`
  padding-top: ${spacing[2]};
  padding-bottom: calc(${spacing[2]} - 2px); // Account for the 2px TabIndicator
`;
const containerClassName = css`
  position: relative;
  > * {
    white-space: nowrap;
  }
`;
const hiddenClassName = css`
  width: 100%;
  visibility: hidden;
  pointer-events: none;
  height: 0px;
`;
const dotClassName = css`
  display: block;
  padding-left: ${spacing[0.5]};
  // Animate to size
  width: 0px;
  opacity: 0;
  &.size--s {
    ${Animated.toCssTransition([{ ...animateDotWidthConfig, toValue: '27px' }])}
  }
  &.size--m {
    ${Animated.toCssTransition([{ ...animateDotWidthConfig, toValue: '31px' }])}
  }
  &.size--l {
    ${Animated.toCssTransition([{ ...animateDotWidthConfig, toValue: '42px' }])}
  }
`;

const COLORS = {
  primary: {
    active: 'primary',
    inactive: 'foreground',
  },
  secondary: {
    active: 'foreground',
    inactive: 'foregroundMuted',
  },
} as const;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export type TabLabelProps = CommonTabLabelProps &
  TextProps & { onLayout?: (key: string, props: TabIndicatorProps) => void };

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabLabel = memo(
  ({ id = '', active, variant = 'primary', count = 0, onLayout, ...props }: TabLabelProps) => {
    const shouldMeasureElement = useMemo(() => !active && variant !== 'primary', [active, variant]);
    const color = useMemo(() => COLORS[variant][active ? 'active' : 'inactive'], [active, variant]);
    const countClassName = getDotSizeClassName(count);
    const TextElement = useMemo(() => {
      if (variant === 'primary') return TextHeadline;
      if (active) return TextTitle3;

      return TextTitle4;
    }, [active, variant]);

    // Handle layout events
    const { observe, width, x } = useDimensions();

    // ⚡️ Side effects
    const lastCount = useRef(0);
    const { animateIn, animateOut, dotRef } = useDotAnimation();

    const getOnLayoutHandler = useCallback(() => {
      onLayout?.(id, { width, x });
    }, [id, onLayout, width, x]);

    useIsoEffect(() => {
      // Animate dotBadge in
      if (count && !lastCount.current) void animateIn?.start();
      if (!count && lastCount.current) void animateOut?.start();
      getOnLayoutHandler();

      // Update count ref
      lastCount.current = count;
    }, [count, animateIn, animateOut, id, getOnLayoutHandler]);

    return (
      <HStack alignItems="center" ref={observe}>
        {shouldMeasureElement ? (
          <span className={containerClassName}>
            <TextElement as="h2" color={color} {...props} />
            {/* This element is used to ensure the element width doesn't change when we change font-weight */}
            <TextTitle3
              as="h2"
              {...props}
              dangerouslySetClassName={hiddenClassName}
              aria-hidden="true"
            />
          </span>
        ) : (
          <TextElement
            as="h2"
            color={color}
            {...props}
            dangerouslySetClassName={variant === 'primary' ? tabLabelSpacingClassName : undefined}
          />
        )}
        <span className={cx(dotClassName, count && countClassName)} ref={dotRef}>
          <DotCount count={count} />
        </span>
      </HStack>
    );
  },
);

TabLabel.displayName = 'TabLabel';
