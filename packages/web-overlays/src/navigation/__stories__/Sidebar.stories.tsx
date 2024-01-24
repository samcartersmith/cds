import React from 'react';
import { Spacer } from '@cbhq/cds-web/layout';
import { Sidebar } from '@cbhq/cds-web/navigation';
import { TextTitle1 } from '@cbhq/cds-web/typography';

import { SidebarExample } from './NavigationStorySetup';

export default {
  component: Sidebar,
  title: 'Deprecated/Sidebar',
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const NavigationBarFullExampleDefault = () => {
  return (
    <>
      <TextTitle1 as="h1">Sidebar example</TextTitle1>
      <Spacer />
      <SidebarExample />
    </>
  );
};
