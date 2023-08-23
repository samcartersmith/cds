import React from 'react';
import { Spacer } from '@cbhq/cds-web/layout';
import { Sidebar } from '@cbhq/cds-web/navigation';
import { TextTitle1 } from '@cbhq/cds-web/typography';

import { SidebarExample } from './NavigationStorySetup';

export default {
  component: Sidebar,
  title: 'Core Components/Navigation/Sidebar',
};

export const NavigationBarFullExampleDefault = () => {
  return (
    <>
      <TextTitle1 as="h1">Sidebar example</TextTitle1>
      <Spacer />
      <SidebarExample />
    </>
  );
};
