import React, { memo, useCallback, useId, useMemo } from 'react';
import { css } from '@linaria/core';
import { TabIndicatorProps, TabLabelProps as CommonTabLabelProps } from '@cbhq/cds-common';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';

import { Collapsible } from '../collapsible';
import { DotCount } from '../dots/DotCount';
import { useDimensions } from '../hooks/useDimensions';
import { useIsoEffect } from '../hooks/useIsoEffect';
import { HStack } from '../layout';
import { spacing } from '../tokens';
import { TextHeadline, TextProps, TextTitle3, TextTitle4 } from '../typography';

export const tabLabelVerticalSpacing = 2;
export const tabLabelSpacingClassName = css`
  padding-top: ${spacing[tabLabelVerticalSpacing]};
  padding-bottom: calc(
    ${spacing[tabLabelVerticalSpacing]} - 2px
  ); // Account for the 2px TabIndicator
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

export type TabLabelProps = CommonTabLabelProps &
  TextProps & { onLayout?: (key: string, props: TabIndicatorProps) => void };

export const TabLabel = memo(
  ({
    id = '',
    active,
    variant = 'primary',
    count = 0,
    max,
    onLayout,
    Component,
    ...props
  }: TabLabelProps) => {
    const shouldMeasureElement = useMemo(() => !active && variant !== 'primary', [active, variant]);
    const color = useMemo(() => COLORS[variant][active ? 'active' : 'inactive'], [active, variant]);
    const prevCount = usePreviousValue<number>(count);
    const accessibilityLabelId = useId();

    const TextElement = useMemo(() => {
      if (variant === 'primary') return TextHeadline;
      if (active) return TextTitle3;

      return TextTitle4;
    }, [active, variant]);

    // Handle layout events
    const { observe, width, x } = useDimensions();

    const getOnLayoutHandler = useCallback(() => {
      onLayout?.(id, { width, x });
    }, [id, onLayout, width, x]);

    useIsoEffect(() => {
      getOnLayoutHandler();
    }, [getOnLayoutHandler]);

    return (
      <HStack ref={observe} alignItems="center">
        {shouldMeasureElement && (
          <span className={containerClassName}>
            {Component ? (
              <>
                <Component active={active} id={id} label={props.children} />
                {/* This element is used to ensure the element width doesn't change when we change font-weight */}
                <span aria-hidden="true" className={hiddenClassName}>
                  <Component active={active} id={id} label={props.children} />
                </span>
              </>
            ) : (
              <>
                <TextElement as="h2" color={color} {...props} />
                {/* This element is used to ensure the element width doesn't change when we change font-weight */}
                <TextElement
                  as="h2"
                  color={color}
                  {...props}
                  aria-hidden="true"
                  className={hiddenClassName}
                />
              </>
            )}
          </span>
        )}
        {!shouldMeasureElement &&
          (Component ? (
            <Component active={active} id={id} label={props.children} />
          ) : (
            <TextElement
              as="h2"
              color={color}
              id={accessibilityLabelId}
              {...props}
              className={variant === 'primary' ? tabLabelSpacingClassName : undefined}
            />
          ))}
        <Collapsible collapsed={!count} direction="horizontal" role="status" spacingStart={0.5}>
          {/* When count is set to 0 this will fallback to prevCount
          which has the previous count value to keep the component mounted */}
          <DotCount
            accessibilityLabel={`${
              props.accessibilityLabel ?? typeof props.children === 'string' ? props.children : ''
            } count: ${count}`}
            count={(count || prevCount) ?? 0}
            max={max}
          />
        </Collapsible>
      </HStack>
    );
  },
);

TabLabel.displayName = 'TabLabel';
