/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useCallback, useMemo, useState } from 'react';
import { css } from 'linaria';

import { HStack } from '../../alpha/HStack';
import { VStack } from '../../alpha/VStack';
import { AvatarButton, IconButton } from '../../buttons/index';
import { SelectOption } from '../../controls/SelectOption';
import { LogoMark, NavigationIcon } from '../../icons';
import { Pictogram } from '../../illustrations';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Avatar } from '../../media';
import { PortalProvider } from '../../overlays/PortalProvider';
import { Pressable } from '../../system';
import { TabNavigation } from '../../tabs';
import { MockTabPanel } from '../../tabs/__stories__/MockTabPanel';
import { palette } from '../../tokens';
import { TextDisplay2, TextHeadline, TextLegal } from '../../typography';
import { enableJavascript } from '../../utils/storybookParams/percy';
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
type NavigationBarFullExampleProps = {
  pageTitle?: string;
  onTabChange?: (id: string) => void;
  onBackPress?: () => void;
};
/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
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

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
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

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
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

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
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

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
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
