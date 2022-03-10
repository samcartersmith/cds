/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useState } from 'react';
import { css } from 'linaria';
import { NavigationIconName, useToggler } from '@cbhq/cds-common';

import { AvatarButton, Button, ButtonGroup, IconButton } from '../../buttons/index';
import { SelectOption } from '../../controls/SelectOption';
import { LogoMark, NavigationIcon } from '../../icons';
import { HStack, VStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Avatar } from '../../media';
import { Pressable } from '../../system';
import { palette } from '../../tokens';
import { TextDisplay2, TextHeadline } from '../../typography';
import {
  NavigationBar,
  NavigationTitle,
  NavLink,
  Sidebar,
  SidebarItem,
  SidebarItemProps,
} from '../index';
import { navLinkClassName } from '../NavLink';
import { SidebarMoreMenu } from '../SidebarMoreMenu';

export const StoryMap = {
  NoTabsNoTitle: 'No Tabs no displayTitle',
  TabsAndTitle: 'With Tabs and displayTitle',
};

// Helpers
type Items = { title: string; icon: SidebarItemProps['icon'] }[];
export const items: Items = [
  { title: 'Assets', icon: 'chartPie' },
  { title: 'Trade', icon: 'trading' },
  { title: 'Pay', icon: 'pay' },
  { title: 'For you', icon: 'newsfeed' },
  { title: 'Earn', icon: 'giftBox' },
  { title: 'Borrow', icon: 'cash' },
  { title: 'DeFi', icon: 'defi' },
];

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
      <NavigationTitle>Personal Portfolio</NavigationTitle>
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
      <NavigationTitle>Personal Portfolio</NavigationTitle>
    </NavigationBar>
  );
};

export const SidebarExample: React.FC = () => {
  const [collapsed, setCompact] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <HStack justifyContent="center" alignItems="flex-start" background="backgroundAlternate">
      <Sidebar collapsed={collapsed} logo={<LogoMark />}>
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
        <ButtonGroup accessibilityLabel="make collapsed">
          <Button
            compact
            variant={collapsed ? 'secondary' : 'primary'}
            onPress={() => setCompact(false)}
          >
            default
          </Button>
          <Button
            compact
            variant={collapsed ? 'primary' : 'secondary'}
            onPress={() => setCompact(true)}
          >
            collapsed
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
      <Sidebar autoCollapse logo={<LogoMark />}>
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

const testOverrideClass = css`
  &.${navLinkClassName} {
    color: ${palette.negative};
  }
`;

export const NavLinkExample: React.FC = () => {
  const [activeItem, setActiveItem] = useState('assets');
  const getProps = (name: string) => ({
    onPress: () => setActiveItem(name),
    active: name === activeItem,
  });

  return (
    <HStack gap={3}>
      <NavLink {...getProps('test')} dangerouslySetClassName={testOverrideClass}>
        Override Test
      </NavLink>
      <NavLink {...getProps('assets')}>Assets</NavLink>
      <NavLink {...getProps('payments')}>Payments</NavLink>
      <NavLink {...getProps('myWallet')}>My Wallet</NavLink>
      <NavLink {...getProps('defi')}>DeFi</NavLink>
    </HStack>
  );
};

type MoreMenuOption = {
  value: string;
  label: string;
  icon: NavigationIconName;
};

export const moreMenuOptions: MoreMenuOption[] = [
  {
    value: 'earn',
    label: 'Earn',
    icon: 'earn',
  },
  {
    value: 'borrow',
    label: 'Borrow',
    icon: 'cash',
  },
  {
    value: 'defi',
    label: 'DeFi',
    icon: 'defi',
  },
];

export const SidebarWithMoreMenuExample: React.FC = () => {
  const [collapsed, setCompact] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuVisible, toggleMoreMenuVisibility] = useToggler(false);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);
  const moreMenuIndex = 4;

  const handleMoreMenuChange = (newValue: string) => {
    setActiveIndex(moreMenuIndex);
    setMoreMenuValue(newValue);
  };

  const handleItemPress = (index: number) => {
    setActiveIndex(index);
    setMoreMenuValue(undefined);
  };

  return (
    <HStack justifyContent="center" alignItems="flex-start" background="backgroundAlternate">
      <Sidebar collapsed={collapsed} logo={<LogoMark />}>
        {items.slice(0, 4).map((props, index) => (
          <SidebarItem
            key={`sidebar-item--${props.title}`}
            active={index === activeIndex}
            onPress={() => handleItemPress(index)}
            {...props}
          />
        ))}
        <SidebarMoreMenu
          onChange={handleMoreMenuChange}
          value={moreMenuValue}
          visible={moreMenuVisible}
          active={activeIndex === moreMenuIndex}
          openMenu={toggleMoreMenuVisibility.toggleOn}
          closeMenu={toggleMoreMenuVisibility.toggleOff}
          onPress={() => setActiveIndex(moreMenuIndex)}
        >
          {moreMenuOptions.map((item) => (
            <SelectOption
              key={`sidebar-more-menu-item--${item.value}`}
              value={item.value}
              description={item.label}
              media={<NavigationIcon name={item.icon} />}
            />
          ))}
        </SidebarMoreMenu>
      </Sidebar>

      <HStack spacing={2} gap={1} justifyContent="space-between" alignItems="center" flexGrow={1}>
        <TextHeadline as="h2">Active Page: {items[activeIndex].title}</TextHeadline>
        <ButtonGroup accessibilityLabel="make collapsed">
          <Button
            compact
            variant={collapsed ? 'secondary' : 'primary'}
            onPress={() => setCompact(false)}
          >
            default
          </Button>
          <Button
            compact
            variant={collapsed ? 'primary' : 'secondary'}
            onPress={() => setCompact(true)}
          >
            collapsed
          </Button>
        </ButtonGroup>
      </HStack>
    </HStack>
  );
};
