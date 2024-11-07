import React, { forwardRef, memo } from 'react';
import { css } from 'linaria';
import { useCellSpacing } from '@cbhq/cds-common/hooks/useCellSpacing';
import type {
  CellBaseProps,
  ResponsiveCellSpacingProps,
  StackBaseProps,
} from '@cbhq/cds-common/types';
import { hasCellPriority } from '@cbhq/cds-common/utils/cell';

import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { useResponsiveCellSpacingStyles } from '../hooks/useResponsiveCellSpacing';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { insetFocusRing } from '../styles/focus';
import { responsiveClassName } from '../styles/responsive';
import { LinkableProps, Pressable } from '../system/Pressable';
import { cx } from '../utils/linaria';

const pressClassName = css`
  border-style: hidden;
  padding: 0;
  align-items: stretch;
  flex-grow: 1;
  display: flex;
  width: 100%;
`;

export const cellStaticClassName = 'cds-cell';

const baseStyles = css`
  &.${cellStaticClassName} {
    display: block;
  }
`;

// Display and min-width are necessary for truncation to work:
// https://css-tricks.com/flexbox-truncated-text/
const truncate = css`
  &.${cellStaticClassName} {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }
`;

const overflow = css`
  &.${cellStaticClassName} {
    overflow: auto;
    text-overflow: unset;
    white-space: normal;
  }
`;

export const overflowClassName = cx(cellStaticClassName, overflow);
export const truncateClassName = cx(cellStaticClassName, truncate);

export type CellSharedProps = {
  /** The type of outer wrapping element. */
  as?: 'div' | 'li';
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  /** Specify spacing styles by device breakpoint */
  responsiveConfig?: ResponsiveCellSpacingProps;
} & LinkableProps;

export type CellProps = {
  /**
   * Necessary to control roving tabindex for accessibility of interactable Cells
   * https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
   * */
  tabIndex?: number;
  gap?: StackBaseProps['gap'];
} & CellBaseProps &
  CellSharedProps;

export const Cell = memo(
  forwardRef(function Cell(
    {
      accessory,
      as = 'div',
      alignItems = 'center',
      borderRadius = 'rounded',
      children,
      detail,
      detailWidth,
      disabled,
      gap = 2,
      intermediary,
      media,
      minHeight,
      maxHeight,
      onPress,
      onKeyDown,
      onKeyPress,
      priority,
      selected,
      testID,
      to,
      target,
      href,
      tabIndex,
      /**
       * For TableCell, we don't want to apply an
       * overflow class unless we've defined overflow
       * as either `'truncate' | 'clip'`.
       *
       * */
      shouldOverflow,
      responsiveConfig,
      accessibilityLabel,
      accessibilityLabelledBy,
      accessibilityHint,
      /** Props for useCellSpacing */
      ...spacingProps
    }: CellProps,
    ref: React.ForwardedRef<HTMLElement>,
  ) {
    const spacing = useCellSpacing(spacingProps);
    const offsetClassName = useOffsetStyles({ offsetHorizontal: spacing.inner.offsetHorizontal });
    const { responsiveInnerSpacing, responsiveOuterSpacing } =
      useResponsiveCellSpacingStyles(responsiveConfig);
    const linkable = Boolean(onPress ?? onKeyDown ?? onKeyPress ?? to ?? href);
    const maybeTruncateClassName = cx(
      cellStaticClassName,
      baseStyles,
      !shouldOverflow && truncateClassName,
    );

    let content = (
      <HStack
        alignItems={alignItems}
        background={selected ? 'backgroundAlternate' : undefined}
        borderRadius={borderRadius}
        flexGrow={1}
        gap={gap}
        testID={testID}
        width="100%"
        {...spacing.inner}
        className={cx(responsiveInnerSpacing, responsiveConfig && responsiveClassName)}
        offsetHorizontal={linkable ? undefined : spacing.inner.offsetHorizontal}
      >
        {media && (
          <Box flexGrow={0} flexShrink={0}>
            {media}
          </Box>
        )}

        <Box
          className={maybeTruncateClassName}
          flexGrow={1}
          flexShrink={hasCellPriority('start', priority) ? 0 : 1}
          justifyContent="flex-start"
        >
          {children}
        </Box>

        {!!intermediary && (
          <Box
            className={maybeTruncateClassName}
            flexGrow={0}
            flexShrink={hasCellPriority('middle', priority) ? 0 : 1}
            justifyContent="center"
          >
            {intermediary}
          </Box>
        )}

        {!!detail && (
          <Box
            alignItems="flex-end"
            className={maybeTruncateClassName}
            flexDirection="column"
            flexGrow={detailWidth ? undefined : 1}
            flexShrink={detailWidth ? undefined : hasCellPriority('end', priority) ? 0 : 1}
            justifyContent="flex-end"
            width={detailWidth}
          >
            {detail}
          </Box>
        )}

        {!!accessory && (
          <Box flexGrow={0} flexShrink={0}>
            {accessory}
          </Box>
        )}
      </HStack>
    );

    if (linkable) {
      content = (
        <Pressable
          noScaleOnPress
          transparentWhileInactive
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          accessibilityLabelledBy={accessibilityLabelledBy}
          background="background"
          borderRadius={borderRadius}
          className={cx(pressClassName, offsetClassName, insetFocusRing)}
          disabled={disabled}
          href={href}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onPress={onPress}
          tabIndex={tabIndex}
          target={target}
          testID={testID && `${testID}-cell-pressable`}
          to={to}
        >
          {content}
        </Pressable>
      );
    }

    return (
      <Box
        alignItems="stretch"
        as={as}
        maxHeight={maxHeight}
        minHeight={minHeight}
        width="100%"
        {...spacing.outer}
        ref={ref}
        className={cx(responsiveOuterSpacing, responsiveConfig && responsiveClassName)}
      >
        {content}
      </Box>
    );
  }),
);
