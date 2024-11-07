import React from 'react';

import { Spacer, VStack } from '../../layout';
import { TextTitle1 } from '../../typography';
import { NavLink } from '../NavLink';

import { NavLinkExample } from './NavigationStorySetup';

export default {
  component: NavLink,
  title: 'Core Components/Navigation/NavLink',
};

export const NavLinkExampleDefault = () => {
  return (
    <VStack alignItems="flex-start">
      <TextTitle1 as="h1">Nav link exmaple</TextTitle1>
      <Spacer />
      <NavLinkExample />
    </VStack>
  );
};
