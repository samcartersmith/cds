import React from 'react';

import { Spacer } from '../../layout';
import { TextTitle1 } from '../../typography';
import { Sidebar } from '../Sidebar';

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
