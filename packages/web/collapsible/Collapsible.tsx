import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { m as motion } from 'framer-motion';
import type { CollapsibleBaseProps, DimensionValue } from '@cbhq/cds-common/types';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Box, BoxProps, HStack } from '../layout';

import { useCollapsibleMotionProps } from './useCollapsibleMotionProps';

export type CollapsibleProps = {
  /**
   * This option may break animation. Only use this if your container has fixed height or width.
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslyDisableOverflowHidden?: boolean;
  /**
   * Max height of the content. Overflow content will be scrollable.
   */
  maxHeight?: DimensionValue;
  /**
   * Max width of the content. Overflow content will be scrollable.
   */
  maxWidth?: DimensionValue;
} & CollapsibleBaseProps &
  Pick<BoxProps, 'role' | 'id' | 'accessibilityLabelledBy'>;

export const Collapsible = memo(
  forwardRef(
    (
      {
        children,
        collapsed = true,
        maxHeight,
        maxWidth,
        accessibilityLabelledBy,
        direction = 'vertical',
        testID,
        id,
        role = 'region',
        dangerouslyDisableOverflowHidden = false,
        // Spacing
        spacing,
        spacingBottom,
        spacingEnd,
        spacingHorizontal,
        spacingStart,
        spacingTop,
        spacingVertical,
      }: CollapsibleProps,
      forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
      const styles = useCollapsibleMotionProps({
        collapsed,
        direction,
        dangerouslyDisableOverflowHidden,
      });
      const outerSpacing = useSpacingStyles({
        spacingTop,
      });
      const innerSpacing = useSpacingStyles({
        spacing,
        spacingBottom,
        spacingEnd,
        spacingHorizontal,
        spacingStart,
        spacingVertical,
      });

      const sizeProps = useMemo(() => {
        return direction === 'horizontal'
          ? {
              maxWidth,
              // prevent horizontal scrollbar when animating
              display: 'inline-flex' as const,
            }
          : { maxHeight };
      }, [direction, maxWidth, maxHeight]);

      const Stack = direction === 'horizontal' ? HStack : Box;

      return (
        <motion.div
          {...styles}
          ref={forwardedRef}
          aria-labelledby={accessibilityLabelledBy}
          data-testid={testID}
          id={id}
          role={role}
        >
          <div className={outerSpacing}>
            <Stack
              overflow={maxWidth || maxHeight ? 'auto' : undefined}
              {...sizeProps}
              className={innerSpacing}
            >
              {children}
            </Stack>
          </div>
        </motion.div>
      );
    },
  ),
);
