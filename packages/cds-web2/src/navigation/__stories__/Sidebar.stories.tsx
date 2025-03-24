import React from 'react';

import { Spacer } from '../../layout';
import { Text } from '../../typography/Text';
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
      <Text font="title1" as="h1">
        Default Sidebar Example
      </Text>
      <Spacer as="div" vertical={1} />
      <DefaultSidebarExample />
    </>
  );
};

export const Condensed = () => {
  return (
    <>
      <Text font="title1" as="h1">
        Condensed Sidebar Example
      </Text>
      <Spacer as="div" vertical={1} />
      <CondensedSidebarExample />
    </>
  );
};

export const Custom = () => {
  return (
    <>
      <Text font="title1" as="h1">
        Custom Sidebar Example
      </Text>
      <Spacer as="div" vertical={1} />
      <CustomSidebarExample />
    </>
  );
};
