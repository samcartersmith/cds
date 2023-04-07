import React, { useCallback, useState } from 'react';
import { useToggler } from '@cbhq/cds-web';
import { Button } from '@cbhq/cds-web/buttons';
import { LogoMark, NavigationIcon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { NavigationBar, NavigationTitle, Sidebar } from '@cbhq/cds-web/navigation';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider } from '@cbhq/cds-web/system';

import { items } from '../navigation/__stories__/NavigationStorySetup';
import { SelectOption } from '../select/SelectOption';
import { SidebarItem } from '../sidebarMoreMenu/SidebarItem';
import { SidebarMoreMenu } from '../sidebarMoreMenu/SidebarMoreMenu';

import { AppSwitcher } from './AppSwitcher.stories';
import { UserSwitcher } from './UserSwitcher.stories';

const sidebarItems = items.slice(0, 4);
const moreMenuOptions = items.slice(4);
export const NavigationRecipe = () => {
  const [isCollapsed, handleToggleCollapsed] = useToggler(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);

  const handleMoreMenuChange = useCallback(
    (newValue: string) => {
      const moreIndex =
        moreMenuOptions.findIndex((option) => option.title === newValue) + sidebarItems.length;
      setActiveIndex(moreIndex);
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

  return (
    <PortalProvider>
      <FeatureFlagProvider frontierColor frontierButton>
        <HStack>
          <Sidebar collapsed={isCollapsed} logo={<LogoMark />}>
            {sidebarItems.map((props, index) => (
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
              active={activeIndex >= sidebarItems.length}
              tooltipContent="More"
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
          <VStack width="100%">
            <NavigationBar
              end={
                <HStack alignItems="center" justifyContent="flex-end" gap={1}>
                  <AppSwitcher />
                  <UserSwitcher title="Brian" />
                </HStack>
              }
            >
              <NavigationTitle>{[...items, ...moreMenuOptions][activeIndex].title}</NavigationTitle>
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
  title: 'Overlays/Recipes/Navigation',
  component: NavigationRecipe,
};
