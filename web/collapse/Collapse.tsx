import React, { memo, useState, useCallback, useEffect } from 'react';
import type { CollapseBaseProps } from '@cbhq/cds-common/types';
import { collapseSpacing } from '@cbhq/cds-common/tokens/collapse';
import { cx } from 'linaria';

import { Box, BoxProps } from '../layout';
import { collapseStyles } from './collapseStyles';
import { overflow } from '../styles/overflow';
import { display } from '../styles/display';

export type CollapseProps = CollapseBaseProps &
  Pick<BoxProps, 'role' | 'id' | 'accessibilityLabelledBy'>;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Collapse = memo(({ children, expanded, maxHeight, ...props }: CollapseProps) => {
  const [shouldAttachOverflow, setShouldAttachOverflow] = useState(expanded);
  const [shouldAttachDisplayNone, setShouldAttachDisplayNone] = useState(!expanded);

  useEffect(() => {
    // remove display:none immediately on expand
    if (expanded) {
      setShouldAttachDisplayNone(false);
    }
  }, [expanded]);

  const handleTransitionEnd = useCallback(() => {
    // attach overflow:auto after transition end to
    // prevent flickering scrollbar when animating in
    setShouldAttachOverflow(expanded);
    // attach display:none after collapse transition end
    if (!expanded) {
      setShouldAttachDisplayNone(!expanded);
    }
  }, [setShouldAttachOverflow, expanded]);

  return (
    <Box
      dangerouslySetClassName={cx(
        overflow.hidden,
        expanded ? collapseStyles.expanded : collapseStyles.collapsed,
      )}
      // override default maxHeight with prop
      maxHeight={expanded ? maxHeight : undefined}
      onTransitionEnd={handleTransitionEnd}
      {...props}
    >
      <Box
        // maintain spacing top on long scroll
        spacingTop={collapseSpacing}
      >
        <Box
          dangerouslySetClassName={cx(
            // prevent focus inside collapsed content
            shouldAttachDisplayNone && display.none,
            shouldAttachOverflow && overflow.auto,
          )}
          spacingHorizontal={collapseSpacing}
          spacingBottom={collapseSpacing}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
});
