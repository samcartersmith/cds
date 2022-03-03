import React, { memo, forwardRef, ForwardedRef } from 'react';
import type { CollapseBaseProps } from '@cbhq/cds-common/types';
import { useCollapseSpacing } from '@cbhq/cds-common/hooks/useCollapseSpacing';

import { motion } from 'framer-motion';

import { Box, BoxProps } from '../layout';
import { useCollapseStyles } from './useCollapseStyles';

export type CollapseProps = CollapseBaseProps &
  Pick<BoxProps, 'role' | 'id' | 'accessibilityLabelledBy'>;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Collapse = memo(
  forwardRef(
    (
      { children, expanded, maxHeight, accessibilityLabelledBy, testID, ...props }: CollapseProps,
      forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
      const styles = useCollapseStyles(expanded);
      const spacing = useCollapseSpacing();

      return (
        <motion.div
          {...styles}
          aria-labelledby={accessibilityLabelledBy}
          data-testid={testID}
          {...props}
          ref={forwardedRef}
        >
          <Box {...spacing.outer}>
            <Box overflow="auto" maxHeight={maxHeight} {...spacing.inner}>
              {/* <ScrollFade /> */}
              {children}
            </Box>
          </Box>
        </motion.div>
      );
    },
  ),
);
