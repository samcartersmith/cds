/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useCallback, useMemo, useState } from 'react';
import { css } from 'linaria';
import { HStack } from '@cbhq/cds-web/alpha/HStack';
import { VStack } from '@cbhq/cds-web/alpha/VStack';
import { AvatarButton, IconButton } from '@cbhq/cds-web/buttons/index';
import { LogoMark, NavigationIcon } from '@cbhq/cds-web/icons';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { LoremIpsum } from '@cbhq/cds-web/layout/__stories__/LoremIpsum';
import { Avatar } from '@cbhq/cds-web/media';
import { NavigationBar, NavigationTitle, NavLink, Sidebar } from '@cbhq/cds-web/navigation/index';
import { navLinkClassName } from '@cbhq/cds-web/navigation/NavLink';
import { SidebarItem, SidebarItemProps } from '@cbhq/cds-web/navigation/SidebarItem';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { Pressable } from '@cbhq/cds-web/system';
import { TabNavigation } from '@cbhq/cds-web/tabs';
import { MockTabPanel } from '@cbhq/cds-web/tabs/__stories__/MockTabPanel';
import { palette } from '@cbhq/cds-web/tokens';
import { TextDisplay2, TextHeadline, TextLegal } from '@cbhq/cds-web/typography';
import { enableJavascript } from '@cbhq/cds-web/utils/storybookParams/percy';

import { SelectOption } from '../../select/SelectOption';
import { SidebarMoreMenu, SidebarMoreMenuProps } from '../../sidebarMoreMenu/SidebarMoreMenu';

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
export const StoryMap = {
  NoTabsNoTitle: 'No Tabs no displayTitle',
  TabsAndTitle: 'With Tabs and displayTitle',
};

// Helpers
type Items = { title: string; icon: SidebarItemProps['icon'] }[];
/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
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
export const tabs = [
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
type NavigationBarFullExampleProps = {
  pageTitle?: string;
  onTabChange?: (id: string) => void;
  onBackPress?: () => void;
};

export function NavigationBarFullExample({
  pageTitle,
  onTabChange,
  onBackPress,
}: NavigationBarFullExampleProps) {
  const [value, setValue] = useState(tabs[0].id);

  const showBackButton = useMemo(
    () => (pageTitle ? pageTitle !== 'Dashboard' : value !== tabs[0].id),
    [pageTitle, value],
  );
  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
    } else {
      setValue(tabs[0].id);
    }
  }, [onBackPress]);

  const handleTabChange = useCallback(
    (id: string) => {
      onTabChange?.(id);
      setValue?.(id);
    },
    [onTabChange],
  );

  return (
    <NavigationBar
      bottom={<TabNavigation onChange={handleTabChange} tabs={tabs} value={value} />}
      end={
        <HStack alignItems="center" gap={1}>
          <IconButton
            accessibilityLabel="Notifications"
            name="bell"
            onPress={() => handlePress('Notifications')}
          />
          <Pressable backgroundColor="transparent" onPress={() => handlePress('Avatar group')}>
            <HStack alignItems="center" gap={1}>
              <Avatar alt="" size="xl" />
              <TextHeadline as="h2">Andy</TextHeadline>
            </HStack>
          </Pressable>
        </HStack>
      }
      start={
        showBackButton && (
          <IconButton accessibilityLabel="Back" name="backArrow" onPress={handleBackPress} />
        )
      }
    >
      <NavigationTitle>{pageTitle ?? `Personal Portfolio (${value})`}</NavigationTitle>
    </NavigationBar>
  );
}

export const NavigationBarTitle = () => {
  return (
    <NavigationBar
      end={
        <HStack alignItems="center" gap={1}>
          <IconButton
            accessibilityLabel="Notifications"
            name="bell"
            onPress={() => handlePress('Notifications')}
          />
          <AvatarButton compact alt="Donna" onPress={() => handlePress('Avatar')} />
        </HStack>
      }
    >
      <NavigationTitle>Personal Portfolio</NavigationTitle>
    </NavigationBar>
  );
};

