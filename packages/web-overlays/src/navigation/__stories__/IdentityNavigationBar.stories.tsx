import { memo, useCallback, useState } from 'react';
import { Story } from '@storybook/react';
import { Button, IconButton, NavigationIconButton } from '@cbhq/cds-web/buttons';
import { SearchInput } from '@cbhq/cds-web/controls';
import { HStack, Spacer } from '@cbhq/cds-web/layout';
import { NavigationBar, NavigationBarProps } from '@cbhq/cds-web/navigation';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider } from '@cbhq/cds-web/system';
import { TabNavigation } from '@cbhq/cds-web/tabs';
import { TextTitle1 } from '@cbhq/cds-web/typography';
import { enableJavascript } from '@cbhq/cds-web/utils/storybookParams/percy';

import { AppSwitcher } from '../../__stories__/AppSwitcher.stories';
import { UserSwitcher } from '../../__stories__/UserSwitcher.stories';

import { tabs } from './NavigationStorySetup';

export default {
  component: NavigationBar,
  title: 'Core Components/Navigation/IdentityNavigationBar',
};

const IdentityNavigationBar = memo(({ start, end, bottom, children }: NavigationBarProps) => {
  return (
    <NavigationBar
      accessibilityLabel="main navigation"
      start={start}
      end={
        <HStack gap={1} alignItems="center">
          {end}
          <AppSwitcher />
          <UserSwitcher title="Brian" />
        </HStack>
      }
      bottom={bottom}
    >
      {children}
    </NavigationBar>
  );
});

const IdentityNavigationBarConsumer = () => {
  const [tab, setTab] = useState(tabs[0].id);
  const [search, setSearch] = useState('');
  const handleBackIconClick = useCallback(() => {
    setTab(tabs[0].id);
  }, [setTab]);
  return (
    <IdentityNavigationBar
      start={
        tab !== tabs[0].id && (
          <IconButton name="backArrow" onPress={handleBackIconClick} accessibilityLabel="Back" />
        )
      }
      end={
        <HStack gap={2} alignItems="center">
          <HStack gap={1} alignItems="center">
            <Button compact>Primary</Button>
            <Button compact variant="secondary">
              Secondary
            </Button>
          </HStack>
          <HStack gap={1} alignItems="center">
            <NavigationIconButton name="globe" active={false} accessibilityLabel="Language" />
            <NavigationIconButton name="bell" active={false} accessibilityLabel="Notifications" />
          </HStack>
        </HStack>
      }
      bottom={<TabNavigation tabs={tabs} value={tab} onChange={setTab} />}
    >
      <HStack gap={1} flexGrow={1} alignItems="center">
        <SearchInput
          compact
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          accessibilityLabel="Search"
        />
      </HStack>
    </IdentityNavigationBar>
  );
};

export const IdentityNavigationBarExampleDefault: Story = () => {
  return (
    <PortalProvider>
      <FeatureFlagProvider frontierColor frontierButton>
        <TextTitle1 as="h1">NavigationBar example for Identity Team</TextTitle1>
        <Spacer />
        <IdentityNavigationBarConsumer />
      </FeatureFlagProvider>
    </PortalProvider>
  );
};

IdentityNavigationBarExampleDefault.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      /**
       * The TabNavigation docs explain the proper way to setup the tabpanel.
       * Disabled because CDS TabNavigation doesn't have associated panels.
       * @link https://cds.cbhq.net/components/tab-navigation#accessibility
       * */
      rules: [{ id: 'aria-valid-attr-value', enabled: false }],
    },
  },
};
