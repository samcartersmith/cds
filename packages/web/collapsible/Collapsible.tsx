import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CollapsibleBaseProps } from '@cbhq/cds-common/types';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Box, BoxProps, HStack } from '../layout';

import { useCollapsibleStyles } from './useCollapsibleStyles';

export type CollapsibleProps = {
  /**
   * This option may break animation. Only use this if your container has fixed height or width.
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslyDisableOverflowHidden?: boolean;
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
        role,
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
      const styles = useCollapsibleStyles({
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
          aria-labelledby={accessibilityLabelledBy}
          data-testid={testID}
          id={id}
          role={role}
          ref={forwardedRef}
        >
          <div className={outerSpacing}>
            <Stack overflow="auto" {...sizeProps} dangerouslySetClassName={innerSpacing}>
              {children}
            </Stack>
          </div>
        </motion.div>
      );
    },
  ),
);
