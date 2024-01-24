import React from 'react';
import { Spacer, VStack } from '@cbhq/cds-web/layout';
import { NavLink } from '@cbhq/cds-web/navigation';
import { TextTitle1 } from '@cbhq/cds-web/typography';

import { NavLinkExample } from './NavigationStorySetup';

export default {
  component: NavLink,
  title: 'Deprecated/NavLink',
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const NavLinkExampleDefault = () => {
  return (
    <VStack alignItems="flex-start">
      <TextTitle1 as="h1">Nav link exmaple</TextTitle1>
      <Spacer />
      <NavLinkExample />
    </VStack>
  );
};
