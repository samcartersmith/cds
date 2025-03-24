import React from 'react';

import { Spacer, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { NavLink } from '../NavLink';

import { NavLinkExample } from './NavigationStorySetup';

export default {
  component: NavLink,
  title: 'Core Components/Navigation/NavLink',
};

export const NavLinkExampleDefault = () => {
  return (
    <VStack alignItems="flex-start">
      <Text font="title1" as="h1">
        Nav link example
      </Text>
      <Spacer />
      <NavLinkExample />
    </VStack>
  );
};
