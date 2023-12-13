import React from 'react';
import { VStack } from '@cbhq/cds-web/layout';

import { AppSwitcherContent, appSwitcherData } from '../../../__stories__/AppSwitcherContent';

import { TOP_OFFSET, useWindowDimensions } from './utils';

const MobleAppMenuData = {
  sections: [...appSwitcherData.sections, ...appSwitcherData.sections],
};

/**
 * @internal
 */
function MobileAppMenu() {
  const { height, width } = useWindowDimensions();

  return (
    <VStack
      height={height - TOP_OFFSET}
      position="absolute"
      top={TOP_OFFSET}
      width="100%"
      zIndex={1}
    >
      <VStack
        background
        height="100%"
        offsetHorizontal={1}
        overflow="auto"
        position="relative"
        spacingHorizontal={0.5}
      >
        <AppSwitcherContent columns={width < 500 ? 3 : 4} data={MobleAppMenuData} />
      </VStack>
    </VStack>
  );
}

export default MobileAppMenu;
