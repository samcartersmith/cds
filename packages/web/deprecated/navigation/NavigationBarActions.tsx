import React, { Children, memo } from 'react';
import { join } from '@cbhq/cds-common/utils/join';

import { Box } from '../../layout/Box';
import { Spacer } from '../../layout/Spacer';

import { hideForCondensed } from './navigationStyles';
import { navbarSpacing } from './navigationTokens';

export const NavigationBarActions: React.FC<React.PropsWithChildren<unknown>> = memo(
  ({ children }) => {
    return children ? (
      <Box
        spacingStart={navbarSpacing.betweenGroups}
        alignItems="center"
        justifyContent="space-between"
        dangerouslySetClassName={hideForCondensed}
      >
        {join(Children.toArray(children), <Spacer horizontal={navbarSpacing.withinGroups} />)}
      </Box>
    ) : null;
  },
);

NavigationBarActions.displayName = 'NavigationBarActions';
