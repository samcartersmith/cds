import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import { accordionSpacing } from '@cbhq/cds-common/accordions/accordionStyles';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common/animation/accordion';

import { Box } from '../layout';
import { useAccordionPanelAnimation } from './useAccordionPanelAnimation';
import { useContentSize } from '../hooks/useContentSize';
import { useAccordionAnimation } from './useAccordionAnimation';

export type AccordionProps = AccordionPanelBaseProps & { defaultExpanded: boolean };

export const AccordionPanel = memo(
  ({ children, defaultExpanded, expanded, testID }: AccordionProps) => {
    const [{ height: contentHeight }, handleContentSizeChange] = useContentSize();
    // cutoff on max height (400) and enable scroll
    const shouldEnableScroll = contentHeight > accordionVisibleMaxHeight;
    const { animatedStyles, animateIn, animateOut } = useAccordionPanelAnimation(defaultExpanded);

    useAccordionAnimation({ expanded, animateIn, animateOut });

    return (
      <Box animated testID={testID} dangerouslySetStyle={animatedStyles}>
        <ScrollView
          scrollEnabled={shouldEnableScroll}
          onContentSizeChange={handleContentSizeChange}
          // for Android
          nestedScrollEnabled
        >
          <Box {...accordionSpacing.panel}>{children}</Box>
        </ScrollView>
      </Box>
    );
  },
);
