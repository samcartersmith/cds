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
import { items } from '../navigation/__stories__/NavigationStorySetup';
import { PortalProvider } from '../overlays/PortalProvider';
import { FeatureFlagProvider } from '../system';
import { useToggler } from '..';

import { AppSwitcher } from './AppSwitcher.stories';
import { UserSwitcher } from './UserSwitcher.stories';

const sidebarItems = items.slice(0, 4);
const moreMenuOptions = items.slice(4);

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
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
      <FeatureFlagProvider frontierButton frontierColor>
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
              active={activeIndex >= sidebarItems.length}
              onChange={handleMoreMenuChange}
              tooltipContent="More"
              value={moreMenuValue}
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
          <VStack width="100%">
            <NavigationBar
              end={
                <HStack alignItems="center" gap={1} justifyContent="flex-end">
                  <AppSwitcher />
                  <UserSwitcher title="Brian" />
                </HStack>
              }
            >
              <NavigationTitle>{[...items, ...moreMenuOptions][activeIndex].title}</NavigationTitle>
            </NavigationBar>
            <HStack
              alignItems="flex-start"
              background="backgroundAlternate"
              flexGrow={1}
              justifyContent="center"
              spacing={4}
            >
              <HStack
                alignItems="flex-start"
                background="backgroundAlternate"
                flexGrow={1}
                justifyContent="center"
                spacing={4}
              >
                <Button compact onPress={handleToggleCollapsed.toggle} variant="primary">
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

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
export default {
  title: 'Core Components/Recipes/Navigation  (deprecated - moved to cds-web-overlays)',
  component: NavigationRecipe,
};
