import React, { memo, useMemo } from 'react';
import type { ViewProps } from 'react-native';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';
import type { CellPriority, SharedProps } from '@cbhq/cds-common2/types';
import { hasCellPriority } from '@cbhq/cds-common2/utils/cell';

import { useCellSpacing } from '../hooks/useCellSpacing';
import { useTheme } from '../hooks/useTheme';
import { Box, type BoxBaseProps, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { LinkableProps, Pressable } from '../system/Pressable';

import type { CellAccessoryProps } from './CellAccessory';

export type CellSpacing = Pick<
  BoxBaseProps,
  | 'padding'
  | 'paddingX'
  | 'paddingY'
  | 'paddingTop'
  | 'paddingEnd'
  | 'paddingBottom'
  | 'paddingStart'
  | 'margin'
  | 'marginX'
  | 'marginY'
  | 'marginTop'
  | 'marginEnd'
  | 'marginBottom'
  | 'marginStart'
>;

export type CellBaseProps = SharedProps &
  LinkableProps & {
    accessory?: React.ReactElement<CellAccessoryProps>;
    children: React.ReactNode;
    detail?: React.ReactNode;
    intermediary?: React.ReactNode;
    media?: React.ReactElement;
    borderRadius?: ThemeVars.BorderRadius;
    /** Apply a fixed width to the detail (end). */
    detailWidth?: number | string;
    /** Is the cell disabled? Will apply opacity and disable interaction. */
    disabled?: boolean;
    /** Which piece of content has the highest priority in regards to text truncation, growing, and shrinking. */
    priority?: CellPriority | CellPriority[];
    /** Is the cell selected? Will apply a background and selected accessory. */
    selected?: boolean;
    /** The spacing to use on the parent wrapper of Cell */
    outerSpacing?: CellSpacing;
    /** The spacing to use on the inner content of Cell */
    innerSpacing?: CellSpacing;
    /** Measure the dimensions of the cell. */
    onLayout?: ViewProps['onLayout'];
  };

export type CellProps = BoxProps & CellBaseProps;

export const Cell = memo(function Cell({
  accessory,
  alignItems = 'center',
  borderRadius = 200,
  children,
  detail,
  detailWidth,
  disabled,
  intermediary,
  media,
  minHeight,
  maxHeight,
  onLayout,
  onPress,
  priority,
  selected,
  testID,
  accessibilityLabel,
  accessibilityHint,
  innerSpacing,
  outerSpacing,
  ...props
}: CellProps) {
  const theme = useTheme();
  const spacing = useCellSpacing({ innerSpacing, outerSpacing });

  const content = useMemo(
    () => (
      <HStack
        alignItems={alignItems}
        background={selected ? 'bgAlternate' : undefined}
        borderRadius={borderRadius}
        flexGrow={1}
        gap={2}
        renderToHardwareTextureAndroid={disabled}
        testID={testID}
        width="100%"
        {...spacing.inner}
        marginX={onPress ? undefined : spacing.inner.marginX}
      >
        {!!media && (
          <Box flexGrow={0} flexShrink={0}>
            {media}
          </Box>
        )}

        <Box
          flexGrow={1}
          flexShrink={hasCellPriority('start', priority) ? 0 : 1}
          justifyContent="flex-start"
        >
          {children}
        </Box>

        {!!intermediary && (
          <Box
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
    ),
    [
      accessory,
      alignItems,
      borderRadius,
      children,
      detail,
      detailWidth,
      disabled,
      intermediary,
      media,
      onPress,
      priority,
      selected,
      spacing.inner,
      testID,
    ],
  );

  const wrappedContent = useMemo(() => {
    if (onPress) {
      const offsetStyle = {
        marginHorizontal: -theme.space[(spacing.inner.marginX * -1) as ThemeVars.Space],
      };
      return (
        <Pressable
          block
          noScaleOnPress
          transparentWhileInactive
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          background="bg"
          borderRadius={borderRadius}
          contentStyle={pressStyles}
          disabled={disabled}
          onPress={onPress}
          style={[offsetStyle, pressStyles]}
        >
          {content}
        </Pressable>
      );
    }
    return content;
  }, [
    accessibilityHint,
    accessibilityLabel,
    borderRadius,
    content,
    disabled,
    onPress,
    spacing.inner.marginX,
    theme.space,
  ]);

  return (
    <Box
      alignItems="stretch"
      flexDirection="row"
      maxHeight={maxHeight}
      minHeight={minHeight}
      onLayout={onLayout}
      width="100%"
      {...spacing.outer}
      {...props}
    >
      {wrappedContent}
    </Box>
  );
});

Cell.displayName = 'Cell';

// Since Pressable and Interactable wraps with another `View`,
// we need to apply flex styles to those wrappers!
const pressStyles = {
  alignItems: 'stretch',
  flexGrow: 1,
  flexDirection: 'row',
} as const;
