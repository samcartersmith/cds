import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { m as motion } from 'framer-motion';
import type { CollapsibleBaseProps } from '@cbhq/cds-common2/types/CollapsibleBaseProps';
import type { DimensionValue } from '@cbhq/cds-common2/types/DimensionStyles';

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
  Pick<BoxProps<'div'>, 'role' | 'id' | 'accessibilityLabelledBy'>;

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
        padding,
        paddingBottom,
        paddingEnd,
        paddingX,
        paddingStart,
        paddingTop,
        paddingY,
      }: CollapsibleProps,
      forwardedRef: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const { style: motionStyle, ...motionProps } = useCollapsibleMotionProps({
        collapsed,
        direction,
        dangerouslyDisableOverflowHidden,
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

      // visibility is used to prevent child content from being focusable when collapsed
      const [visibility, setVisibility] = useState<
        Extract<React.CSSProperties['visibility'], 'visible' | 'hidden'>
      >(collapsed ? 'hidden' : 'visible');
      // update the visibility to "visible" when the content is expanding
      if (!collapsed && visibility !== 'visible') {
        setVisibility('visible');
      }

      // when the animation completes, set the visibility to "hidden" if the content should be collapsed
      // this is to prevent children of the Collapsible element from being focusable in this state
      const handleAnimationComplete = useCallback(() => {
        if (collapsed) {
          setVisibility('hidden');
        }
      }, [collapsed]);

      // merge visible style with the computed framer-motion styles
      const style = useMemo(() => {
        return {
          ...motionStyle,
          visibility,
        };
      }, [visibility, motionStyle]);

      return (
        <motion.div
          {...motionProps}
          ref={forwardedRef}
          aria-labelledby={accessibilityLabelledBy}
          data-testid={testID}
          id={id}
          onAnimationComplete={handleAnimationComplete}
          role={role}
          style={style}
        >
          <Box display="block" paddingTop={paddingTop}>
            <Stack
              overflow={maxWidth || maxHeight ? 'auto' : undefined}
              {...sizeProps}
              padding={padding}
              paddingBottom={paddingBottom}
              paddingEnd={paddingEnd}
              paddingStart={paddingStart}
              paddingX={paddingX}
              paddingY={paddingY}
            >
              {children}
            </Stack>
          </Box>
        </motion.div>
      );
    },
  ),
);
