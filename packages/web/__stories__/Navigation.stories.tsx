import { useCallback, useState } from 'react';

import { Button } from '../buttons';
import { SelectOption } from '../controls/SelectOption';
import { LogoMark, NavigationIcon } from '../icons';
import { HStack, VStack } from '../layout';
import {
  NavigationBar,
  NavigationTitle,
  Sidebar,
  SidebarItem,
  SidebarMoreMenu,
} from '../navigation';
import {
  items as sidebarItems,
  moreMenuOptions,
} from '../navigation/__stories__/NavigationStorySetup';
import { PortalProvider } from '../overlays/PortalProvider';
import { FeatureFlagProvider } from '../system';
import { useToggler } from '..';

import { AppSwitcher } from './AppSwitcher.stories';
import { UserSwitcher } from './UserSwitcher.stories';

export const NavigationRecipe = () => {
  const [isCollapsed, handleToggleCollapsed] = useToggler(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);
  const moreMenuIndex = 4;

  const handleMoreMenuChange = useCallback(
    (newValue: string) => {
      setActiveIndex(moreMenuIndex);
      setMoreMenuValue(newValue);
    },
    [setActiveIndex, setMoreMenuValue],
  );

  const handleItemPress = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setMoreMenuValue(undefined);
    },
    [setActiveIndex, setMoreMenuValue],
  );

  const handleSidebarMoreMenuPress = useCallback(() => {
    setActiveIndex(moreMenuIndex);
  }, [setActiveIndex]);

  return (
    <PortalProvider>
      <FeatureFlagProvider frontierColor frontierButton>
        <HStack>
          <Sidebar collapsed={isCollapsed} logo={<LogoMark />}>
            {sidebarItems.slice(0, 4).map((props, index) => (
              <SidebarItem
                key={`sidebar-item--${props.title}`}
                active={index === activeIndex}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                onPress={() => handleItemPress(index)}
                tooltipContent={props.title}
                {...props}
              />
            ))}
            <SidebarMoreMenu
              onChange={handleMoreMenuChange}
              value={moreMenuValue}
              active={activeIndex === moreMenuIndex}
              onPress={handleSidebarMoreMenuPress}
              tooltipContent="More"
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
          <VStack width="100%">
            <NavigationBar
              end={
                <HStack alignItems="center" justifyContent="flex-end" gap={1}>
                  <AppSwitcher />
                  <UserSwitcher title="Brian" />
                </HStack>
              }
            >
              <NavigationTitle>{sidebarItems[activeIndex].title}</NavigationTitle>
            </NavigationBar>
            <HStack
              justifyContent="center"
              alignItems="flex-start"
              background="backgroundAlternate"
              flexGrow={1}
              spacing={4}
            >
              <HStack
                justifyContent="center"
                alignItems="flex-start"
                background="backgroundAlternate"
                flexGrow={1}
                spacing={4}
              >
                <Button compact variant="primary" onPress={handleToggleCollapsed.toggle}>
                  {isCollapsed ? 'Expand' : 'Collapse'} Sidebar
                </Button>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      </FeatureFlagProvider>
    </PortalProvider>
  );
};

export default {
  title: 'Core Components/Recipes/Navigation',
  component: NavigationRecipe,
};
