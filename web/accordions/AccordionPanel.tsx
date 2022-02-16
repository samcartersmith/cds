import React, { memo, useState, useCallback, useEffect } from 'react';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import { accordionSpacing } from '@cbhq/cds-common/accordions/accordionStyles';
import { cx } from 'linaria';

import { Box } from '../layout';
import { getAccordionHeaderId, getAccordionPanelId } from './utils';
import { panelStyles } from './accordionStyles';
import { overflow } from '../styles/overflow';
import { display } from '../styles/display';

export const AccordionPanel = memo(
  ({ children, expanded, itemKey, testID }: AccordionPanelBaseProps) => {
    const [shouldAttachOverflow, setShouldAttachOverflow] = useState(expanded);
    const [shouldAttachDisplayNone, setShouldAttachDisplayNone] = useState(!expanded);

    useEffect(() => {
      // remove display:none immediately on expand
      if (expanded) {
        setShouldAttachDisplayNone(false);
      }
    }, [expanded]);

    const handleTransitionEnd = useCallback(() => {
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
          expanded
            ? // attach overflow:auto after transition end to
              // prevent flickering scrollbar when animating in
              cx(panelStyles.expanded, shouldAttachOverflow && overflow.auto)
            : panelStyles.collapsed,
        )}
        role="region"
        testID={testID}
        // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
        accessibilityLabelledBy={getAccordionHeaderId(itemKey)}
        id={getAccordionPanelId(itemKey)}
        onTransitionEnd={handleTransitionEnd}
      >
        <Box
          // prevent focus inside collapsed content
          dangerouslySetClassName={cx(shouldAttachDisplayNone && display.none)}
          {...accordionSpacing.panel}
        >
          {children}
        </Box>
      </Box>
    );
  },
);
