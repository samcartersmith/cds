import React from 'react';

import { Spacer } from '../../layout';
import { TextTitle1 } from '../../typography';
import { Sidebar } from '../Sidebar';

import {
  CondensedSidebarExample,
  CustomSidebarExample,
  DefaultSidebarExample,
} from './NavigationStorySetup';

export default {
  component: Sidebar,
  title: 'Core Components/Navigation/Sidebar',
};

export const Default = () => {
  return (
    <>
      <TextTitle1 as="h1">Default Sidebar Example</TextTitle1>
      <Spacer as="div" vertical={1} />
      <DefaultSidebarExample />
    </>
  );
};

export const Condensed = () => {
  return (
    <>
      <TextTitle1 as="h1">Condensed Sidebar Example</TextTitle1>
      <Spacer as="div" vertical={1} />
      <CondensedSidebarExample />
    </>
  );
};

export const Custom = () => {
  return (
    <>
      <TextTitle1 as="h1">Custom Sidebar Example</TextTitle1>
      <Spacer as="div" vertical={1} />
      <CustomSidebarExample />
    </>
  );
};
