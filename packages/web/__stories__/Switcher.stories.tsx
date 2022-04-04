import { HStack } from '../layout/HStack';
import { NavigationBar, NavigationTitle } from '../navigation';
import { PortalProvider } from '../overlays/PortalProvider';
import { FeatureFlagProvider } from '../system';

import { AppSwitcher } from './AppSwitcher.stories';
import { UserSwitcher } from './UserSwitcher.stories';

export const NavigationBarWithSwitchers = () => {
  return (
    <PortalProvider>
      <FeatureFlagProvider frontierColor frontierButton>
        <NavigationBar
          end={
            <HStack alignItems="center" justifyContent="flex-end" gap={1}>
              <AppSwitcher />
              <UserSwitcher title="Brian" />
            </HStack>
          }
        >
          <NavigationTitle>Portfolio</NavigationTitle>
        </NavigationBar>
      </FeatureFlagProvider>
    </PortalProvider>
  );
};

export default {
  title: 'Core Components/Recipes/NavigationBarWithSwitchers',
  component: NavigationBarWithSwitchers,
};
