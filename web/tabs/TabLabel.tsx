import { TabLabelProps as CommonTabLabelProps } from '@cbhq/cds-common';
import { css } from 'linaria';
import React, { useLayoutEffect, useMemo, memo, useRef, useEffect } from 'react';
import { TextHeadline, TextTitle3, TextTitle4, TextProps } from '../typography';
import { spacing } from '../tokens';
import { DotCount } from '../dots/DotCount';
import { Box, HStack } from '../layout';
import { useDotAnimation } from './hooks/useDotAnimation';

export const tabLabelSpacingClassName = css`
  padding-top: ${spacing[2]};
  padding-bottom: calc(${spacing[2]} - 2px); // Account for the 2px TabIndicator
`;
const containerClassName = css`
  position: relative;
`;
const hiddenClassName = css`
  width: 100%;
  visibility: hidden;
  pointer-events: none;
  height: 0px;
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

export type LayoutChangeEvent = DOMRect | undefined;
/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export type TabLabelProps = CommonTabLabelProps &
  TextProps & { onLayout?: (props: LayoutChangeEvent) => void };

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabLabel = memo(
  ({ id, active, variant = 'primary', count = 0, onLayout, ...props }: TabLabelProps) => {
    const didMount = useRef(false);
    const layoutRef = useRef<HTMLElement>(null);
    const { animateIn, animateOut, ref: dotRef } = useDotAnimation();
    const shouldMeasureElement = useMemo(() => !active && variant !== 'primary', [active, variant]);
    const color = useMemo(() => COLORS[variant][active ? 'active' : 'inactive'], [active, variant]);
    const TextElement = useMemo(() => {
      if (variant === 'primary') return TextHeadline;
      if (active) return TextTitle3;

      return TextTitle4;
    }, [active, variant]);

    // ⚡️ Side effects
    useEffect(() => {
      // Animate dotBadge in
      if (count) {
        if (!didMount.current) {
          didMount.current = true;
          animateIn();
        }
        // Animate dotBadge Out
      } else {
        didMount.current = false;
        animateOut();
      }
    }, [count, animateIn, animateOut]);

    useLayoutEffect(() => {
      onLayout?.(layoutRef.current?.getBoundingClientRect());
    }, [onLayout]);

    return (
      <HStack alignItems="center" ref={layoutRef}>
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
        <Box ref={dotRef} spacingStart={count ? 1 : 0}>
          <DotCount count={count} />
        </Box>
      </HStack>
    );
  },
);

TabLabel.displayName = 'TabLabel';
