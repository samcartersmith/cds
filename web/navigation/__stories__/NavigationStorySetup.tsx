/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useState } from 'react';

import { palette } from '../../tokens';
import { Button, IconButton, AvatarButton, ButtonGroup } from '../../buttons/index';
import { LogoMark } from '../../icons/LogoMark';
import { HStack, VStack } from '../../layout';
import { TextLabel1, TextHeadline, TextDisplay2 } from '../../typography';
import {
  NavigationBar,
  PageTitle,
  Sidebar,
  SidebarItem,
  SidebarItemProps,
  NavLink,
} from '../index';
import { Pressable } from '../../system';
import { Avatar } from '../../media';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';

export const StoryMap = {
  NoTabsNoTitle: 'No Tabs no displayTitle',
  TabsAndTitle: 'With Tabs and displayTitle',
};

// Helpers
type Items = { title: string; icon: SidebarItemProps['icon'] }[];
const items: Items = [
  { title: 'Assets', icon: 'chartPie' },
  { title: 'Trade', icon: 'trading' },
  { title: 'Pay', icon: 'pay' },
  { title: 'For you', icon: 'newsfeed' },
  { title: 'Earn', icon: 'giftBox' },
  { title: 'Borrow', icon: 'cash' },
  { title: 'DeFi', icon: 'defi' },
];

// eslint-disable-next-line no-console
const handlePress = (name: string) => console.log(`Pressed ${name}`);
export const NavigationBarFullExample: React.FC = () => {
  return (
    <NavigationBar
      start={<IconButton name="backArrow" onPress={() => handlePress('Back')} />}
      end={
        <HStack gap={1} alignItems="center">
          <IconButton name="bell" onPress={() => handlePress('Notifications')} />
          <Pressable backgroundColor="transparent" onPress={() => handlePress('Avatar group')}>
            <HStack gap={1} alignItems="center">
              <Avatar alt="Andy" size="xl" />
              <TextHeadline as="h2">Andy</TextHeadline>
            </HStack>
          </Pressable>
        </HStack>
      }
    >
      <PageTitle>Personal Portfolio</PageTitle>
    </NavigationBar>
  );
};

export const NavigationBarTitle: React.FC = () => {
  return (
    <NavigationBar
      end={
        <HStack gap={1} alignItems="center">
          <IconButton name="bell" onPress={() => handlePress('Notifications')} />
          <AvatarButton alt="Donna" onPress={() => handlePress('Avatar')} compact />
        </HStack>
      }
    >
      <PageTitle>Personal Portfolio</PageTitle>
    </NavigationBar>
  );
};

export const SidebarExample: React.FC = () => {
  const [compact, setCompact] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <HStack
      justifyContent="center"
      alignItems="flex-start"
      dangerouslySetBackground={palette.backgroundAlternate}
    >
      <Sidebar compact={compact} logo={<LogoMark />}>
        {items.map((props, index) => (
          <SidebarItem
            key={`sidebar-item--${props.title}`}
            active={index === activeIndex}
            onPress={() => setActiveIndex(index)}
            {...props}
          />
        ))}
      </Sidebar>
      <HStack spacing={2} gap={1} justifyContent="space-between" alignItems="center" flexGrow={1}>
        <TextHeadline as="h2">Active Page: {items[activeIndex].title}</TextHeadline>
        <ButtonGroup accessibilityLabel="make compact">
          <Button
            compact
            variant={compact ? 'secondary' : 'primary'}
            onPress={() => setCompact(false)}
          >
            default
          </Button>
          <Button
            compact
            variant={compact ? 'primary' : 'secondary'}
            onPress={() => setCompact(true)}
          >
            compact
          </Button>
        </ButtonGroup>
      </HStack>
    </HStack>
  );
};

export const ComposedSystem: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <HStack>
      <Sidebar
        logo={
          <HStack gap={1} alignItems="center">
            <LogoMark />
            <TextLabel1 as="p" color="foreground">
              Asset Hub
            </TextLabel1>
          </HStack>
        }
      >
        {items.map((props, index) => (
          <SidebarItem
            key={`sidebar-item--${props.title}`}
            active={index === activeIndex}
            onPress={() => setActiveIndex(index)}
            {...props}
          />
        ))}
      </Sidebar>
      <VStack>
        <NavigationBarFullExample />
        <VStack spacing={4}>
          <TextDisplay2 as="h2" spacingBottom={1}>
            {items[activeIndex].title}
          </TextDisplay2>
          <LoremIpsum repeat={20} />
        </VStack>
      </VStack>
    </HStack>
  );
};

export const NavLinkExample: React.FC = () => {
  const [activeItem, setActiveItem] = useState('assets');
  const getProps = (name: string) => ({
    onPress: () => setActiveItem(name),
    active: name === activeItem,
  });

  return (
    <HStack gap={3}>
      <NavLink {...getProps('assets')}>Assets</NavLink>
      <NavLink {...getProps('payments')}>Payments</NavLink>
      <NavLink {...getProps('myWallet')}>My Wallet</NavLink>
      <NavLink {...getProps('defi')}>DeFi</NavLink>
    </HStack>
  );
};
