import React, { memo, Children } from 'react';

import { join } from '@cbhq/cds-common/utils/join';

import { ButtonProps } from '../buttons/Button';
import { Box } from '../layout/Box';
import { Spacer } from '../layout/Spacer';
import { navbarSpacing } from './navigationTokens';

type ButtonChild = React.ReactElement<ButtonProps>;

export type NavigationBarCtasProps = {
  children: ButtonChild | ButtonChild[];
};

export const NavigationBarCtas = memo(({ children }: NavigationBarCtasProps) => {
  return children ? (
    <Box alignItems="center" justifyContent="space-between">
      {join(Children.toArray(children), <Spacer spacingEnd={navbarSpacing.withinGroups} />)}
    </Box>
  ) : null;
});

NavigationBarCtas.displayName = 'NavigationBarCtas';
