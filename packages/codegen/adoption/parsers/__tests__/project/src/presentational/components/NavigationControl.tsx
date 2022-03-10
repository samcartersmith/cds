// @ts-nocheck

import React, { memo } from 'react';

import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { NavigationBarControls } from '@cbhq/cds-web/navigation';
import { RoutePaths } from '@commerce/frontend/AppRoutes';
import { Link } from 'react-router-dom';

type Props = {
  backUrl?: string;
};

export const NavigationControl = memo(({ backUrl }: Props) => {
  if (backUrl) {
    return (
      <NavigationBarControls>
        <IconButton
          as={(iconButtonProps) => <Link {...iconButtonProps} to={backUrl} />}
          name="backArrow"
        />
      </NavigationBarControls>
    );
  }
  return (
    <NavigationBarControls>
      <Link to={RoutePaths.Payments}>
        <div />
      </Link>
    </NavigationBarControls>
  );
});
