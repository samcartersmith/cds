import React, { memo } from 'react';

import { join } from '@cbhq/cds-common/utils/join';

import { Box } from '../layout/Box';
import { Spacer } from '../layout/Spacer';
import { navbarSpacing } from './navigationTokens';

export const NavigationBarActions: React.FC = memo(({ children }) => {
  return children ? (
    <Box
      spacingStart={navbarSpacing.betweenGroups}
      alignItems="center"
      justifyContent="space-between"
    >
      {join(React.Children.toArray(children), <Spacer spacingEnd={navbarSpacing.withinGroups} />)}
    </Box>
  ) : null;
});

NavigationBarActions.displayName = 'NavigationBarActions';
