import React, { Children, memo } from 'react';
import { join } from '@cbhq/cds-common/utils/join';

import { IconButtonProps } from '../../buttons/IconButton';
import { Box } from '../../layout/Box';
import { Spacer } from '../../layout/Spacer';

import { navbarSpacing } from './navigationTokens';

type IconButtonChild = React.ReactElement<IconButtonProps>;

/** @deprecated */
export type NavigationBarControlsProps = {
  children: IconButtonChild | IconButtonChild[];
};

/** @deprecated */
export const NavigationBarControls = memo(({ children }: NavigationBarControlsProps) => {
  return children ? (
    <Box
      spacingEnd={navbarSpacing.betweenGroups}
      alignItems="center"
      justifyContent="space-between"
    >
      {join(Children.toArray(children), <Spacer horizontal={navbarSpacing.withinGroups} />)}
    </Box>
  ) : null;
});

NavigationBarControls.displayName = 'NavigationBarControls';
