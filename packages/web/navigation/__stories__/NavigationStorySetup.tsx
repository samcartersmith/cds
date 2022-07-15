/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useCallback, useMemo, useState } from 'react';
import { css } from 'linaria';

import { AvatarButton, IconButton } from '../../buttons/index';
import { SelectOption } from '../../controls/SelectOption';
import { LogoMark, NavigationIcon } from '../../icons';
import { HStack, VStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Avatar } from '../../media';
import { PortalProvider } from '../../overlays/PortalProvider';
import { Pressable } from '../../system';
import { TabNavigation } from '../../tabs';
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
import { SidebarMoreMenu, SidebarMoreMenuProps } from '../SidebarMoreMenu';

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
const tabs = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'watchlist',
    label: 'Watchlist',
  },
  {
    id: 'tradable',
    label: 'Tradable',
  },
  {
    id: 'gainers',
    label: 'Gainers',
  },
  {
    id: 'losers',
    label: 'Losers',
  },
  {
    id: 'trending',
    label: 'Trending',
  },
  {
    id: 'schill',
    label: 'Schill',
  },
];
export const NavigationBarFullExample: React.FC = () => {
  const [value, setValue] = useState(tabs[0].id);
  const showBackButton = useMemo(() => value !== tabs[0].id, [value]);
  const handleBackPress = useCallback(() => {
    setValue(tabs[0].id);
  }, []);

  return (
    <NavigationBar
      start={showBackButton && <IconButton name="backArrow" onPress={handleBackPress} />}
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
      bottom={<TabNavigation tabs={tabs} value={value} onChange={setValue} />}
    >
      <NavigationTitle>{`Personal Portfolio (${value})`}</NavigationTitle>
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

const navItems = items.slice(0, 4);
const moreMenuOptions = items.slice(4);
export const SidebarExample = ({ children, ...props }: SidebarMoreMenuProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);

  const handleMoreMenuChange = (newValue: string) => {
    const moreIndex =
      moreMenuOptions.findIndex((option) => option.title === newValue) + navItems.length;
    setActiveIndex(moreIndex);
    setMoreMenuValue(newValue);
  };

  const handleItemPress = (index: number) => {
    setActiveIndex(index);
    setMoreMenuValue(undefined);
  };

  return (
    <PortalProvider>
      <HStack
        justifyContent="center"
        alignItems="flex-start"
        background="backgroundAlternate"
        overflow="hidden"
      >
        <Sidebar logo={<LogoMark />} autoCollapse>
          {navItems.map((item, index) => (
            <SidebarItem
              key={`sidebar-item--${item.title}`}
              active={index === activeIndex}
              onPress={() => handleItemPress(index)}
              tooltipContent={item.title}
              {...item}
            />
          ))}
          <SidebarMoreMenu
            onChange={handleMoreMenuChange}
            value={moreMenuValue}
            active={activeIndex >= navItems.length}
            tooltipContent="More"
            {...props}
          >
            {moreMenuOptions.map((item) => (
              <SelectOption
                key={`sidebar-more-menu-item--${item.title}`}
                value={item.title}
                description={item.title}
                media={<NavigationIcon name={item.icon} />}
              />
            ))}
          </SidebarMoreMenu>
        </Sidebar>
        <VStack spacing={2} gap={1} justifyContent="space-between" flexGrow={1}>
          <TextHeadline as="h2">
            Active Page: {[...items, ...moreMenuOptions][activeIndex].title}
          </TextHeadline>
          <HStack spacing={3} flexGrow={1} justifyContent="center" alignItems="center">
            {children}
          </HStack>
        </VStack>
      </HStack>
    </PortalProvider>
  );
};
