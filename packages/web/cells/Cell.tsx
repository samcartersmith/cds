import React, { ForwardedRef, forwardRef, memo } from 'react';
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
      borderRadius = 'standard',
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
      priority,
      selected,
      testID,
      to,
      tabIndex,
      onKeyDown,
      /**
       * For TableCell, we don't want to apply an
       * overflow class unless we've defined overflow
       * as either `'truncate' | 'clip'`.
       *
       * */
      shouldOverflow,
      responsiveConfig,
      /** Props for useCellSpacing */
      ...spacingProps
    }: CellProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    const spacing = useCellSpacing(spacingProps);
    const offsetClassName = useOffsetStyles({ offsetHorizontal: spacing.inner.offsetHorizontal });
    const { responsiveInnerSpacing, responsiveOuterSpacing } =
      useResponsiveCellSpacingStyles(responsiveConfig);
    const linkable = Boolean(onPress ?? to);
    const maybeTruncateClassName = cx(
      cellStaticClassName,
      baseStyles,
      !shouldOverflow && truncateClassName,
    );

    let content = (
      <HStack
        flexGrow={1}
        background={selected ? 'backgroundAlternate' : undefined}
        borderRadius={borderRadius}
        alignItems={alignItems}
        gap={gap}
        width="100%"
        testID={testID}
        {...spacing.inner}
        dangerouslySetClassName={responsiveInnerSpacing}
        offsetHorizontal={linkable ? undefined : spacing.inner.offsetHorizontal}
      >
        {media && (
          <Box flexGrow={0} flexShrink={0}>
            {media}
          </Box>
        )}

        <Box
          flexGrow={1}
          flexShrink={hasCellPriority('start', priority) ? 0 : 1}
          justifyContent="flex-start"
          dangerouslySetClassName={maybeTruncateClassName}
        >
          {children}
        </Box>

        {!!intermediary && (
          <Box
            flexGrow={0}
            flexShrink={hasCellPriority('middle', priority) ? 0 : 1}
            justifyContent="center"
            dangerouslySetClassName={maybeTruncateClassName}
          >
            {intermediary}
          </Box>
        )}

        {!!detail && (
          <Box
            flexGrow={detailWidth ? undefined : 1}
            flexShrink={
              // eslint-disable-next-line no-nested-ternary
              detailWidth ? undefined : hasCellPriority('end', priority) ? 0 : 1
            }
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="flex-end"
            width={detailWidth}
            dangerouslySetClassName={maybeTruncateClassName}
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

    if (onPress || to) {
      content = (
        <Pressable
          noScaleOnPress
          transparentWhileInactive
          backgroundColor="background"
          borderRadius={borderRadius}
          disabled={disabled}
          onPress={onPress}
          onKeyDown={onKeyDown}
          to={to}
          className={`${pressClassName} ${offsetClassName}`}
          tabIndex={tabIndex}
          testID={testID && `${testID}-cell-pressable`}
        >
          {content}
        </Pressable>
      );
    }

    return (
      <Box
        as={as}
        alignItems="stretch"
        width="100%"
        minHeight={minHeight}
        maxHeight={maxHeight}
        {...spacing.outer}
        dangerouslySetClassName={responsiveOuterSpacing}
        ref={ref}
      >
        {content}
      </Box>
    );
  }),
);
