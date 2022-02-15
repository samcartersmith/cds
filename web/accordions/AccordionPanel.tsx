import React, { memo, useState, useCallback } from 'react';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import { accordionSpacing } from '@cbhq/cds-common/accordions/accordionStyles';
import { cx } from 'linaria';

import { Box } from '../layout';
import { getAccordionHeaderId, getAccordionPanelId } from './utils';
import { panelStyles } from './accordionStyles';
import { overflow } from '../styles/overflow';

export const AccordionPanel = memo(
  ({ children, expanded, itemKey, testID }: AccordionPanelBaseProps) => {
    const [shouldAttachOverflow, setShouldAttachOverflow] = useState(false);

    const handleTransistionEnd = useCallback(() => {
      setShouldAttachOverflow(expanded);
    }, [setShouldAttachOverflow, expanded]);

    return (
      <Box
        dangerouslySetClassName={cx(
          overflow.hidden,
          expanded
            ? cx(panelStyles.expanded, shouldAttachOverflow && overflow.auto)
            : panelStyles.collapsed,
        )}
        role="region"
        testID={testID}
        // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
        accessibilityLabelledBy={getAccordionHeaderId(itemKey)}
        id={getAccordionPanelId(itemKey)}
        // attach overflow:auto after transition end to
        // prevent flickering scrollbar when animating in
        onTransitionEnd={handleTransistionEnd}
      >
        <Box {...accordionSpacing.panel}>{children}</Box>
      </Box>
    );
  },
);
