import React, { memo, forwardRef, ForwardedRef, useMemo } from 'react';
import type { CollapsibleBaseProps } from '@cbhq/cds-common/types';
import { motion } from 'framer-motion';

import { BoxProps, VStack, HStack } from '../layout';
import { useCollapsibleStyles } from './useCollapsibleStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';

export type CollapsibleProps = CollapsibleBaseProps &
  Pick<BoxProps, 'role' | 'id' | 'accessibilityLabelledBy'>;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
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
      const styles = useCollapsibleStyles(collapsed, direction);
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

      const Stack = direction === 'horizontal' ? HStack : VStack;

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