export const ComposedSystem = () => {
  const [activeSidebarIndex, setActiveSidebarIndex] = useState(0);
  const [activeTabId, setActiveTabId] = useState('all');

  const activeTabTitle = useMemo(
    () => tabs.find(({ id }) => id === activeTabId),
    [activeTabId],
  )?.label;

  const activePageTitle = useMemo(
    () => items[activeSidebarIndex]?.title ?? 'Dashboard',
    [activeSidebarIndex],
  );

  const handleTabChange = (id: string) => {
    setActiveTabId(id);
  };

  return (
    <HStack>
      <Sidebar autoCollapse logo={<LogoMark />}>
        {items.map((props, index) => (
          <SidebarItem
            key={`sidebar-item--${props.title}`}
            active={index === activeSidebarIndex}
            onPress={() => setActiveSidebarIndex(index)}
            {...props}
          />
        ))}
      </Sidebar>
      <VStack overflow="clip">
        <NavigationBarFullExample
          onBackPress={() => setActiveSidebarIndex(-1)}
          onTabChange={handleTabChange}
          pageTitle={activePageTitle}
        />
        <VStack spacing={2}>
          {tabs.map(({ id }, idx) => {
            const isActive = id === activeTabId;

            return (
              <MockTabPanel id={id} isActive={isActive}>
                <TextDisplay2 as="h2" spacingBottom={1}>
                  {activeTabTitle}
                </TextDisplay2>
                <LoremIpsum repeat={1 * (idx + 1)} />
              </MockTabPanel>
            );
          })}
        </VStack>
      </VStack>
    </HStack>
  );
};
ComposedSystem.parameters = { percy: enableJavascript };

const testOverrideClass = css`
  &.${navLinkClassName} {
    color: ${palette.negative};
  }
`;

export const NavLinkExample = () => {
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
const renderCB1 = (isCollapsed: boolean) => {
  const spacing = isCollapsed ? 1 : 2;
  return (
    <Pressable
      as="button"
      backgroundColor="primaryWash"
      borderRadius="roundedLarge"
      onPress={() => handlePress('Notifications')}
    >
      <HStack alignItems="center" gap={1} justifyContent="center" spacing={spacing}>
        <Pictogram dimension="48x48" name="coinbaseOneLogo" scaleMultiplier={0.8} />
        {!isCollapsed && (
          <VStack>
            <TextHeadline as="span">Coinbase One</TextHeadline>
            <TextLegal as="p" color="foregroundMuted">
              Zero trading fees
            </TextLegal>
          </VStack>
        )}
      </HStack>
    </Pressable>
  );
};

type SidebarExampleProps = {
  children?: React.ReactNode;
} & Omit<SidebarMoreMenuProps, 'children'>;

export const SidebarExample = ({ children, ...props }: SidebarExampleProps) => {
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
        alignItems="flex-start"
        background="backgroundAlternate"
        justifyContent="center"
        overflow="hidden"
      >
        <Sidebar autoCollapse logo={<LogoMark />} renderEnd={renderCB1}>
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
            active={activeIndex >= navItems.length}
            onChange={handleMoreMenuChange}
            tooltipContent="More"
            value={moreMenuValue}
            {...props}
          >
            {moreMenuOptions.map((item) => (
              <SelectOption
                key={`sidebar-more-menu-item--${item.title}`}
                description={item.title}
                media={<NavigationIcon name={item.icon} />}
                value={item.title}
              />
            ))}
          </SidebarMoreMenu>
        </Sidebar>
        <VStack flexGrow={1} gap={1} justifyContent="space-between" spacing={2}>
          <TextHeadline as="h2">
            Active Page: {[...items, ...moreMenuOptions][activeIndex].title}
          </TextHeadline>
          <HStack alignItems="center" flexGrow={1} justifyContent="center" spacing={3}>
            {children}
          </HStack>
        </VStack>
      </HStack>
    </PortalProvider>
  );
};
SidebarExample.parameters = { percy: enableJavascript };
