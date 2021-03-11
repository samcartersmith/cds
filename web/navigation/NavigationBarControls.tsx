import React, { memo } from 'react';

import { join } from '@cbhq/cds-common/utils/join';

import { IconButtonProps } from '../buttons/IconButton';
import { Box } from '../layout/Box';
import { Spacer } from '../layout/Spacer';
import { navbarSpacing } from './navigationTokens';

type IconButtonChild = React.ReactElement<IconButtonProps>;

export type NavigationBarControlsProps = {
  children: IconButtonChild | IconButtonChild[];
};

export const NavigationBarControls = memo(({ children }: NavigationBarControlsProps) => {
  return children ? (
    <Box
      spacingEnd={navbarSpacing.betweenGroups}
      alignItems="center"
      justifyContent="space-between"
    >
      {join(React.Children.toArray(children), <Spacer spacingEnd={navbarSpacing.withinGroups} />)}
    </Box>
  ) : null;
});

NavigationBarControls.displayName = 'NavigationBarControls';
