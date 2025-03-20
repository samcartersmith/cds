import React, { memo, useMemo } from 'react';
import { ViewProps } from 'react-native';
import { CellBaseProps as SharedCellBaseProps } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { useCellSpacing } from '@cbhq/cds-common2/hooks/useCellSpacing';
import { hasCellPriority } from '@cbhq/cds-common2/utils/cell';

import { useTheme } from '../hooks/useTheme';
import { Box, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { LinkableProps, Pressable } from '../system/Pressable';

export type CellBaseProps = SharedCellBaseProps &
  LinkableProps & {
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
  shouldOverflow,
  accessibilityLabel,
  accessibilityHint,
  innerSpacing,
  outerSpacing,
  compact,
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
