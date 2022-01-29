import React, { memo } from 'react';
import { join } from '@cbhq/cds-common/utils/join';

import { ButtonProps } from '../../buttons/Button';
import { Box } from '../../layout/Box';
import { Spacer } from '../../layout/Spacer';

import { hideForCondensed } from './navigationStyles';
import { navbarSpacing } from './navigationTokens';

type ButtonChild = React.ReactElement<ButtonProps>;

export type NavigationBarCtasProps = {
  children: ButtonChild | ButtonChild[];
};

export const NavigationBarCtas = memo(({ children }: NavigationBarCtasProps) => {
  return children ? (
    <Box
      alignItems="center"
      justifyContent="space-between"
      dangerouslySetClassName={hideForCondensed}
    >
      {join(React.Children.toArray(children), <Spacer horizontal={navbarSpacing.withinGroups} />)}
    </Box>
  ) : null;
});

NavigationBarCtas.displayName = 'NavigationBarCtas';
