import React, { memo } from 'react';

import type { CellBaseProps } from '@cbhq/cds-common/types';
import { useCellSpacing } from '@cbhq/cds-common/hooks/useCellSpacing';
import { css, cx } from 'linaria';

import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Pressable, LinkableProps } from '../system/Pressable';

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
} & LinkableProps;

export type CellProps = CellBaseProps & CellSharedProps;

export const Cell = memo(function Cell({
  accessory,
  as = 'div',
  alignItems = 'center',
  borderRadius = 'standard',
  children,
  detail,
  detailWidth,
  disabled,
  intermediary,
  media,
  minHeight,
  onPress,
  priority,
  selected,
  testID,
  to,
  /**
   * For TableCell, we don't want to apply an
   * overflow class unless we've defined overflow
   * as either `'truncate' | 'clip'`.
   *
   * */
  shouldOverflow,
  /** Props for useCellSpacing */
  ...spacingProps
}: CellProps) {
  const spacing = useCellSpacing(spacingProps);
  const offsetClassName = useOffsetStyles({ offsetHorizontal: spacing.inner.offsetHorizontal });
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
      gap={2}
      minHeight={minHeight}
      width="100%"
      testID={testID}
      {...spacing.inner}
      offsetHorizontal={linkable ? undefined : spacing.inner.offsetHorizontal}
    >
      {media && (
        <Box flexGrow={0} flexShrink={0}>
          {media}
        </Box>
      )}

      <Box
        flexGrow={1}
        flexShrink={priority === 'start' ? 0 : 1}
        justifyContent="flex-start"
        dangerouslySetClassName={maybeTruncateClassName}
      >
        {children}
      </Box>

      {!!intermediary && (
        <Box
          flexGrow={0}
          flexShrink={priority === 'middle' ? 0 : 1}
          justifyContent="center"
          dangerouslySetClassName={maybeTruncateClassName}
        >
          {intermediary}
        </Box>
      )}

      {!!detail && (
        <Box
          flexGrow={detailWidth ? undefined : 1}
          // eslint-disable-next-line no-nested-ternary
          flexShrink={detailWidth ? undefined : priority === 'end' ? 0 : 1}
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
        to={to}
        className={`${pressClassName} ${offsetClassName}`}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <Box as={as} alignItems="stretch" width="100%" minHeight={minHeight} {...spacing.outer}>
      {content}
    </Box>
  );
});
