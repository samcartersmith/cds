import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import type { CollapseBaseProps } from '@cbhq/cds-common/types';
import { collapseSpacing } from '@cbhq/cds-common/tokens/collapse';

import { Box } from '../layout';
import { useCollapseAnimation } from './useCollapseAnimation';
import { useCollapsibleAnimation } from './useCollapsibleAnimation';
import { useContentSize } from '../hooks/useContentSize';
import { useSpacingScale } from '../hooks/useSpacingScale';

export type CollapseProps = CollapseBaseProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Collapse = memo(({ children, expanded, maxHeight, testID }: CollapseProps) => {
  const [{ height: scrollViewHeight }, handleContentSizeChange] = useContentSize();
  const spacingScale = useSpacingScale();

  const spacingHeight = spacingScale[collapseSpacing];
  const contentHeight = scrollViewHeight + spacingHeight;
  // cutoff on max height and enable scroll
  const shouldEnableScroll = maxHeight ? contentHeight > maxHeight : false;
  const animateToHeight = maxHeight ?? (scrollViewHeight > spacingHeight ? contentHeight : 0);

  const { animatedStyles, animateIn, animateOut } = useCollapseAnimation(expanded, animateToHeight);
  useCollapsibleAnimation({ expanded, animateIn, animateOut });

  return (
    <Box animated testID={testID} dangerouslySetStyle={animatedStyles}>
      <Box spacingTop={collapseSpacing}>
        <ScrollView
          scrollEnabled={shouldEnableScroll}
          onContentSizeChange={handleContentSizeChange}
          // for Android
          nestedScrollEnabled
        >
          <Box spacingHorizontal={collapseSpacing} spacingBottom={collapseSpacing}>
            {children}
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
});
