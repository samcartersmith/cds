// This should change to: '@cbhq/cds-icons/fonts/web/icon-font.css'
// uncomment this for testing, but do not commit this uncommented or it will break the build
// import '@cbhq/cds-web/styles/icon-font.css';

import React from 'react';
import { Icon, NavigationIcon as CDSNavIcon } from '@cbhq/cds-web/icons';
import { HeroSquare, SpotRectangle as Rectangle, SpotSquare } from '@cbhq/cds-web/illustrations';
import { HStack } from '@cbhq/cds-web/layout';

const spreadProps = {};

export const V4MigrationsTest = () => {
  return (
    <HStack background="secondary" borderRadius="rounded" gap={3} spacing={3}>
      {/* @ts-expect-error Will be renamed to briefcase */}
      <Icon name="breifcase" size="m" />
      {/* @ts-expect-error Will be renamed to pencil */}
      <Icon name="pencilAlt" size="m" {...spreadProps} />
      {/* @ts-expect-error Will be renamed to pencil */}
      <CDSNavIcon name="ghostNav" size="m" />
      {/* @ts-expect-error Will be renamed to borrowWallet */}
      <HeroSquare name="walletSolana" />
      {/* @ts-expect-error Will be renamed to sparkleToken */}
      <SpotSquare name="adaStaking" />
      {/* @ts-expect-error Will be renamed to accessToAdvancedCharts */}
      <Rectangle name="accessToAdvancedChartsAlt" />
    </HStack>
  );
};

export default {
  title: 'Playground/CDSMigrator',
};
