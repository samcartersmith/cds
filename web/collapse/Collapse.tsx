import React, { memo, forwardRef, ForwardedRef } from 'react';
import type { CollapseBaseProps } from '@cbhq/cds-common/types';
import { collapseSpacing } from '@cbhq/cds-common/tokens/collapse';
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
      const styles = useCollapseStyles(expanded, maxHeight);

      return (
        <motion.div
          {...styles}
          aria-labelledby={accessibilityLabelledBy}
          data-testid={testID}
          ref={forwardedRef}
          {...props}
        >
          <Box
            // maintain spacing top on long scroll
            spacingTop={collapseSpacing}
          >
            <Box spacingHorizontal={collapseSpacing} spacingBottom={collapseSpacing}>
              {children}
            </Box>
          </Box>
        </motion.div>
      );
    },
  ),
);
